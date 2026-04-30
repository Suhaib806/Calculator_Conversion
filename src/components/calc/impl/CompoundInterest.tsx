import { useMemo, useState } from "react";
import { Field, NumberInput, ResultBox, Select, Stat, fmtMoney, fmtNumber } from "../CalcLayout";

export function CompoundInterestCalc({ daily = false }: { daily?: boolean }) {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [contribution, setContribution] = useState(200);
  const [freq, setFreq] = useState(daily ? 365 : 12);
  const [currency, setCurrency] = useState("USD");

  const result = useMemo(() => {
    const r = rate / 100;
    const n = freq;
    const t = years;
    const fvPrincipal = principal * Math.pow(1 + r / n, n * t);
    // contributions made monthly, compounded at frequency n
    const monthsTotal = t * 12;
    let fvContrib = 0;
    let bal = principal;
    const yearly: { year: number; balance: number; contributed: number; interest: number }[] = [];
    let totalContrib = principal;
    for (let m = 1; m <= monthsTotal; m++) {
      // apply per-month rate equivalent
      const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;
      bal = bal * (1 + monthlyRate) + contribution;
      totalContrib += contribution;
      if (m % 12 === 0) {
        yearly.push({
          year: m / 12,
          balance: bal,
          contributed: totalContrib,
          interest: bal - totalContrib,
        });
      }
    }
    fvContrib = bal - fvPrincipal;
    return { future: bal, fvPrincipal, fvContrib, yearly, totalContrib };
  }, [principal, rate, years, contribution, freq]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Initial deposit">
          <NumberInput value={principal} onChange={(e) => setPrincipal(+e.target.value)} />
        </Field>
        <Field label="Monthly contribution">
          <NumberInput value={contribution} onChange={(e) => setContribution(+e.target.value)} />
        </Field>
        <Field label="Annual interest rate (%)">
          <NumberInput step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
        <Field label="Years to grow">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
        <Field label="Compounding frequency">
          <Select value={freq} onChange={(e) => setFreq(+e.target.value)}>
            <option value={1}>Annually</option>
            <option value={2}>Semi-annually</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
            <option value={365}>Daily</option>
          </Select>
        </Field>
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "INR"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
      </div>

      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Future value" value={fmtMoney(result.future, currency)} />
          <Stat label="Total contributed" value={fmtMoney(result.totalContrib, currency)} />
          <Stat
            label="Total interest"
            value={fmtMoney(result.future - result.totalContrib, currency)}
          />
        </div>
      </ResultBox>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Balance</th>
              <th className="px-4 py-2">Contributed</th>
              <th className="px-4 py-2">Interest</th>
            </tr>
          </thead>
          <tbody>
            {result.yearly.map((y) => (
              <tr key={y.year} className="border-t border-border/60">
                <td className="px-4 py-2">{y.year}</td>
                <td className="px-4 py-2">{fmtMoney(y.balance, currency)}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {fmtMoney(y.contributed, currency)}
                </td>
                <td className="px-4 py-2 text-muted-foreground">{fmtNumber(y.interest)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
