import sys,json,joblib
model=joblib.load("model.pkl")
data=json.loads(sys.stdin.read())
features=[[data[k] for k in ["attendance","previous_sgpa","internal_marks","assignment_marks","study_hours","backlogs","previous_percentage"]]]
risk=model.predict(features)[0]
proba=max(model.predict_proba(features)[0])
score=(data["attendance"]*.25+data["previous_sgpa"]*8*.20+data["internal_marks"]*.20+data["assignment_marks"]*.10+min(data["study_hours"]*10,100)*.10+max(0,100-data["backlogs"]*25)*.05+data["previous_percentage"]*.10)
print(json.dumps({"risk":risk,"predicted_sgpa":round(min(10,max(0,score/10)),2),"confidence":round(proba*100,2)}))