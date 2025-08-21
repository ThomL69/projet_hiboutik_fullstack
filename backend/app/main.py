import os, sys

from datetime import datetime, timedelta, timezone
from typing import Annotated, List, Optional

from jose import jwt, JWTError
import app.hiboutik as hibou

from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pydantic import BaseModel

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session



app = FastAPI(title="Hiboutik Proxy API")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

fake_user_db = {
    "thomas": {
        "username": "thomas",
        "hashed_password": pwd_context.hash("hiboutik"),
    },
    "geoffrey": {
        "username": "geoffrey",
        "hashed_password": pwd_context.hash("hiboutikk"),
    }
}

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str

class UserInDB(User):
    hashed_password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, hibou.settings.SECRET_KEY, algorithm=hibou.settings.ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = jwt.decode(token, hibou.settings.SECRET_KEY, algorithms=[hibou.settings.ALGORITHM])
    username = payload.get("sub")
    if username is None:
        raise credentials_exception
    token_data = TokenData(username=username)
    user = get_user(fake_user_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(fake_user_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=hibou.settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#------- Resources -------#
@app.get("/customers/")
def list_clients(user: dict = Depends(get_current_user), name: str| None = Query(default=None)):
    try:
        return {
            "token": user,
            "clients": hibou.get_clients(name)
        } 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/customer/{client_id}/sales")
def ventes_client(client_id: int, page: int = 1, limit: int = 5, user: dict = Depends(get_current_user)):
    try:
        ventes = hibou.get_sales(client_id)
        # Pagination par tranche avec decoupage sequence
        start = (page - 1) * limit
        end = start + limit
        #retour structuree pour recuperer les infos necessaires pour le front
        return {
            "token": user,
            "page": page,
            "limit": limit,
            "total": len(ventes),
            "ventes": ventes[start:end]
        }
        # return ventes[start:end]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/closed_sales")
def ventes_cloturees(user: dict = Depends(get_current_user)):
    try:
        closed_sales = hibou.get_closed_sales();
        return {
            "token": user,
            "total": len(closed_sales),
            "closed_sales": closed_sales
        } 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

#-------- Persistences donnees CRUD #--------#
DATABASE_SQLITE_URL = "sqlite:///./sqlite/hiboutik.db"

engine = create_engine(DATABASE_SQLITE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    last_name = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    email = Column(String, nullable=True)

Base.metadata.create_all(bind=engine)

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ClientCreate(BaseModel):
    last_name: str
    first_name: str
    email: str

class ClientResponse(BaseModel):
    id: int
    last_name: str
    first_name: str
    email: str

    class Config:
        orm_mode = True

class ClientUpdate(BaseModel):
    last_name: str
    first_name: str
    email: Optional[str] = None


@app.post("/clients/", response_model=ClientResponse)
def create_client(client: ClientCreate, db: Session = Depends(get_db)):
    db_client = Client(last_name=client.last_name, first_name=client.first_name, email=client.email)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client


@app.get("/clients/", response_model=List[ClientResponse])
def read_clients(skip: int = 0, limit: int = 5, db: Session = Depends(get_db)):
    clients = db.query(Client).offset(skip).limit(limit).all()
    return clients


@app.get("/clients/{clientId}", response_model=ClientResponse)
def read_client(clientId: int, db: Session = Depends(get_db)):
    client = db.query(Client).filter(Client.id == clientId).first()
    if client is None:
        raise HTTPException(status_code=404, detail="Client Not Found")
    return client


@app.put("/clients/{clientId}", response_model=ClientResponse)
def update_client(clientId: int, client: ClientUpdate, db: Session = Depends(get_db)):
    db_client = db.query(Client).filter(Client.id == clientId).first()
    
    if db_client is None:
        raise HTTPException(status_code=404, detail="Client Not Found")
    
    db_client.last_name = client.last_name if client.last_name is not None else db_client.last_name
    db_client.first_name = client.first_name if client.first_name is not None else db_client.first_name
    db_client.email = client.email if client.email is not None else db_client.email
    db.commit()
    db.refresh(db_client)
    return db_client

@app.delete("/clients/{clientId}", response_model=ClientResponse)
def delete_clients(clientId: int, db: Session = Depends(get_db)):
    db_client = db.query(Client).filter(Client.id == clientId).first()

    if db_client is None:
        raise HTTPException(status_code=404, detail="Client Not Found")
    db.delete(db_client)
    db.commit()
    return db_client