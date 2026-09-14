"use client";

import { useMemo, useState } from "react";

export function PumpingFrequencyCalculator() {
  const [people, setPeople] = useState(4);
  const [gallons, setGallons] = useState(1000);
  const [disposal, setDisposal] = useState(false);
  const [fullTime, setFullTime] = useState(true);

  const result = useMemo(() => {
    let years = 4.5;
    if (gallons <= 750) years -= 1.2;
    else if (gallons >= 1500) years += 1.1;
    if (people >= 6) years -= 1.3;
    else if (people >= 4) years -= 0.5;
    else if (people <= 2) years += 1;
    if (disposal) years -= 0.7;
    if (!fullTime) years += 1.2;
    years = Math.max(1, Math.min(7, years));
    return {
      low: Math.max(1, Math.floor(years - 0.7)),
      high: Math.min(8, Math.ceil(years + 0.7)),
    };
  }, [people, gallons, disposal, fullTime]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-800">
          People in household
          <input type="number" min={1} max={12} value={people} onChange={(e) => setPeople(Number(e.target.value) || 1)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-slate-800">
          Tank size (gallons)
          <select value={gallons} onChange={(e) => setGallons(Number(e.target.value))} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2">
            {[500, 750, 1000, 1250, 1500, 2000].map((g) => <option key={g} value={g}>{g.toLocaleString()} gallons</option>)}
          </select>
        </label>
      </div>
      <div className="mt-5 space-y-3 text-sm text-slate-700">
        <label className="flex items-center gap-2"><input type="checkbox" checked={disposal} onChange={(e) => setDisposal(e.target.checked)} /> We regularly use a garbage disposal</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={fullTime} onChange={(e) => setFullTime(e.target.checked)} /> Home is occupied full-time</label>
      </div>
      <div className="mt-6 rounded-lg bg-teal-50 p-5">
        <p className="text-sm font-semibold text-teal-900">Estimated pumping interval</p>
        <p className="mt-1 text-3xl font-bold text-teal-950">Every {result.low}–{result.high} years</p>
        <p className="mt-2 text-sm leading-relaxed text-teal-900">Use this as a planning range, not a diagnosis. Sludge level, tank condition, local rules, leaks, and unusual water use can shorten the interval.</p>
      </div>
    </div>
  );
}
