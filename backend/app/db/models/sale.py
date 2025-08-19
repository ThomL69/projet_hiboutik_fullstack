from sqlalchemy import Column, Integer, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..base import Base

class Sale(Base):
    __tablename__ = 'sales'

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False)

    client = relationship("Client", back_populates="sales")