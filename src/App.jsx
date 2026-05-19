import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Dice5, RotateCcw, Trophy, Clock, Percent, Hash, Wallet } from "lucide-react";
import "./App.css";

export default function App() {
  const [trialNumber, setTrialNumber] = useState(null);
  const [trialHistory, setTrialHistory] = useState([]);

  const [value, setValue] = useState("30");
  const [delay, setDelay] = useState("7");
  const [chance, setChance] = useState("50");
  const [outcome, setOutcome] = useState(null);
  const [outcomeHistory, setOutcomeHistory] = useState([]);

  const chanceNumber = useMemo(() => {
    const parsed = Number(chance);
    if (Number.isNaN(parsed)) return 0;
    return Math.min(100, Math.max(0, parsed));
  }, [chance]);

  const addOnIncentive = useMemo(() => {
    if (!outcome || !outcome.isSelected) return 0;
    const parsed = Number(outcome.value);
    if (Number.isNaN(parsed)) return 0;
    return Math.max(0, parsed);
  }, [outcome]);

  const instantIncentive = 10;
  const totalIncentive = instantIncentive + addOnIncentive;

  const tossTrial = () => {
    const result = Math.floor(Math.random() * 180) + 1;
    setTrialNumber(result);
    setTrialHistory((prev) => [result, ...prev].slice(0, 8));
  };

  const tossOutcome = () => {
    const randomDraw = Math.random() * 100;
    const isSelected = randomDraw < chanceNumber;

    const result = {
      isSelected,
      value: value.trim() || "0",
      delay: delay.trim() || "0",
      chance: chanceNumber,
      draw: randomDraw.toFixed(2),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setOutcome(result);
    setOutcomeHistory((prev) => [result, ...prev].slice(0, 8));
  };

  const resetAll = () => {
    setTrialNumber(null);
    setTrialHistory([]);
    setOutcome(null);
    setOutcomeHistory([]);
    setValue("");
    setDelay("");
    setChance("");
  };

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <p className="eyebrow">Interactive Random Toss Tool</p>
            <h1>Two Random Tosses</h1>
            <p className="subtitle">
              First, randomly select one trial from 1 to 180. Then enter a value
              in SGD, delay in days, and chance to randomly determine whether the
              value-delay outcome is selected.
            </p>
          </div>

          <button onClick={resetAll} className="button button-outline">
            <RotateCcw size={16} />
            Reset
          </button>
        </header>

        <main className="grid">
          <section className="card">
            <div className="card-title">
              <div className="icon-box"><Hash size={24} /></div>
              <div>
                <h2>Toss 1</h2>
                <p>Random trial number</p>
              </div>
            </div>

            <motion.div
              key={trialNumber ?? "empty"}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="trial-display"
            >
              {trialNumber ? (
                <div className="center">
                  <p className="small-label">Selected Trial</p>
                  <p className="big-number">{trialNumber}</p>
                </div>
              ) : (
                <div className="muted center">
                  Click the button below to randomly select a trial from 1 to 180.
                </div>
              )}
            </motion.div>

            <button onClick={tossTrial} className="button button-primary full">
              <Dice5 size={20} />
              Toss Trial Number
            </button>

            {trialHistory.length > 0 && (
              <div className="history">
                <h3>Recent trial results</h3>
                <div className="chips">
                  {trialHistory.map((item, index) => (
                    <span key={`${item}-${index}`} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="card">
            <div className="card-title">
              <div className="icon-box"><Trophy size={24} /></div>
              <div>
                <h2>Toss 2</h2>
                <p>Value-delay outcome based on chance</p>
              </div>
            </div>

            <div className="input-grid">
              <label>
                <span><Trophy size={16} /> Value (SGD)</span>
                <input
                  type="number"
                  min="0"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g., 30"
                />
              </label>

              <label>
                <span><Clock size={16} /> Delay (days)</span>
                <input
                  type="number"
                  min="0"
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  placeholder="e.g., 7"
                />
              </label>

              <label>
                <span><Percent size={16} /> Chance (%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={chance}
                  onChange={(e) => setChance(e.target.value)}
                  placeholder="0–100"
                />
              </label>
            </div>

            <div className="setting-box">
              Current setting: there is a <strong>{chanceNumber}%</strong> chance
              that the participant receives <strong>{value || "0"} SGD</strong> after{" "}
              <strong>{delay || "0"} days</strong>.
            </div>

            <button onClick={tossOutcome} className="button button-primary full">
              <Dice5 size={20} />
              Toss Value-Delay Outcome
            </button>

            <motion.div
              key={outcome ? `${outcome.time}-${outcome.draw}` : "none"}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="result-display"
            >
              {outcome ? (
                <div className={`toss-result ${outcome.isSelected ? "selected" : "not-selected"}`}>
                  <p className="small-label">Toss Result</p>
                  <p className="result-text">{outcome.isSelected ? "Selected" : "Not selected"}</p>
                </div>
              ) : (
                <div className="muted center">
                  Enter the value, delay, and chance, then click the toss button.
                </div>
              )}
            </motion.div>

            {outcomeHistory.length > 0 && (
              <div className="history">
                <h3>Recent value-delay results</h3>
                <div className="list">
                  {outcomeHistory.map((item, index) => (
                    <div key={`${item.time}-${index}`} className="list-item">
                      <span>
                        {item.isSelected
                          ? `Selected: ${item.value} SGD after ${item.delay} days`
                          : "Not selected"}
                      </span>
                      <small>Chance {item.chance}% · Draw {item.draw}% · {item.time}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="card total-card">
            <div className="card-title">
              <div className="icon-box"><Wallet size={24} /></div>
              <div>
                <h2>Total Incentive</h2>
                <p>Instant incentive plus add-on incentive</p>
              </div>
            </div>

            <div className="summary-grid">
              <ResultBox label="Instant incentive" value={`${instantIncentive} SGD`} />
              <ResultBox
                label="Add-on incentive"
                value={
                  outcome
                    ? `${addOnIncentive} SGD${outcome.isSelected ? ` after ${outcome.delay} days` : ""}`
                    : "Waiting for Toss 2"
                }
              />
            </div>

            <motion.div
              key={totalIncentive}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              className="total-box"
            >
              <p className="small-label">Total Amount</p>
              <p className="total-number">{totalIncentive} SGD</p>
            </motion.div>

            <div className="setting-box">
              If Toss 2 is selected, the add-on incentive equals the entered value in SGD.
              If Toss 2 is not selected, the add-on incentive is 0 SGD.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ResultBox({ label, value }) {
  return (
    <div className="result-box">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}
