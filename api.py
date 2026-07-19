import pandas as pd
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Titanic Survival Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model.pkl")

LIMANLAR = {"S": 3, "C": 4, "Q": 5}
CINSIYET = {"male": 0, "female": 1}


class Yolcu(BaseModel):
    pclass: int
    sex: str
    age: float
    sibsp: int
    parch: int
    fare: float
    embarked: str


@app.get("/")
def kok():
    return {"status": "ok"}


@app.post("/predict")
def tahmin(yolcu: Yolcu):
    veri = pd.DataFrame([{
        "Pclass": yolcu.pclass,
        "Sex": CINSIYET[yolcu.sex],
        "Age": yolcu.age,
        "SibSp": yolcu.sibsp,
        "Parch": yolcu.parch,
        "Fare": yolcu.fare,
        "Embarked": LIMANLAR[yolcu.embarked],
    }])
    olasilik = model.predict_proba(veri)[0][1]
    return {"survival_probability": round(float(olasilik), 4)}
