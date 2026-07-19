import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
import joblib


df = pd.read_csv("train.csv")
df["Sex"]=df["Sex"].map({"male":0, "female":1})
df = df.dropna(subset=["Embarked"])
df["Embarked"] = df["Embarked"].map({"S":3, "C":4, "Q":5})
df["Age"] = df["Age"].fillna(df["Age"].mean())

x = df.drop(columns=["Survived","Name", "Ticket", "Cabin", "PassengerId"])
y = df["Survived"]


x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=67)


model = RandomForestClassifier(random_state=67,max_depth=5)
model.fit(x, y)
ort = cross_val_score(model, x, y, cv=5)

joblib.dump(model, "model.pkl")
