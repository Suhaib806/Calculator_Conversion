import { useState } from "react";
import { Field, NumberInput, ResultBox, Stat, fmtNumber } from "../CalcLayout";

export function PercentageCalc() {
  const [a, setA] = useState(20);
  const [b, setB] = useState(150);
  const [orig, setOrig] = useState(100);
  const [next, setNext] = useState(125);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 font-display text-lg font-semibold">What is X% of Y?</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Percent (%)">
            <NumberInput value={a} onChange={(e) => setA(+e.target.value)} />
          </Field>
          <Field label="Of">
            <NumberInput value={b} onChange={(e) => setB(+e.target.value)} />
          </Field>
        </div>
        <ResultBox>
          <Stat label="Result" value={fmtNumber((a / 100) * b, 4)} />
        </ResultBox>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold">Percent change</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Original">
            <NumberInput value={orig} onChange={(e) => setOrig(+e.target.value)} />
          </Field>
          <Field label="New">
            <NumberInput value={next} onChange={(e) => setNext(+e.target.value)} />
          </Field>
        </div>
        <ResultBox>
          <Stat label="Change" value={`${fmtNumber(((next - orig) / orig) * 100, 2)}%`} />
        </ResultBox>
      </div>
    </div>
  );
}

export function DiscountCalc() {
  const [price, setPrice] = useState(120);
  const [pct, setPct] = useState(25);
  const final = price * (1 - pct / 100);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Original price">
          <NumberInput value={price} onChange={(e) => setPrice(+e.target.value)} />
        </Field>
        <Field label="Discount (%)">
          <NumberInput value={pct} onChange={(e) => setPct(+e.target.value)} />
        </Field>
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="You save" value={fmtNumber(price - final, 2)} />
          <Stat label="Final price" value={fmtNumber(final, 2)} />
          <Stat label="Discount %" value={`${pct}%`} />
        </div>
      </ResultBox>
    </div>
  );
}
