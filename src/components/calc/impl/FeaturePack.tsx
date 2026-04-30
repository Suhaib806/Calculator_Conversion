import { useMemo, useState } from "react";
import {
  Field,
  NumberInput,
  ResultBox,
  Select,
  Stat,
  TextInput,
  fmtMoney,
  fmtNumber,
} from "../CalcLayout";

type UnitMap = Record<string, number>;

function monthlyPayment(principal: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / Math.max(1, months);
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

function GenericConverter({ map, label }: { map: UnitMap; label: string }) {
  const keys = Object.keys(map);
  const [from, setFrom] = useState(keys[0]);
  const [to, setTo] = useState(keys[1] ?? keys[0]);
  const [value, setValue] = useState(1);
  const result = useMemo(() => (value * map[from]) / map[to], [value, from, to, map]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label={`${label} value`}>
          <NumberInput value={value} onChange={(e) => setValue(+e.target.value)} />
        </Field>
        <Field label="From">
          <Select value={from} onChange={(e) => setFrom(e.target.value)}>
            {keys.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </Select>
        </Field>
        <Field label="To">
          <Select value={to} onChange={(e) => setTo(e.target.value)}>
            {keys.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </Select>
        </Field>
      </div>
      <ResultBox>
        <Stat label={`${value} ${from} =`} value={`${fmtNumber(result, 6)} ${to}`} />
      </ResultBox>
    </div>
  );
}

export function APYCalc() {
  const [apr, setApr] = useState(5);
  const [n, setN] = useState(12);
  const apy = (Math.pow(1 + apr / 100 / n, n) - 1) * 100;
  return (
    <ResultBox>
      <Stat label="APY" value={`${fmtNumber(apy, 3)}%`} />
    </ResultBox>
  );
}

export function CAGRCalc() {
  const [begin, setBegin] = useState(10000);
  const [end, setEnd] = useState(18000);
  const [years, setYears] = useState(5);
  const cagr = (Math.pow(end / Math.max(1, begin), 1 / Math.max(0.1, years)) - 1) * 100;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Starting value">
          <NumberInput value={begin} onChange={(e) => setBegin(+e.target.value)} />
        </Field>
        <Field label="Ending value">
          <NumberInput value={end} onChange={(e) => setEnd(+e.target.value)} />
        </Field>
        <Field label="Years">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="CAGR" value={`${fmtNumber(cagr, 2)}%`} />
      </ResultBox>
    </div>
  );
}

export function FutureValueCalc() {
  const [pv, setPv] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [pmt, setPmt] = useState(200);
  const [currency, setCurrency] = useState("USD");
  const fv =
    pv * Math.pow(1 + rate / 100, years) +
    pmt * ((Math.pow(1 + rate / 100, years) - 1) / (rate / 100 || 1));
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-5">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Present value">
          <NumberInput value={pv} onChange={(e) => setPv(+e.target.value)} />
        </Field>
        <Field label="Annual return (%)">
          <NumberInput value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
        <Field label="Years">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
        <Field label="Annual contribution">
          <NumberInput value={pmt} onChange={(e) => setPmt(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Future value" value={fmtMoney(fv, currency)} />
      </ResultBox>
    </div>
  );
}

export function SavingsGoalCalc() {
  const [goal, setGoal] = useState(50000);
  const [current, setCurrent] = useState(5000);
  const [rate, setRate] = useState(4);
  const [years, setYears] = useState(8);
  const [currency, setCurrency] = useState("USD");
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const grownCurrent = current * Math.pow(1 + monthlyRate, months);
  const needed = Math.max(
    0,
    ((goal - grownCurrent) * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1 || 1),
  );
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-5">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Goal amount">
          <NumberInput value={goal} onChange={(e) => setGoal(+e.target.value)} />
        </Field>
        <Field label="Current savings">
          <NumberInput value={current} onChange={(e) => setCurrent(+e.target.value)} />
        </Field>
        <Field label="Annual return (%)">
          <NumberInput value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
        <Field label="Years to goal">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Required monthly contribution" value={fmtMoney(needed, currency)} />
      </ResultBox>
    </div>
  );
}

export function SimpleInterestCalc() {
  const [principal, setPrincipal] = useState(2000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(3);
  const [currency, setCurrency] = useState("USD");
  const interest = principal * (rate / 100) * years;
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
        <Field label="Principal">
          <NumberInput value={principal} onChange={(e) => setPrincipal(+e.target.value)} />
        </Field>
        <Field label="Rate (%)">
          <NumberInput value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
        <Field label="Years">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Interest" value={fmtMoney(interest, currency)} />
        <Stat label="Total" value={fmtMoney(principal + interest, currency)} />
      </ResultBox>
    </div>
  );
}

export function ROICalc() {
  const [cost, setCost] = useState(1000);
  const [returnValue, setReturnValue] = useState(1450);
  const roi = ((returnValue - cost) / Math.max(1, cost)) * 100;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Investment cost">
          <NumberInput value={cost} onChange={(e) => setCost(+e.target.value)} />
        </Field>
        <Field label="Final value">
          <NumberInput value={returnValue} onChange={(e) => setReturnValue(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="ROI" value={`${fmtNumber(roi, 2)}%`} />
      </ResultBox>
    </div>
  );
}

export function VATCalc() {
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(20);
  const [currency, setCurrency] = useState("USD");
  const vat = amount * (rate / 100);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Base amount">
          <NumberInput value={amount} onChange={(e) => setAmount(+e.target.value)} />
        </Field>
        <Field label="VAT rate (%)">
          <NumberInput value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="VAT amount" value={fmtMoney(vat, currency)} />
        <Stat label="Total incl. VAT" value={fmtMoney(amount + vat, currency)} />
      </ResultBox>
    </div>
  );
}

export function MarginCalc() {
  const [cost, setCost] = useState(80);
  const [sell, setSell] = useState(120);
  const margin = ((sell - cost) / Math.max(1, sell)) * 100;
  const markup = ((sell - cost) / Math.max(1, cost)) * 100;
  return (
    <ResultBox>
      <Stat label="Profit margin" value={`${fmtNumber(margin, 2)}%`} />
      <Stat label="Markup" value={`${fmtNumber(markup, 2)}%`} />
    </ResultBox>
  );
}

export function PowerConverter() {
  return <GenericConverter label="Power" map={{ W: 1, kW: 1000, hp: 745.7, "ft-lb/s": 1.3558 }} />;
}

export function PressureConverter() {
  return (
    <GenericConverter
      label="Pressure"
      map={{ Pa: 1, kPa: 1000, bar: 100000, psi: 6894.76, atm: 101325 }}
    />
  );
}

function dateOnly(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function DateAddCalc() {
  const [start, setStart] = useState("2026-01-01");
  const [days, setDays] = useState(30);
  const target = useMemo(() => {
    const d = new Date(start);
    if (isNaN(d.getTime())) return "—";
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }, [start, days]);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Start date">
          <TextInput type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
        <Field label="Days to add/subtract">
          <NumberInput value={days} onChange={(e) => setDays(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Result date" value={target} />
      </ResultBox>
    </div>
  );
}

export function BusinessDaysCalc() {
  const [start, setStart] = useState("2026-01-01");
  const [end, setEnd] = useState("2026-02-01");
  const working = useMemo(() => {
    const a = dateOnly(new Date(start));
    const b = dateOnly(new Date(end));
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return 0;
    const dir = a <= b ? 1 : -1;
    const d = new Date(a);
    let count = 0;
    while ((dir > 0 && d <= b) || (dir < 0 && d >= b)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) count += dir;
      d.setDate(d.getDate() + dir);
    }
    return count;
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
        <Stat label="Business days (Mon-Fri)" value={fmtNumber(working, 0)} />
      </ResultBox>
    </div>
  );
}

export function IdealWeightCalc() {
  const [heightCm, setHeightCm] = useState(175);
  const lower = 18.5 * Math.pow(heightCm / 100, 2);
  const upper = 24.9 * Math.pow(heightCm / 100, 2);
  return (
    <div>
      <Field label="Height (cm)">
        <NumberInput value={heightCm} onChange={(e) => setHeightCm(+e.target.value)} />
      </Field>
      <ResultBox>
        <Stat
          label="Healthy weight range"
          value={`${fmtNumber(lower, 1)} kg - ${fmtNumber(upper, 1)} kg`}
        />
      </ResultBox>
    </div>
  );
}

export function BodyFatCalc() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [waist, setWaist] = useState(34);
  const [neck, setNeck] = useState(15);
  const [height, setHeight] = useState(70);
  const [hip, setHip] = useState(38);
  const bf = useMemo(() => {
    if (sex === "male")
      return 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    return 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
  }, [sex, waist, neck, height, hip]);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Sex">
          <Select value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </Field>
        <Field label="Height (in)">
          <NumberInput value={height} onChange={(e) => setHeight(+e.target.value)} />
        </Field>
        <Field label="Neck (in)">
          <NumberInput value={neck} onChange={(e) => setNeck(+e.target.value)} />
        </Field>
        <Field label="Waist (in)">
          <NumberInput value={waist} onChange={(e) => setWaist(+e.target.value)} />
        </Field>
        {sex === "female" && (
          <Field label="Hip (in)">
            <NumberInput value={hip} onChange={(e) => setHip(+e.target.value)} />
          </Field>
        )}
      </div>
      <ResultBox>
        <Stat label="Body fat estimate" value={`${fmtNumber(bf, 1)}%`} />
      </ResultBox>
    </div>
  );
}

export function CookingConverterCalc() {
  return (
    <GenericConverter
      label="Cooking volume"
      map={{ tsp: 1, tbsp: 3, "fl oz": 6, cup: 48, pint: 96, quart: 192, ml: 0.202884 }}
    />
  );
}

export function OvenTemperatureCalc() {
  const [value, setValue] = useState(180);
  const [from, setFrom] = useState<"C" | "F">("C");
  const f = from === "C" ? value * 1.8 + 32 : value;
  const c = from === "F" ? (value - 32) / 1.8 : value;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Temperature">
          <NumberInput value={value} onChange={(e) => setValue(+e.target.value)} />
        </Field>
        <Field label="Input unit">
          <Select value={from} onChange={(e) => setFrom(e.target.value as "C" | "F")}>
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
          </Select>
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Celsius" value={`${fmtNumber(c, 1)} °C`} />
          <Stat label="Fahrenheit" value={`${fmtNumber(f, 1)} °F`} />
          <Stat label="Gas mark (approx.)" value={fmtNumber((c - 135) / 14, 1)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function CreditCardRepaymentCalc() {
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(22);
  const [currency, setCurrency] = useState("USD");
  const [mode, setMode] = useState<"fixed" | "percent">("fixed");
  const [monthly, setMonthly] = useState(200);
  const [percent, setPercent] = useState(4);
  const [minFloor, setMinFloor] = useState(25);
  const [extra, setExtra] = useState(0);

  const result = useMemo(() => {
    let bal = balance;
    let months = 0;
    let totalInterest = 0;
    const r = apr / 100 / 12;
    while (bal > 0 && months < 600) {
      const interest = bal * r;
      const basePayment = mode === "fixed" ? monthly : Math.max(minFloor, bal * (percent / 100));
      const payment = Math.max(0, basePayment + extra);
      totalInterest += interest;
      bal = bal + interest - payment;
      months += 1;
      if (payment <= interest) break;
    }
    return { months, totalInterest, paid: balance + totalInterest, repaid: bal <= 0 };
  }, [balance, apr, mode, monthly, percent, minFloor, extra]);

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
        <Field label="Card balance">
          <NumberInput value={balance} onChange={(e) => setBalance(+e.target.value)} />
        </Field>
        <Field label="APR (%)">
          <NumberInput value={apr} onChange={(e) => setApr(+e.target.value)} />
        </Field>
        <Field label="Payment mode">
          <Select value={mode} onChange={(e) => setMode(e.target.value as "fixed" | "percent")}>
            <option value="fixed">Fixed monthly payment</option>
            <option value="percent">% of balance</option>
          </Select>
        </Field>
        {mode === "fixed" ? (
          <Field label="Monthly payment">
            <NumberInput value={monthly} onChange={(e) => setMonthly(+e.target.value)} />
          </Field>
        ) : (
          <>
            <Field label="Payment % of balance">
              <NumberInput value={percent} onChange={(e) => setPercent(+e.target.value)} />
            </Field>
            <Field label="Minimum payment floor">
              <NumberInput value={minFloor} onChange={(e) => setMinFloor(+e.target.value)} />
            </Field>
          </>
        )}
        <Field label="Extra monthly payment">
          <NumberInput value={extra} onChange={(e) => setExtra(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        {result.repaid ? (
          <div className="grid gap-6 sm:grid-cols-3">
            <Stat label="Payoff time" value={`${result.months} months`} />
            <Stat label="Interest paid" value={fmtMoney(result.totalInterest, currency)} />
            <Stat label="Total paid" value={fmtMoney(result.paid, currency)} />
          </div>
        ) : (
          <Stat label="Payment too low" value="Increase monthly payment to reduce principal." />
        )}
      </ResultBox>
    </div>
  );
}

export function LoanPayoffCalc() {
  const [principal, setPrincipal] = useState(25000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [extra, setExtra] = useState(150);
  const [startMonth, setStartMonth] = useState(1);
  const [currency, setCurrency] = useState("USD");

  const result = useMemo(() => {
    const baseMonths = years * 12;
    const basePay = monthlyPayment(principal, rate, baseMonths);
    let bal = principal;
    let months = 0;
    let totalInterest = 0;
    const r = rate / 100 / 12;
    while (bal > 0 && months < 600) {
      const interest = bal * r;
      totalInterest += interest;
      const extraNow = months + 1 >= startMonth ? extra : 0;
      bal = bal + interest - (basePay + extraNow);
      months += 1;
    }
    const newTotalPaid = principal + totalInterest;
    const baseTotalPaid = basePay * baseMonths;
    const interestSaved = Math.max(0, baseTotalPaid - newTotalPaid);
    return { basePay, baseMonths, payoffMonths: months, interestSaved, newTotalPaid };
  }, [principal, rate, years, extra, startMonth]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-6">
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
        <Field label="Interest (%)">
          <NumberInput value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
        <Field label="Original term (years)">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
        <Field label="Extra monthly payment">
          <NumberInput value={extra} onChange={(e) => setExtra(+e.target.value)} />
        </Field>
        <Field label="Extra starts at month">
          <NumberInput value={startMonth} onChange={(e) => setStartMonth(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-4">
          <Stat label="Scheduled monthly payment" value={fmtMoney(result.basePay, currency)} />
          <Stat label="New payoff term" value={`${result.payoffMonths} months`} />
          <Stat
            label="Time saved"
            value={`${Math.max(0, result.baseMonths - result.payoffMonths)} months`}
          />
          <Stat label="Interest saved (est.)" value={fmtMoney(result.interestSaved, currency)} />
        </div>
        <div className="mt-4">
          <Stat
            label="Estimated total paid with extra"
            value={fmtMoney(result.newTotalPaid, currency)}
          />
        </div>
      </ResultBox>
    </div>
  );
}

export function MortgageRefinanceCalc() {
  const [balance, setBalance] = useState(280000);
  const [currency, setCurrency] = useState("USD");
  const [currentRate, setCurrentRate] = useState(7);
  const [currentYearsLeft, setCurrentYearsLeft] = useState(25);
  const [newRate, setNewRate] = useState(5.8);
  const [newYears, setNewYears] = useState(25);
  const [closingCost, setClosingCost] = useState(4000);
  const [cashOut, setCashOut] = useState(0);
  const [rollFeesIntoLoan, setRollFeesIntoLoan] = useState(true);

  const result = useMemo(() => {
    const oldMonths = currentYearsLeft * 12;
    const newMonths = newYears * 12;
    const refinancePrincipal = balance + cashOut + (rollFeesIntoLoan ? closingCost : 0);
    const oldPay = monthlyPayment(balance, currentRate, oldMonths);
    const newPay = monthlyPayment(refinancePrincipal, newRate, newMonths);
    const monthlySave = oldPay - newPay;
    const upfront = rollFeesIntoLoan ? 0 : closingCost;
    const breakEvenMonths = monthlySave > 0 ? (upfront + closingCost) / monthlySave : Infinity;
    return { oldPay, newPay, monthlySave, breakEvenMonths, refinancePrincipal };
  }, [
    balance,
    currentRate,
    currentYearsLeft,
    newRate,
    newYears,
    closingCost,
    cashOut,
    rollFeesIntoLoan,
  ]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Remaining balance">
          <NumberInput value={balance} onChange={(e) => setBalance(+e.target.value)} />
        </Field>
        <Field label="Current rate (%)">
          <NumberInput value={currentRate} onChange={(e) => setCurrentRate(+e.target.value)} />
        </Field>
        <Field label="Current years left">
          <NumberInput
            value={currentYearsLeft}
            onChange={(e) => setCurrentYearsLeft(+e.target.value)}
          />
        </Field>
        <Field label="Refinance rate (%)">
          <NumberInput value={newRate} onChange={(e) => setNewRate(+e.target.value)} />
        </Field>
        <Field label="New loan term (years)">
          <NumberInput value={newYears} onChange={(e) => setNewYears(+e.target.value)} />
        </Field>
        <Field label="Closing costs">
          <NumberInput value={closingCost} onChange={(e) => setClosingCost(+e.target.value)} />
        </Field>
        <Field label="Cash-out amount">
          <NumberInput value={cashOut} onChange={(e) => setCashOut(+e.target.value)} />
        </Field>
        <Field label="Closing cost handling">
          <Select
            value={rollFeesIntoLoan ? "roll-in" : "upfront"}
            onChange={(e) => setRollFeesIntoLoan(e.target.value === "roll-in")}
          >
            <option value="roll-in">Roll into new loan</option>
            <option value="upfront">Pay upfront</option>
          </Select>
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-4">
          <Stat label="Current payment" value={fmtMoney(result.oldPay, currency)} />
          <Stat label="Refi payment" value={fmtMoney(result.newPay, currency)} />
          <Stat label="New principal" value={fmtMoney(result.refinancePrincipal, currency)} />
          <Stat
            label="Break-even"
            value={
              isFinite(result.breakEvenMonths)
                ? `${fmtNumber(result.breakEvenMonths, 1)} months`
                : "No savings"
            }
          />
        </div>
      </ResultBox>
    </div>
  );
}

export function CaloriesBurnedCalc() {
  const [weightKg, setWeightKg] = useState(70);
  const [minutes, setMinutes] = useState(45);
  const [met, setMet] = useState(6);
  const calories = (met * 3.5 * weightKg * minutes) / 200;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Weight (kg)">
          <NumberInput value={weightKg} onChange={(e) => setWeightKg(+e.target.value)} />
        </Field>
        <Field label="Duration (minutes)">
          <NumberInput value={minutes} onChange={(e) => setMinutes(+e.target.value)} />
        </Field>
        <Field label="Activity intensity (MET)">
          <NumberInput value={met} onChange={(e) => setMet(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Estimated calories burned" value={fmtNumber(calories, 0)} />
      </ResultBox>
    </div>
  );
}

export function TDEECalc() {
  const [bmr, setBmr] = useState(1700);
  const [activity, setActivity] = useState(1.55);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="BMR (kcal/day)">
          <NumberInput value={bmr} onChange={(e) => setBmr(+e.target.value)} />
        </Field>
        <Field label="Activity level">
          <Select value={activity} onChange={(e) => setActivity(+e.target.value)}>
            <option value={1.2}>Sedentary</option>
            <option value={1.375}>Lightly active</option>
            <option value={1.55}>Moderately active</option>
            <option value={1.725}>Very active</option>
            <option value={1.9}>Extra active</option>
          </Select>
        </Field>
      </div>
      <ResultBox>
        <Stat label="TDEE (kcal/day)" value={fmtNumber(bmr * activity, 0)} />
      </ResultBox>
    </div>
  );
}

export function WaistToHipCalc() {
  const [waist, setWaist] = useState(80);
  const [hip, setHip] = useState(95);
  const ratio = waist / Math.max(1, hip);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Waist (cm)">
          <NumberInput value={waist} onChange={(e) => setWaist(+e.target.value)} />
        </Field>
        <Field label="Hip (cm)">
          <NumberInput value={hip} onChange={(e) => setHip(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Waist-to-hip ratio" value={fmtNumber(ratio, 3)} />
      </ResultBox>
    </div>
  );
}

export function EnergyConverterCalc() {
  return (
    <GenericConverter
      label="Energy"
      map={{ J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3600000, BTU: 1055.06 }}
    />
  );
}

export function DataStorageConverterCalc() {
  return (
    <GenericConverter
      label="Data storage"
      map={{ B: 1, KB: 1000, MB: 1000000, GB: 1_000_000_000, TB: 1_000_000_000_000 }}
    />
  );
}

export function FuelEconomyCalc() {
  const [distanceKm, setDistanceKm] = useState(500);
  const [fuelL, setFuelL] = useState(35);
  const lPer100 = (fuelL / Math.max(1, distanceKm)) * 100;
  const kmPerL = distanceKm / Math.max(0.0001, fuelL);
  const mpgUs = kmPerL * 2.35215;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Distance (km)">
          <NumberInput value={distanceKm} onChange={(e) => setDistanceKm(+e.target.value)} />
        </Field>
        <Field label="Fuel used (L)">
          <NumberInput value={fuelL} onChange={(e) => setFuelL(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="L/100km" value={fmtNumber(lPer100, 2)} />
          <Stat label="km/L" value={fmtNumber(kmPerL, 2)} />
          <Stat label="MPG (US)" value={fmtNumber(mpgUs, 2)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function GradeCalc() {
  const [current, setCurrent] = useState(82);
  const [currentWeight, setCurrentWeight] = useState(70);
  const [target, setTarget] = useState(90);
  const needed =
    (target - (current * currentWeight) / 100) / Math.max(0.01, 1 - currentWeight / 100);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Current grade (%)">
          <NumberInput value={current} onChange={(e) => setCurrent(+e.target.value)} />
        </Field>
        <Field label="Current weight (%)">
          <NumberInput value={currentWeight} onChange={(e) => setCurrentWeight(+e.target.value)} />
        </Field>
        <Field label="Target final grade (%)">
          <NumberInput value={target} onChange={(e) => setTarget(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Needed on final (%)" value={fmtNumber(needed, 2)} />
      </ResultBox>
    </div>
  );
}

export function TestGradeCalc() {
  const [correct, setCorrect] = useState(42);
  const [total, setTotal] = useState(50);
  const pct = (correct / Math.max(1, total)) * 100;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Correct answers">
          <NumberInput value={correct} onChange={(e) => setCorrect(+e.target.value)} />
        </Field>
        <Field label="Total questions">
          <NumberInput value={total} onChange={(e) => setTotal(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Test grade" value={`${fmtNumber(pct, 2)}%`} />
      </ResultBox>
    </div>
  );
}

export function FuelCostCalc() {
  const [distanceKm, setDistanceKm] = useState(220);
  const [efficiencyL100, setEfficiencyL100] = useState(7.5);
  const [pricePerL, setPricePerL] = useState(1.45);
  const liters = (distanceKm / 100) * efficiencyL100;
  const cost = liters * pricePerL;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Trip distance (km)">
          <NumberInput value={distanceKm} onChange={(e) => setDistanceKm(+e.target.value)} />
        </Field>
        <Field label="Vehicle usage (L/100km)">
          <NumberInput
            value={efficiencyL100}
            onChange={(e) => setEfficiencyL100(+e.target.value)}
          />
        </Field>
        <Field label="Fuel price per liter">
          <NumberInput value={pricePerL} onChange={(e) => setPricePerL(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-2">
          <Stat label="Fuel required" value={`${fmtNumber(liters, 2)} L`} />
          <Stat label="Trip fuel cost" value={fmtMoney(cost)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function CountdownCalc() {
  const [target, setTarget] = useState("2026-12-31");
  const left = useMemo(() => {
    const now = new Date();
    const end = new Date(target);
    const ms = end.getTime() - now.getTime();
    if (!isFinite(ms)) return null;
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    return { days, hours };
  }, [target]);
  return (
    <div>
      <Field label="Target date">
        <TextInput type="date" value={target} onChange={(e) => setTarget(e.target.value)} />
      </Field>
      <ResultBox>
        <Stat
          label="Time remaining"
          value={left ? `${left.days} days ${left.hours} hours` : "Invalid date"}
        />
      </ResultBox>
    </div>
  );
}

export function TimeCardCalc() {
  const [days, setDays] = useState(5);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [breakMin, setBreakMin] = useState(30);
  const totalHours = days * (hoursPerDay - breakMin / 60);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Work days">
          <NumberInput value={days} onChange={(e) => setDays(+e.target.value)} />
        </Field>
        <Field label="Hours per day">
          <NumberInput value={hoursPerDay} onChange={(e) => setHoursPerDay(+e.target.value)} />
        </Field>
        <Field label="Break per day (min)">
          <NumberInput value={breakMin} onChange={(e) => setBreakMin(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Total weekly hours" value={fmtNumber(totalHours, 2)} />
      </ResultBox>
    </div>
  );
}

export function InterestRateCalc() {
  const [pv, setPv] = useState(10000);
  const [fv, setFv] = useState(15000);
  const [years, setYears] = useState(5);
  const [compoundingsPerYear, setCompoundingsPerYear] = useState(12);
  const rate = (Math.pow(fv / Math.max(1, pv), 1 / Math.max(0.01, years)) - 1) * 100;
  const nominalRate =
    compoundingsPerYear *
    (Math.pow(1 + rate / 100, 1 / Math.max(1, compoundingsPerYear)) - 1) *
    100;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-4">
        <Field label="Present value">
          <NumberInput value={pv} onChange={(e) => setPv(+e.target.value)} />
        </Field>
        <Field label="Future value">
          <NumberInput value={fv} onChange={(e) => setFv(+e.target.value)} />
        </Field>
        <Field label="Years">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
        <Field label="Compounding periods/year">
          <NumberInput
            value={compoundingsPerYear}
            onChange={(e) => setCompoundingsPerYear(+e.target.value)}
          />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-2">
          <Stat label="Implied effective annual rate" value={`${fmtNumber(rate, 3)}%`} />
          <Stat label="Equivalent nominal annual rate" value={`${fmtNumber(nominalRate, 3)}%`} />
        </div>
      </ResultBox>
    </div>
  );
}

export function InvestmentCalc() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(300);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const [compoundingsPerYear, setCompoundingsPerYear] = useState(12);
  const [currency, setCurrency] = useState("USD");
  const months = years * 12;
  const r = rate / 100 / compoundingsPerYear;
  const n = years * compoundingsPerYear;
  const monthlyToCompounding = 12 / compoundingsPerYear;
  const fv =
    initial * Math.pow(1 + r, n) +
    monthly * monthlyToCompounding * ((Math.pow(1 + r, n) - 1) / (r || 1));
  const totalContributions = initial + monthly * months;
  const totalGrowth = fv - totalContributions;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-6">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Initial amount">
          <NumberInput value={initial} onChange={(e) => setInitial(+e.target.value)} />
        </Field>
        <Field label="Monthly contribution">
          <NumberInput value={monthly} onChange={(e) => setMonthly(+e.target.value)} />
        </Field>
        <Field label="Expected annual return (%)">
          <NumberInput value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
        <Field label="Years">
          <NumberInput value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
        <Field label="Compounding periods/year">
          <NumberInput
            value={compoundingsPerYear}
            onChange={(e) => setCompoundingsPerYear(+e.target.value)}
          />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Projected future value" value={fmtMoney(fv, currency)} />
          <Stat label="Total contributions" value={fmtMoney(totalContributions, currency)} />
          <Stat label="Estimated growth" value={fmtMoney(totalGrowth, currency)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function RetirementCalc() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [current, setCurrent] = useState(25000);
  const [monthly, setMonthly] = useState(400);
  const [rate, setRate] = useState(7);
  const [inflation, setInflation] = useState(2.5);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [currency, setCurrency] = useState("USD");
  const years = Math.max(0, retireAge - age);
  const months = years * 12;
  const r = rate / 100 / 12;
  const corpus =
    current * Math.pow(1 + r, months) + monthly * ((Math.pow(1 + r, months) - 1) / (r || 1));
  const inflationAdjustedCorpus = corpus / Math.pow(1 + inflation / 100, years);
  const firstYearIncome = corpus * (withdrawalRate / 100);
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
        <Field label="Current age">
          <NumberInput value={age} onChange={(e) => setAge(+e.target.value)} />
        </Field>
        <Field label="Retirement age">
          <NumberInput value={retireAge} onChange={(e) => setRetireAge(+e.target.value)} />
        </Field>
        <Field label="Current savings">
          <NumberInput value={current} onChange={(e) => setCurrent(+e.target.value)} />
        </Field>
        <Field label="Monthly contribution">
          <NumberInput value={monthly} onChange={(e) => setMonthly(+e.target.value)} />
        </Field>
        <Field label="Annual return (%)">
          <NumberInput value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
        <Field label="Inflation (%)">
          <NumberInput value={inflation} onChange={(e) => setInflation(+e.target.value)} />
        </Field>
        <Field label="Withdrawal rate (%)">
          <NumberInput
            value={withdrawalRate}
            onChange={(e) => setWithdrawalRate(+e.target.value)}
          />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-4">
          <Stat label="Years to retire" value={years} />
          <Stat label="Projected retirement corpus" value={fmtMoney(corpus, currency)} />
          <Stat
            label="Inflation-adjusted corpus (today's value)"
            value={fmtMoney(inflationAdjustedCorpus, currency)}
          />
          <Stat
            label="Estimated first-year retirement income"
            value={fmtMoney(firstYearIncome, currency)}
          />
        </div>
      </ResultBox>
    </div>
  );
}

export function TaxCalc() {
  const [income, setIncome] = useState(60000);
  const [filing, setFiling] = useState<"single" | "married">("single");
  const [deduction, setDeduction] = useState(0);
  const [otherTax, setOtherTax] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const taxable = Math.max(0, income - deduction);

  function computeProgressiveTax(amount: number) {
    const brackets =
      filing === "single"
        ? [
            { upTo: 11600, rate: 0.1 },
            { upTo: 47150, rate: 0.12 },
            { upTo: 100525, rate: 0.22 },
            { upTo: 191950, rate: 0.24 },
            { upTo: Infinity, rate: 0.32 },
          ]
        : [
            { upTo: 23200, rate: 0.1 },
            { upTo: 94300, rate: 0.12 },
            { upTo: 201050, rate: 0.22 },
            { upTo: 383900, rate: 0.24 },
            { upTo: Infinity, rate: 0.32 },
          ];

    let remaining = amount;
    let lastCap = 0;
    let total = 0;
    for (const b of brackets) {
      if (remaining <= 0) break;
      const cap = b.upTo;
      const span = cap - lastCap;
      const taxedPart = Math.min(remaining, span);
      total += taxedPart * b.rate;
      remaining -= taxedPart;
      lastCap = cap;
    }
    return total;
  }

  const progressiveTax = computeProgressiveTax(taxable);
  const totalTax = progressiveTax + otherTax;
  const net = income - totalTax;
  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-5">
        <Field label="Currency">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Taxable income">
          <NumberInput value={income} onChange={(e) => setIncome(+e.target.value)} />
        </Field>
        <Field label="Filing status">
          <Select
            value={filing}
            onChange={(e) => setFiling(e.target.value as "single" | "married")}
          >
            <option value="single">Single</option>
            <option value="married">Married filing jointly</option>
          </Select>
        </Field>
        <Field label="Deductions">
          <NumberInput value={deduction} onChange={(e) => setDeduction(+e.target.value)} />
        </Field>
        <Field label="Other taxes">
          <NumberInput value={otherTax} onChange={(e) => setOtherTax(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-4">
          <Stat label="Taxable after deductions" value={fmtMoney(taxable, currency)} />
          <Stat label="Estimated tax" value={fmtMoney(totalTax, currency)} />
          <Stat label="After-tax income" value={fmtMoney(net, currency)} />
          <Stat label="Effective tax rate" value={`${fmtNumber(effectiveRate, 2)}%`} />
        </div>
      </ResultBox>
    </div>
  );
}

export function ButterConverterCalc() {
  return (
    <GenericConverter
      label="Butter"
      map={{ g: 1, oz: 28.3495, tbsp: 14.2, cup: 227, stick: 113.5 }}
    />
  );
}

export function FlourConverterCalc() {
  return <GenericConverter label="Flour" map={{ g: 1, cup: 120, tbsp: 7.5, oz: 28.3495 }} />;
}

export function SugarConverterCalc() {
  return (
    <GenericConverter label="Sugar" map={{ g: 1, cup: 200, tbsp: 12.5, tsp: 4.2, oz: 28.3495 }} />
  );
}

export function ConcreteCalc() {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(5);
  const [depthCm, setDepthCm] = useState(10);
  const volumeM3 = length * width * (depthCm / 100);
  const yards3 = volumeM3 * 1.30795;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Length (m)">
          <NumberInput value={length} onChange={(e) => setLength(+e.target.value)} />
        </Field>
        <Field label="Width (m)">
          <NumberInput value={width} onChange={(e) => setWidth(+e.target.value)} />
        </Field>
        <Field label="Depth (cm)">
          <NumberInput value={depthCm} onChange={(e) => setDepthCm(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-2">
          <Stat label="Concrete volume (m³)" value={fmtNumber(volumeM3, 3)} />
          <Stat label="Concrete volume (yd³)" value={fmtNumber(yards3, 3)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function GravelCalc() {
  const [areaM2, setAreaM2] = useState(40);
  const [depthCm, setDepthCm] = useState(5);
  const [density, setDensity] = useState(1.6);
  const volume = areaM2 * (depthCm / 100);
  const tons = volume * density;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Area (m²)">
          <NumberInput value={areaM2} onChange={(e) => setAreaM2(+e.target.value)} />
        </Field>
        <Field label="Depth (cm)">
          <NumberInput value={depthCm} onChange={(e) => setDepthCm(+e.target.value)} />
        </Field>
        <Field label="Material density (t/m³)">
          <NumberInput value={density} onChange={(e) => setDensity(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <Stat label="Required gravel (tons)" value={fmtNumber(tons, 2)} />
      </ResultBox>
    </div>
  );
}

export function MulchCalc() {
  const [areaM2, setAreaM2] = useState(30);
  const [depthCm, setDepthCm] = useState(7);
  const volumeM3 = areaM2 * (depthCm / 100);
  const bags50L = (volumeM3 * 1000) / 50;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Area (m²)">
          <NumberInput value={areaM2} onChange={(e) => setAreaM2(+e.target.value)} />
        </Field>
        <Field label="Depth (cm)">
          <NumberInput value={depthCm} onChange={(e) => setDepthCm(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-2">
          <Stat label="Mulch volume (m³)" value={fmtNumber(volumeM3, 3)} />
          <Stat label="50L bags needed" value={fmtNumber(bags50L, 1)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function CarLoanCalc() {
  const [price, setPrice] = useState(30000);
  const [currency, setCurrency] = useState("USD");
  const [down, setDown] = useState(5000);
  const [tradeIn, setTradeIn] = useState(0);
  const [tradeInOwed, setTradeInOwed] = useState(0);
  const [salesTaxPct, setSalesTaxPct] = useState(7);
  const [taxBeforeRebates, setTaxBeforeRebates] = useState(false);
  const [fees, setFees] = useState(600);
  const [rebates, setRebates] = useState(0);
  const [apr, setApr] = useState(6.9);
  const [months, setMonths] = useState(60);

  const netTradeIn = tradeIn - tradeInOwed;
  const taxable = taxBeforeRebates
    ? Math.max(0, price - netTradeIn)
    : Math.max(0, price - rebates - netTradeIn);
  const tax = taxable * (salesTaxPct / 100);
  const principal = Math.max(0, price + tax + fees - down - rebates - netTradeIn);
  const monthly = monthlyPayment(principal, apr, months);
  const totalPaid = monthly * months + down;
  const totalInterest = monthly * months - principal;

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
        <Field label="Vehicle price">
          <NumberInput value={price} onChange={(e) => setPrice(+e.target.value)} />
        </Field>
        <Field label="Down payment">
          <NumberInput value={down} onChange={(e) => setDown(+e.target.value)} />
        </Field>
        <Field label="Trade-in value">
          <NumberInput value={tradeIn} onChange={(e) => setTradeIn(+e.target.value)} />
        </Field>
        <Field label="Trade-in loan balance">
          <NumberInput value={tradeInOwed} onChange={(e) => setTradeInOwed(+e.target.value)} />
        </Field>
        <Field label="Rebates">
          <NumberInput value={rebates} onChange={(e) => setRebates(+e.target.value)} />
        </Field>
        <Field label="Sales tax (%)">
          <NumberInput value={salesTaxPct} onChange={(e) => setSalesTaxPct(+e.target.value)} />
        </Field>
        <Field label="Tax calculation">
          <Select
            value={taxBeforeRebates ? "before" : "after"}
            onChange={(e) => setTaxBeforeRebates(e.target.value === "before")}
          >
            <option value="after">After rebates</option>
            <option value="before">Before rebates</option>
          </Select>
        </Field>
        <Field label="Fees">
          <NumberInput value={fees} onChange={(e) => setFees(+e.target.value)} />
        </Field>
        <Field label="APR (%)">
          <NumberInput value={apr} onChange={(e) => setApr(+e.target.value)} />
        </Field>
        <Field label="Loan term (months)">
          <NumberInput value={months} onChange={(e) => setMonths(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-4">
          <Stat label="Loan amount" value={fmtMoney(principal, currency)} />
          <Stat label="Sales tax amount" value={fmtMoney(tax, currency)} />
          <Stat label="Monthly payment" value={fmtMoney(monthly, currency)} />
          <Stat label="Total interest" value={fmtMoney(totalInterest, currency)} />
        </div>
        <div className="mt-4">
          <Stat label="Total paid (incl. down payment)" value={fmtMoney(totalPaid, currency)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function CashBackCalc() {
  const [baseSpend, setBaseSpend] = useState(800);
  const [bonusSpend, setBonusSpend] = useState(400);
  const [currency, setCurrency] = useState("USD");
  const [baseRate, setBaseRate] = useState(1.5);
  const [bonusRate, setBonusRate] = useState(3);
  const [bonusCap, setBonusCap] = useState(500);
  const [annualFee, setAnnualFee] = useState(95);
  const [bonus, setBonus] = useState(150);
  const [months, setMonths] = useState(12);
  const baseCashback = baseSpend * months * (baseRate / 100);
  const effectiveBonusSpend = Math.min(bonusSpend, bonusCap);
  const bonusCashback = effectiveBonusSpend * months * (bonusRate / 100);
  const grossCashback = baseCashback + bonusCashback;
  const net = grossCashback + bonus - annualFee;
  const totalSpend = (baseSpend + bonusSpend) * months;
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
        <Field label="Base monthly spend">
          <NumberInput value={baseSpend} onChange={(e) => setBaseSpend(+e.target.value)} />
        </Field>
        <Field label="Base cashback rate (%)">
          <NumberInput value={baseRate} onChange={(e) => setBaseRate(+e.target.value)} />
        </Field>
        <Field label="Bonus-category monthly spend">
          <NumberInput value={bonusSpend} onChange={(e) => setBonusSpend(+e.target.value)} />
        </Field>
        <Field label="Bonus cashback rate (%)">
          <NumberInput value={bonusRate} onChange={(e) => setBonusRate(+e.target.value)} />
        </Field>
        <Field label="Bonus spend cap / month">
          <NumberInput value={bonusCap} onChange={(e) => setBonusCap(+e.target.value)} />
        </Field>
        <Field label="Annual fee">
          <NumberInput value={annualFee} onChange={(e) => setAnnualFee(+e.target.value)} />
        </Field>
        <Field label="Signup bonus">
          <NumberInput value={bonus} onChange={(e) => setBonus(+e.target.value)} />
        </Field>
        <Field label="Analysis period (months)">
          <NumberInput value={months} onChange={(e) => setMonths(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-4">
          <Stat label="Base cashback" value={fmtMoney(baseCashback, currency)} />
          <Stat label="Bonus cashback" value={fmtMoney(bonusCashback, currency)} />
          <Stat label="Gross cashback" value={fmtMoney(grossCashback, currency)} />
          <Stat label="Net rewards" value={fmtMoney(net, currency)} />
          <Stat
            label="Effective return rate"
            value={`${fmtNumber((net / Math.max(1, totalSpend)) * 100, 2)}%`}
          />
        </div>
      </ResultBox>
    </div>
  );
}

export function NetWorthCalc() {
  const [cash, setCash] = useState(12000);
  const [investments, setInvestments] = useState(35000);
  const [property, setProperty] = useState(240000);
  const [otherAssets, setOtherAssets] = useState(8000);
  const [mortgage, setMortgage] = useState(180000);
  const [loans, setLoans] = useState(12000);
  const [creditCard, setCreditCard] = useState(1500);
  const [currency, setCurrency] = useState("USD");
  const assets = cash + investments + property + otherAssets;
  const liabilities = mortgage + loans + creditCard;
  const netWorth = assets - liabilities;
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
        <Field label="Cash & bank">
          <NumberInput value={cash} onChange={(e) => setCash(+e.target.value)} />
        </Field>
        <Field label="Investments">
          <NumberInput value={investments} onChange={(e) => setInvestments(+e.target.value)} />
        </Field>
        <Field label="Property value">
          <NumberInput value={property} onChange={(e) => setProperty(+e.target.value)} />
        </Field>
        <Field label="Other assets">
          <NumberInput value={otherAssets} onChange={(e) => setOtherAssets(+e.target.value)} />
        </Field>
        <Field label="Mortgage">
          <NumberInput value={mortgage} onChange={(e) => setMortgage(+e.target.value)} />
        </Field>
        <Field label="Other loans">
          <NumberInput value={loans} onChange={(e) => setLoans(+e.target.value)} />
        </Field>
        <Field label="Credit cards">
          <NumberInput value={creditCard} onChange={(e) => setCreditCard(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Total assets" value={fmtMoney(assets, currency)} />
          <Stat label="Total liabilities" value={fmtMoney(liabilities, currency)} />
          <Stat label="Net worth" value={fmtMoney(netWorth, currency)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function WaterIntakeCalc() {
  const [weightKg, setWeightKg] = useState(70);
  const [activityMin, setActivityMin] = useState(45);
  const [climate, setClimate] = useState(1);
  const liters = weightKg * 0.033 + (activityMin / 30) * 0.35 + climate;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Body weight (kg)">
          <NumberInput value={weightKg} onChange={(e) => setWeightKg(+e.target.value)} />
        </Field>
        <Field label="Exercise per day (min)">
          <NumberInput value={activityMin} onChange={(e) => setActivityMin(+e.target.value)} />
        </Field>
        <Field label="Hot climate adjustment (L)">
          <NumberInput value={climate} onChange={(e) => setClimate(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-2">
          <Stat label="Daily water target" value={`${fmtNumber(liters, 2)} L`} />
          <Stat label="8oz cups" value={fmtNumber((liters * 1000) / 236.588, 1)} />
        </div>
      </ResultBox>
    </div>
  );
}

export function WeightLossCalc() {
  const [currentWeight, setCurrentWeight] = useState(85);
  const [targetWeight, setTargetWeight] = useState(75);
  const [weeks, setWeeks] = useState(16);
  const [tdee, setTdee] = useState(2400);
  const kgToLose = Math.max(0, currentWeight - targetWeight);
  const dailyDeficit = (kgToLose * 7700) / Math.max(1, weeks * 7);
  const targetCalories = Math.max(1200, tdee - dailyDeficit);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-4">
        <Field label="Current weight (kg)">
          <NumberInput value={currentWeight} onChange={(e) => setCurrentWeight(+e.target.value)} />
        </Field>
        <Field label="Target weight (kg)">
          <NumberInput value={targetWeight} onChange={(e) => setTargetWeight(+e.target.value)} />
        </Field>
        <Field label="Goal timeline (weeks)">
          <NumberInput value={weeks} onChange={(e) => setWeeks(+e.target.value)} />
        </Field>
        <Field label="Estimated TDEE">
          <NumberInput value={tdee} onChange={(e) => setTdee(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Weight to lose" value={`${fmtNumber(kgToLose, 1)} kg`} />
          <Stat label="Required daily deficit" value={`${fmtNumber(dailyDeficit, 0)} kcal`} />
          <Stat label="Suggested daily calories" value={`${fmtNumber(targetCalories, 0)} kcal`} />
        </div>
      </ResultBox>
    </div>
  );
}

export function BakingPanCalc() {
  const [fromL, setFromL] = useState(30);
  const [fromW, setFromW] = useState(20);
  const [toL, setToL] = useState(25);
  const [toW, setToW] = useState(18);
  const [recipeAmount, setRecipeAmount] = useState(1);
  const fromArea = fromL * fromW;
  const toArea = toL * toW;
  const factor = toArea / Math.max(1, fromArea);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Original pan length (cm)">
          <NumberInput value={fromL} onChange={(e) => setFromL(+e.target.value)} />
        </Field>
        <Field label="Original pan width (cm)">
          <NumberInput value={fromW} onChange={(e) => setFromW(+e.target.value)} />
        </Field>
        <Field label="New pan length (cm)">
          <NumberInput value={toL} onChange={(e) => setToL(+e.target.value)} />
        </Field>
        <Field label="New pan width (cm)">
          <NumberInput value={toW} onChange={(e) => setToW(+e.target.value)} />
        </Field>
        <Field label="Current recipe amount">
          <NumberInput value={recipeAmount} onChange={(e) => setRecipeAmount(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Area conversion factor" value={fmtNumber(factor, 3)} />
          <Stat label="Adjusted recipe amount" value={fmtNumber(recipeAmount * factor, 3)} />
          <Stat
            label="Scale direction"
            value={factor >= 1 ? "Increase ingredients" : "Decrease ingredients"}
          />
        </div>
      </ResultBox>
    </div>
  );
}

export function YeastConverterCalc() {
  const [amount, setAmount] = useState(7);
  const [from, setFrom] = useState<"instant" | "active" | "fresh">("instant");
  const inInstant = from === "instant" ? amount : from === "active" ? amount * 0.75 : amount * 0.33;
  const active = inInstant / 0.75;
  const fresh = inInstant / 0.33;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Amount (g)">
          <NumberInput value={amount} onChange={(e) => setAmount(+e.target.value)} />
        </Field>
        <Field label="Input yeast type">
          <Select
            value={from}
            onChange={(e) => setFrom(e.target.value as "instant" | "active" | "fresh")}
          >
            <option value="instant">Instant yeast</option>
            <option value="active">Active dry yeast</option>
            <option value="fresh">Fresh yeast</option>
          </Select>
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Instant equivalent" value={`${fmtNumber(inInstant, 2)} g`} />
          <Stat label="Active dry equivalent" value={`${fmtNumber(active, 2)} g`} />
          <Stat label="Fresh equivalent" value={`${fmtNumber(fresh, 2)} g`} />
        </div>
      </ResultBox>
    </div>
  );
}
