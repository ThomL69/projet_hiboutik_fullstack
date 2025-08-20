from pydantic import BaseModel
from dotenv import load_dotenv
import os

# print(os.path.dirname(__file__))
dotenv_path = os.path.join(f"{os.getcwd()}/app/", ".env") # force path to .env
load_dotenv(dotenv_path)

class Settings(BaseModel):
    HIBOUTIK_BASE_URL: str = os.getenv("HIBOUTIK_BASE_URL")
    HIBOUTIK_USER: str = os.getenv("HIBOUTIK_USER")
    HIBOUTIK_KEY: str = os.getenv("HIBOUTIK_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    print(">>>>DEBUG: ", HIBOUTIK_BASE_URL)

    class Config:
        env_file = ".env"

settings = Settings()