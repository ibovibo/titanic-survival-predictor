import pandas as pd
import joblib

model = joblib.load("model.pkl")

Limanlar ={"S": 3, "C":4, "Q":5}
Pclass = int(input("Biletiniz kacinci sinif 1,2,3 ? "))
Sex = int(input("cinsiyetiniz ne E=0 K=1 ? "))
Age = float(input("Yasınız kac? "))
SibSp = int(input("Gemideki es ve kardes toplamininz kac? "))
Parch = int(input("Gemideki anne baba ve cocuk sayinizin toplami kac? "))
Fare = float(input("Bilete ne kadar ödediniz? "))
Embarked = Limanlar[input("Hangi limandan bindiniz  S = Southampton, C = Cherbourg, Q = Queenstown ? ")]

def tahmin(Pclass, Sex, Age, SibSp, Parch, Fare, Embarked):
    yolcu = pd.DataFrame([
        {"Pclass": Pclass,
        "Sex": Sex,
        "Age": Age,
        "SibSp": SibSp,
        "Parch": Parch,
        "Fare": Fare,
        "Embarked": Embarked}
    ])

    return model.predict_proba(yolcu)[0][1]

print(f"{tahmin(Pclass, Sex, Age, SibSp, Parch, Fare, Embarked):.1%}")