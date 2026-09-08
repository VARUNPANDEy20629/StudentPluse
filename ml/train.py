import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

df = pd.read_csv("dataset.csv")
X = df.drop(columns=["risk"])
y = df["risk"]
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=.25,random_state=42,stratify=y)
model=RandomForestClassifier(n_estimators=200,random_state=42)
model.fit(X_train,y_train)
pred=model.predict(X_test)
print("Accuracy:", round(accuracy_score(y_test,pred)*100,2), "%")
print(classification_report(y_test,pred,zero_division=0))
joblib.dump(model,"model.pkl")
print("Saved model.pkl")