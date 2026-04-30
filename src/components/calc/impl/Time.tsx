import { useMemo, useState } from "react";
import { Field, NumberInput, ResultBox, Stat, TextInput, fmtNumber } from "../CalcLayout";

function dateOnly(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function AgeCalc() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const [dob, setDob] = useState("1995-06-15");
  const [on, setOn] = useState(todayIso);

  const result = useMemo(() => {
    const a = new Date(dob);
    const b = new Date(on);
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return null;
    let years = b.getFullYear() - a.getFullYear();
    let months = b.getMonth() - a.getMonth();
    let days = b.getDate() - a.getDate();
    if (days < 0) {
      months -= 1;
      const prev = new Date(b.getFullYear(), b.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const totalDays = Math.floor((dateOnly(b).getTime() - dateOnly(a).getTime()) / 86400000);
    return { years, months, days, totalDays };
  }, [dob, on]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Date of birth">
          <TextInput type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </Field>
        <Field label="As of">
          <TextInput type="date" value={on} onChange={(e) => setOn(e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        {result ? (
          <div className="grid gap-6 sm:grid-cols-4">
            <Stat label="Years" value={result.years} />
            <Stat label="Months" value={result.months} />
            <Stat label="Days" value={result.days} />
            <Stat label="Total days" value={fmtNumber(result.totalDays, 0)} />
          </div>
        ) : (
          <span className="text-muted-foreground">Enter valid dates.</span>
        )}
      </ResultBox>
    </div>
  );
}

export function DateDiffCalc() {
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState("2026-04-30");

  const days = useMemo(() => {
    const a = new Date(start),
      b = new Date(end);
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return null;
    return Math.round((dateOnly(b).getTime() - dateOnly(a).getTime()) / 86400000);
  }, [start, end]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Start date">
          <TextInput type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
        <Field label="End date">
          <TextInput type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        {days !== null ? (
          <div className="grid gap-6 sm:grid-cols-3">
            <Stat label="Days" value={fmtNumber(days, 0)} />
            <Stat label="Weeks" value={fmtNumber(days / 7, 1)} />
            <Stat label="Years" value={fmtNumber(days / 365.25, 2)} />
          </div>
        ) : (
          <span className="text-muted-foreground">Enter valid dates.</span>
        )}
      </ResultBox>
    </div>
  );
}

export function HoursCalc() {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:30");
  const [breakMin, setBreakMin] = useState(30);

  const result = useMemo(() => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let mins = eh * 60 + em - (sh * 60 + sm) - breakMin;
    if (mins < 0) mins += 24 * 60;
    return mins;
  }, [start, end, breakMin]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Start">
          <TextInput type="time" value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
        <Field label="End">
          <TextInput type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
        </Field>
        <Field label="Break (minutes)">
          <NumberInput value={breakMin} onChange={(e) => setBreakMin(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-2">
          <Stat label="Total hours" value={fmtNumber(result / 60, 2)} />
          <Stat label="Hours : Minutes" value={`${Math.floor(result / 60)}h ${result % 60}m`} />
        </div>
      </ResultBox>
    </div>
  );
}
