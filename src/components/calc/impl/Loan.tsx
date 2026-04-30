import { useMemo, useState } from "react";
import { Field, NumberInput, ResultBox, Select, Stat, fmtMoney } from "../CalcLayout";

function payment(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function LoanCalc({
  defaults,
}: {
  defaults?: { principal?: number; rate?: number; years?: number; label?: string };
}) {
  const [principal, setPrincipal] = useState(defaults?.principal ?? 25000);
  const [rate, setRate] = useState(defaults?.rate ?? 6.5);
  const [years, setYears] = useState(defaults?.years ?? 5);
  const [currency, setCurrency] = useState("USD");

  const monthly = useMemo(() => payment(principal, rate, years), [principal, rate, years]);
  const total = monthly * years * 12;
  const interest = total - principal;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label={`${defaults?.label ?? "Loan"} amount`}>
          <NumberInput value={principal} onChange={(e) => setPrincipal(+e.target.value)} />
        </Field>
        <Field label="Annual interest rate (%)">
          <NumberInput step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
        <Field label="Term (years)">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Monthly payment" value={fmtMoney(monthly, currency)} />
          <Stat label="Total interest" value={fmtMoney(interest, currency)} />
          <Stat label="Total paid" value={fmtMoney(total, currency)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function AmortizationCalc() {
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [currency, setCurrency] = useState("USD");

  const schedule = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const pay = payment(principal, rate, years);
    let bal = principal;
    const rows: {
      month: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }[] = [];
    for (let m = 1; m <= n; m++) {
      const interest = bal * r;
      const princPart = pay - interest;
      bal -= princPart;
      rows.push({
        month: m,
        payment: pay,
        principal: princPart,
        interest,
        balance: Math.max(0, bal),
      });
    }
    return { rows, pay };
  }, [principal, rate, years]);

  const totalInt = schedule.rows.reduce((s, r) => s + r.interest, 0);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Loan amount">
          <NumberInput value={principal} onChange={(e) => setPrincipal(+e.target.value)} />
        </Field>
        <Field label="Annual interest rate (%)">
          <NumberInput step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
        <Field label="Term (years)">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Monthly payment" value={fmtMoney(schedule.pay, currency)} />
          <Stat label="Total interest" value={fmtMoney(totalInt, currency)} />
          <Stat label="Total paid" value={fmtMoney(schedule.pay * years * 12, currency)} />
        </div>
      </ResultBox>

      <div className="mt-6 max-h-96 overflow-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Principal</th>
              <th className="px-4 py-2">Interest</th>
              <th className="px-4 py-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.rows.map((r) => (
              <tr key={r.month} className="border-t border-border/60">
                <td className="px-4 py-1.5 text-muted-foreground">{r.month}</td>
                <td className="px-4 py-1.5">{fmtMoney(r.payment, currency)}</td>
                <td className="px-4 py-1.5">{fmtMoney(r.principal, currency)}</td>
                <td className="px-4 py-1.5 text-muted-foreground">
                  {fmtMoney(r.interest, currency)}
                </td>
                <td className="px-4 py-1.5">{fmtMoney(r.balance, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
