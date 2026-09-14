"use client";

import { useMemo, useState } from "react";

export function TankSizeCalculator() {
  const [bedrooms, setBedrooms] = useState(3);
  const [people, setPeople] = useState(4);

  const result = useMemo(() => {
    let minimum = bedrooms <= 2 ? 750 : bedrooms === 3 ? 1000 : bedrooms === 4 ? 1250 : bedrooms === 5 ? 1500 : 1750;
    if (people >= 7) minimum = Math.max(minimum, 1500);
    else if (people >= 5) minimum = Math.max(minimum, 1250);
    return { minimum, comfortable: minimum + (minimum < 1500 ? 250 : 500) };
  }, [bedrooms, people]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-800">
          Bedrooms
          <input type="number" min={1} max={8} value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value) || 1)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-slate-800">
          Full-time occupants
          <input type="number" min={1} max={15} value={people} onChange={(e) => setPeople(Number(e.target.value) || 1)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
      </div>
      <div className="mt-6 rounded-lg bg-teal-50 p-5">
        <p className="text-sm font-semibold text-teal-900">Planning estimate</p>
        <p className="mt-1 text-3xl font-bold text-teal-950">{result.minimum.toLocaleString()}–{result.comfortable.toLocaleString()} gallons</p>
        <p className="mt-2 text-sm leading-relaxed text-teal-900">Actual minimum tank sizing is set by state, county, bedroom count, design flow, and system type. Use this range only for early planning and quote conversations.</p>
      </div>
    </div>
  );
}
