from sqlalchemy import Column, Integer, String, Float, BigInteger, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# ---------------------------
# PRICE TABLE
# ---------------------------
class Price(Base):
    __tablename__ = "prices"

    id = Column(Integer, primary_key=True, index=True)
    coin = Column(String, index=True)
    timestamp = Column(BigInteger, index=True)
    normalized_price = Column(Float)
    volatility = Column(Float)


# ---------------------------
# PREDICTIONS TABLE
# ---------------------------
class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    coin = Column(String, index=True)
    timestamp = Column(BigInteger, index=True)
    predicted_price = Column(Float)


# ---------------------------
# LLM INSIGHTS TABLE
# ---------------------------
class Insight(Base):
    __tablename__ = "insights"

    id = Column(Integer, primary_key=True, index=True)
    coin = Column(String, index=True)
    timestamp = Column(BigInteger, index=True)

    market_regime = Column(String)
    momentum = Column(String)
    volatility_state = Column(String)
    risk_outlook = Column(String)

    key_insight = Column(Text)
    caution = Column(Text)
