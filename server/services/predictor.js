function predict(x) {
  const fields=["attendance","previous_sgpa","internal_marks","assignment_marks","study_hours","backlogs","previous_percentage"];
  for (const f of fields) if (typeof x[f] !== "number" || Number.isNaN(x[f])) throw new Error(`Invalid value for ${f}`);

  const score =
    x.attendance*.25 + x.previous_sgpa*8*.20 + x.internal_marks*.20 +
    x.assignment_marks*.10 + Math.min(x.study_hours*10,100)*.10 +
    Math.max(0,100-x.backlogs*25)*.05 + x.previous_percentage*.10;

  const risk = score >= 75 ? "Low Risk" : score >= 55 ? "Moderate Risk" : "High Risk";
  return {risk, predicted_sgpa:Number(Math.min(10,Math.max(0,score/10)).toFixed(2)), confidence:0};
}
module.exports={predict};