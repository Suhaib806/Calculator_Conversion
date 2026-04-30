import { useMemo, useState } from "react";
import { Field, NumberInput, ResultBox, Select, Stat, fmtNumber } from "../CalcLayout";

type UnitMap = Record<string, number>; // factor to base unit

const LENGTH: UnitMap = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};
const WEIGHT: UnitMap = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  t: 1_000_000,
  oz: 28.3495,
  lb: 453.592,
  st: 6350.29,
};
const VOLUME: UnitMap = {
  ml: 1,
  l: 1000,
  "fl oz": 29.5735,
  cup: 236.588,
  pt: 473.176,
  qt: 946.353,
  gal: 3785.41,
};
const AREA: UnitMap = {
  "m²": 1,
  "cm²": 0.0001,
  "km²": 1_000_000,
  "ft²": 0.092903,
  "yd²": 0.836127,
  acre: 4046.86,
  hectare: 10_000,
};
const SPEED: UnitMap = { "m/s": 1, "km/h": 0.27778, mph: 0.44704, knot: 0.51444, "ft/s": 0.3048 };

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

export const LengthConverter = () => <GenericConverter map={LENGTH} label="Length" />;
export const WeightConverter = () => <GenericConverter map={WEIGHT} label="Weight" />;
export const VolumeConverter = () => <GenericConverter map={VOLUME} label="Volume" />;
export const AreaConverter = () => <GenericConverter map={AREA} label="Area" />;
export const SpeedConverter = () => <GenericConverter map={SPEED} label="Speed" />;

export function TemperatureConverter() {
  const [from, setFrom] = useState("C");
  const [to, setTo] = useState("F");
  const [value, setValue] = useState(20);

  const result = useMemo(() => {
    // to Celsius
    let c = value;
    if (from === "F") c = (value - 32) * (5 / 9);
    if (from === "K") c = value - 273.15;
    if (to === "C") return c;
    if (to === "F") return c * (9 / 5) + 32;
    return c + 273.15;
  }, [value, from, to]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Temperature">
          <NumberInput value={value} onChange={(e) => setValue(+e.target.value)} />
        </Field>
        <Field label="From">
          <Select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </Select>
        </Field>
        <Field label="To">
          <Select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </Select>
        </Field>
      </div>
      <ResultBox>
        <Stat label={`${value} °${from} =`} value={`${fmtNumber(result, 4)} °${to}`} />
      </ResultBox>
    </div>
  );
}
