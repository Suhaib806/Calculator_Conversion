import { useMemo, useState } from "react";
import { Field, NumberInput, ResultBox, Select, Stat, fmtNumber } from "../CalcLayout";

export function BMICalc() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(75);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [weightLb, setWeightLb] = useState(165);

  const bmi = useMemo(() => {
    if (unit === "metric") {
      const m = heightCm / 100;
      return weightKg / (m * m);
    }
    const inches = heightFt * 12 + heightIn;
    return (weightLb / (inches * inches)) * 703;
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLb]);

  const cat =
    bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal weight" : bmi < 30 ? "Overweight" : "Obese";

  return (
    <div>
      <div className="mb-4 inline-flex rounded-lg border border-border bg-surface p-1">
        {(["metric", "imperial"] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`rounded-md px-3 py-1 text-sm capitalize ${unit === u ? "bg-card shadow-sm" : "text-muted-foreground"}`}
          >
            {u}
          </button>
        ))}
      </div>
      {unit === "metric" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Height (cm)">
            <NumberInput value={heightCm} onChange={(e) => setHeightCm(+e.target.value)} />
          </Field>
          <Field label="Weight (kg)">
            <NumberInput value={weightKg} onChange={(e) => setWeightKg(+e.target.value)} />
          </Field>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Height (ft)">
            <NumberInput value={heightFt} onChange={(e) => setHeightFt(+e.target.value)} />
          </Field>
          <Field label="Height (in)">
            <NumberInput value={heightIn} onChange={(e) => setHeightIn(+e.target.value)} />
          </Field>
          <Field label="Weight (lb)">
            <NumberInput value={weightLb} onChange={(e) => setWeightLb(+e.target.value)} />
          </Field>
        </div>
      )}
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-2">
          <Stat label="Your BMI" value={fmtNumber(bmi, 1)} />
          <Stat label="Category" value={cat} />
        </div>
      </ResultBox>
    </div>
  );
}

export function BMRCalc() {
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState<"male" | "female">("male");
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(75);
  const [activity, setActivity] = useState(1.55);

  // Mifflin–St Jeor
  const bmr = useMemo(() => {
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    return sex === "male" ? base + 5 : base - 161;
  }, [age, sex, heightCm, weightKg]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Sex">
          <Select value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </Field>
        <Field label="Age (years)">
          <NumberInput value={age} onChange={(e) => setAge(+e.target.value)} />
        </Field>
        <Field label="Height (cm)">
          <NumberInput value={heightCm} onChange={(e) => setHeightCm(+e.target.value)} />
        </Field>
        <Field label="Weight (kg)">
          <NumberInput value={weightKg} onChange={(e) => setWeightKg(+e.target.value)} />
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
        <div className="grid gap-6 sm:grid-cols-2">
          <Stat label="BMR (kcal/day)" value={fmtNumber(bmr, 0)} hint="Calories at rest" />
          <Stat label="TDEE (kcal/day)" value={fmtNumber(bmr * activity, 0)} hint="With activity" />
        </div>
      </ResultBox>
    </div>
  );
}
