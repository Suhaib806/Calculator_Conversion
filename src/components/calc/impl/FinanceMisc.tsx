import { useMemo, useState } from "react";
import { Field, NumberInput, ResultBox, Select, Stat, fmtMoney } from "../CalcLayout";

// Simple static FX table (illustrative — real app would fetch). Rates are USD-base.
const RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 156,
  CAD: 1.36,
  AUD: 1.5,
  INR: 83.4,
  CNY: 7.25,
  CHF: 0.88,
  MXN: 17.1,
  BRL: 5.05,
  ZAR: 18.6,
  NZD: 1.64,
  SGD: 1.35,
  HKD: 7.81,
  SEK: 10.5,
  NOK: 10.6,
  KRW: 1370,
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const result = useMemo(() => {
    const usd = amount / RATES[from];
    return usd * RATES[to];
  }, [amount, from, to]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Amount">
          <NumberInput value={amount} onChange={(e) => setAmount(+e.target.value)} />
        </Field>
        <Field label="From">
          <Select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(RATES).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="To">
          <Select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(RATES).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
      </div>
      <ResultBox>
        <Stat
          label={`${amount} ${from} =`}
          value={fmtMoney(result, to)}
          hint="Indicative rate. Not for trading."
        />
      </ResultBox>
    </div>
  );
}

export function SalaryCalc() {
  const [mode, setMode] = useState<"annual" | "hourly">("annual");
  const [annual, setAnnual] = useState(75000);
  const [hourlyInput, setHourlyInput] = useState(36);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [currency, setCurrency] = useState("USD");
  const [vacationDays, setVacationDays] = useState(10);

  const effectiveWeeks = Math.max(1, weeksPerYear - vacationDays / 5);
  const annualEffective = mode === "annual" ? annual : hourlyInput * hoursPerWeek * effectiveWeeks;

  const monthly = annualEffective / 12;
  const biWeekly = annualEffective / 26;
  const weekly = annualEffective / effectiveWeeks;
  const daily = weekly / 5;
  const hourly = annualEffective / (hoursPerWeek * effectiveWeeks);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-4">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Input type">
          <Select value={mode} onChange={(e) => setMode(e.target.value as "annual" | "hourly")}>
            <option value="annual">Annual salary</option>
            <option value="hourly">Hourly wage</option>
          </Select>
        </Field>
        {mode === "annual" ? (
          <Field label="Annual salary">
            <NumberInput value={annual} onChange={(e) => setAnnual(+e.target.value)} />
          </Field>
        ) : (
          <Field label="Hourly wage">
            <NumberInput value={hourlyInput} onChange={(e) => setHourlyInput(+e.target.value)} />
          </Field>
        )}
        <Field label="Hours / week">
          <NumberInput value={hoursPerWeek} onChange={(e) => setHoursPerWeek(+e.target.value)} />
        </Field>
        <Field label="Weeks / year">
          <NumberInput value={weeksPerYear} onChange={(e) => setWeeksPerYear(+e.target.value)} />
        </Field>
        <Field label="Vacation days / year">
          <NumberInput value={vacationDays} onChange={(e) => setVacationDays(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Annual" value={fmtMoney(annualEffective, currency)} />
          <Stat label="Monthly" value={fmtMoney(monthly, currency)} />
          <Stat label="Bi-weekly" value={fmtMoney(biWeekly, currency)} />
          <Stat label="Weekly" value={fmtMoney(weekly, currency)} />
          <Stat label="Daily" value={fmtMoney(daily, currency)} />
          <Stat label="Hourly" value={fmtMoney(hourly, currency)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function TipCalc() {
  const [bill, setBill] = useState(50);
  const [tip, setTip] = useState(18);
  const [taxPct, setTaxPct] = useState(0);
  const [people, setPeople] = useState(2);
  const [currency, setCurrency] = useState("USD");
  const [roundMode, setRoundMode] = useState<"none" | "up-dollar" | "up-total">("none");

  const taxAmt = bill * (taxPct / 100);
  const subTotal = bill + taxAmt;
  let tipAmt = subTotal * (tip / 100);
  let total = subTotal + tipAmt;
  if (roundMode === "up-dollar") {
    tipAmt = Math.ceil(tipAmt);
    total = subTotal + tipAmt;
  } else if (roundMode === "up-total") {
    total = Math.ceil(total);
    tipAmt = total - subTotal;
  }
  const perPerson = total / Math.max(1, people);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Bill amount">
          <NumberInput value={bill} onChange={(e) => setBill(+e.target.value)} />
        </Field>
        <Field label="Tip (%)">
          <NumberInput value={tip} onChange={(e) => setTip(+e.target.value)} />
        </Field>
        <Field label="Tax (%)">
          <NumberInput value={taxPct} onChange={(e) => setTaxPct(+e.target.value)} />
        </Field>
        <Field label="People to split">
          <NumberInput value={people} onChange={(e) => setPeople(+e.target.value)} />
        </Field>
        <Field label="Round option">
          <Select
            value={roundMode}
            onChange={(e) => setRoundMode(e.target.value as "none" | "up-dollar" | "up-total")}
          >
            <option value="none">No rounding</option>
            <option value="up-dollar">Round tip up to dollar</option>
            <option value="up-total">Round total up to dollar</option>
          </Select>
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-4">
          <Stat label="Tax" value={fmtMoney(taxAmt, currency)} />
          <Stat label="Tip" value={fmtMoney(tipAmt, currency)} />
          <Stat label="Total" value={fmtMoney(total, currency)} />
          <Stat label={`Per person (${people})`} value={fmtMoney(perPerson, currency)} />
        </div>
      </ResultBox>
    </div>
  );
}
