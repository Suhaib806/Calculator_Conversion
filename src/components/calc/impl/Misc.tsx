import { useMemo, useState } from "react";
import { Field, NumberInput, ResultBox, Select, Stat, TextInput, fmtNumber } from "../CalcLayout";

export function RandomNumberCalc() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  function gen() {
    const out: number[] = [];
    for (let i = 0; i < Math.max(1, count); i++) {
      out.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setResults(out);
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Min">
          <NumberInput value={min} onChange={(e) => setMin(+e.target.value)} />
        </Field>
        <Field label="Max">
          <NumberInput value={max} onChange={(e) => setMax(+e.target.value)} />
        </Field>
        <Field label="How many">
          <NumberInput value={count} onChange={(e) => setCount(+e.target.value)} />
        </Field>
      </div>
      <button
        onClick={gen}
        className="mt-5 inline-flex h-11 items-center rounded-lg bg-foreground px-5 text-sm font-medium text-background hover:opacity-90"
      >
        Generate
      </button>
      {results.length > 0 && (
        <ResultBox>
          <Stat label="Result" value={results.join(", ")} />
        </ResultBox>
      )}
    </div>
  );
}

const GRADE_TO_GP: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0,
};

export function GPACalc() {
  const [rows, setRows] = useState([
    { course: "Course 1", credits: 3, grade: "A" },
    { course: "Course 2", credits: 4, grade: "B+" },
    { course: "Course 3", credits: 3, grade: "A-" },
  ]);

  function update(i: number, patch: Partial<(typeof rows)[number]>) {
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  const { gpa, totalCredits } = useMemo(() => {
    let pts = 0,
      c = 0;
    rows.forEach((r) => {
      const gp = GRADE_TO_GP[r.grade] ?? 0;
      pts += gp * r.credits;
      c += r.credits;
    });
    return { gpa: c > 0 ? pts / c : 0, totalCredits: c };
  }, [rows]);

  return (
    <div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-12 gap-2">
            <TextInput
              className="col-span-6"
              value={r.course}
              onChange={(e) => update(i, { course: e.target.value })}
            />
            <NumberInput
              className="col-span-3"
              value={r.credits}
              onChange={(e) => update(i, { credits: +e.target.value })}
            />
            <Select
              className="col-span-3"
              value={r.grade}
              onChange={(e) => update(i, { grade: e.target.value })}
            >
              {Object.keys(GRADE_TO_GP).map((g) => (
                <option key={g}>{g}</option>
              ))}
            </Select>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() =>
            setRows((r) => [...r, { course: `Course ${r.length + 1}`, credits: 3, grade: "A" }])
          }
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent"
        >
          + Add course
        </button>
        {rows.length > 1 && (
          <button
            onClick={() => setRows((r) => r.slice(0, -1))}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent"
          >
            Remove last
          </button>
        )}
      </div>
      <ResultBox>
        <div className="grid gap-6 sm:grid-cols-2">
          <Stat label="GPA" value={fmtNumber(gpa, 2)} />
          <Stat label="Total credits" value={totalCredits} />
        </div>
      </ResultBox>
    </div>
  );
}

export function RecipeScaler() {
  const [orig, setOrig] = useState(4);
  const [target, setTarget] = useState(6);
  const [text, setText] = useState("2 cups flour\n1 tsp salt\n3 eggs\n1.5 cups milk");

  const factor = target / Math.max(1, orig);
  const scaled = text
    .split("\n")
    .map((line) => {
      const m = line.match(/^([\d./]+)\s*(.*)$/);
      if (!m) return line;
      let val = 0;
      if (m[1].includes("/")) {
        const [a, b] = m[1].split("/").map(Number);
        val = a / b;
      } else val = parseFloat(m[1]);
      return `${fmtNumber(val * factor, 2)} ${m[2]}`;
    })
    .join("\n");

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Original servings">
          <NumberInput value={orig} onChange={(e) => setOrig(+e.target.value)} />
        </Field>
        <Field label="Target servings">
          <NumberInput value={target} onChange={(e) => setTarget(+e.target.value)} />
        </Field>
      </div>
      <Field label="Ingredients (one per line)">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-input bg-background p-3 font-mono text-sm outline-none focus:border-foreground/40"
        />
      </Field>
      <ResultBox>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Scaled (×{fmtNumber(factor, 2)})
        </div>
        <pre className="mt-2 whitespace-pre-wrap font-mono text-sm">{scaled}</pre>
      </ResultBox>
    </div>
  );
}
