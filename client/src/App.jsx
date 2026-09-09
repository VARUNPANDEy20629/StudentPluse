import { useState } from "react";

const initial = {
  attendance: 85, previous_sgpa: 7.8, internal_marks: 78,
  assignment_marks: 82, study_hours: 3, backlogs: 0, previous_percentage: 78
};

function App() {
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sgpa, setSgpa] = useState(8.2);
  const [previousCgpa, setPreviousCgpa] = useState(7.9);
  const [semesters, setSemesters] = useState(6);

  const cgpa = Math.min(10, Math.max(0, ((previousCgpa * Math.max(semesters - 1, 0)) + sgpa) / semesters)).toFixed(2);
  const percentage = (Number(cgpa) * 9.5).toFixed(1);

  const update = (e) => setForm({...form, [e.target.name]: Number(e.target.value)});

  const predict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("Server unavailable");
      setResult(await response.json());
    } catch {
      // Demo fallback keeps the frontend usable before the Python ML service is connected.
      const score = form.attendance*0.25 + form.previous_sgpa*8*0.2 +
        form.internal_marks*0.2 + form.assignment_marks*0.1 +
        Math.min(form.study_hours*10,100)*0.1 + Math.max(0,100-form.backlogs*25)*0.05 +
        form.previous_percentage*0.1;
      const risk = score >= 75 ? "Low Risk" : score >= 55 ? "Moderate Risk" : "High Risk";
      const sgpa = Math.min(10, Math.max(0, score/10));
      setResult({risk, predicted_sgpa: Number(sgpa.toFixed(2)), confidence: 0, demo: true});
    } finally { setLoading(false); }
  };

  const fields = [
    ["attendance", "Attendance", "%", 0, 100, 1],
    ["previous_sgpa", "Previous SGPA", "/ 10", 0, 10, 0.1],
    ["internal_marks", "Internal marks", "%", 0, 100, 1],
    ["assignment_marks", "Assignment marks", "%", 0, 100, 1],
    ["study_hours", "Study hours / day", "hrs", 0, 16, 1],
    ["backlogs", "Active backlogs", "count", 0, 10, 1],
    ["previous_percentage", "Previous percentage", "%", 0, 100, 1]
  ];

  return <div className="app">
    <header className="topbar">
      <div className="brand"><span className="brand-mark">SP</span><span>StudentPulse</span></div>
      <div className="topbar-status"><span className="status-dot" /> Prediction workspace <span className="status-divider" /> 2024–25</div>
    </header>
    <main className="shell">
      <section className="intro">
        <div>
          <p className="eyebrow">ACADEMIC INTELLIGENCE <span>•</span> 01</p>
          <h1>See the signal<br /><em>behind the score.</em></h1>
          <p className="intro-copy">Turn everyday academic indicators into a clear, actionable view of student performance.</p>
        </div>
        <div className="intro-note"><span className="note-icon">↗</span><p>Use recent, verified data for a more reliable estimate.</p></div>
      </section>

      <section className="metric-strip" aria-label="Model highlights">
        <div><span className="metric-icon teal">◎</span><p><strong>7</strong><small>inputs analyzed</small></p></div>
        <div><span className="metric-icon coral">↗</span><p><strong>10.0</strong><small>maximum SGPA</small></p></div>
        <div><span className="metric-icon yellow">✦</span><p><strong>ML</strong><small>powered insights</small></p></div>
      </section>

      <div className="workspace">
        <section className="panel form-panel">
          <div className="panel-heading"><div><p className="section-kicker">INPUT PROFILE</p><h2>Student details</h2></div><span className="step">01 <i>/ 02</i></span></div>
          <p className="panel-copy">Add the latest academic information to generate a performance snapshot.</p>
          <form onSubmit={predict}>
            <div className="field-grid">
              {fields.map(([name, label, unit, min, max, step]) =>
                <label key={name}><span>{label}<small>{unit}</small></span><input type="number" name={name} value={form[name]} min={min} max={max} step={step} onChange={update} required /></label>
              )}
            </div>
            <button className="predict-button" disabled={loading}><span>{loading ? "Calculating" : "Generate prediction"}</span><b>→</b></button>
          </form>
          <p className="privacy"><span>●</span> Your inputs stay private and are used for this estimate only.</p>
        </section>

        <section className={`panel result-panel ${result ? "has-result" : ""}`}>
          <div className="panel-heading"><div><p className="section-kicker">PERFORMANCE OUTLOOK</p><h2>Prediction</h2></div><span className={`result-badge ${result?.demo ? "demo-badge" : ""}`}>{result?.demo ? "DEMO" : "LIVE"}</span></div>
          {result ? <div className="result">
            <div className={`risk ${result.risk.startsWith("Low") ? "low" : result.risk.startsWith("Moderate") ? "moderate" : "high"}`}><span />{result.risk}</div>
            <div className="score-wrap"><div className="score-ring"><strong>{result.predicted_sgpa}</strong><span>/ 10</span></div><div><p className="score-label">Estimated SGPA</p><p className="score-caption">Based on the profile provided</p></div></div>
            <div className="result-foot">{result.confidence ? <span>Model confidence <b>{result.confidence}%</b></span> : <span className="muted">Demo estimate <b>•</b> connect ML service for live confidence</span>}<span className="result-arrow">↗</span></div>
          </div> : <div className="empty"><div className="empty-art"><span>✦</span><span>◒</ span><span>↗</span></div><h3>Your outlook is waiting</h3><p>Complete the profile on the left to reveal an estimated SGPA and academic risk level.</p></div>}
        </section>
      </div>

      <section className="utility-section">
        <div className="utility-heading">
          <div><p className="section-kicker">QUICK ACADEMIC TOOL</p><h2>Translate your score</h2></div>
          <span className="tool-tag">SGPA → CGPA</span>
        </div>
        <div className="converter">
          <div className="converter-copy">
            <span className="converter-icon">↗</span>
            <div><h3>SGPA to CGPA converter</h3><p>Estimate your cumulative grade point from your current semester score.</p></div>
          </div>
          <label className="converter-field"><span>Previous CGPA</span><input type="number" min="0" max="10" step="0.1" value={previousCgpa} onChange={(e) => setPreviousCgpa(Number(e.target.value))} /></label>
          <label className="converter-field"><span>Current SGPA</span><input type="number" min="0" max="10" step="0.1" value={sgpa} onChange={(e) => setSgpa(Number(e.target.value))} /></label>
          <label className="converter-field"><span>Semesters completed</span><input type="number" min="1" max="12" step="1" value={semesters} onChange={(e) => setSemesters(Number(e.target.value))} /></label>
          <div className="converter-result"><small>Estimated CGPA</small><strong>{cgpa}</strong><span>≈ {percentage}%</span></div>
        </div>
      </section>
    </main>
    <footer><span>StudentPulse</span><span>React · Express · Python ML</span><span>Built for better decisions.</span></footer>
  </div>
}
export default App;