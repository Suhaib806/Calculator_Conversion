import type { ReactElement } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/Shell";
import { CalcLayout } from "@/components/calc/CalcLayout";
import { CALCULATORS_BY_SLUG, CATEGORY_BY_ID, calculatorsByCategory } from "@/lib/calculators";

import { CompoundInterestCalc } from "@/components/calc/impl/CompoundInterest";
import { LoanCalc, AmortizationCalc } from "@/components/calc/impl/Loan";
import { CurrencyConverter, SalaryCalc, TipCalc } from "@/components/calc/impl/FinanceMisc";
import { BMICalc, BMRCalc } from "@/components/calc/impl/Health";
import {
  LengthConverter,
  WeightConverter,
  VolumeConverter,
  AreaConverter,
  SpeedConverter,
  TemperatureConverter,
} from "@/components/calc/impl/Conversion";
import { PercentageCalc, DiscountCalc } from "@/components/calc/impl/Math";
import { AgeCalc, DateDiffCalc, HoursCalc } from "@/components/calc/impl/Time";
import { RandomNumberCalc, GPACalc, RecipeScaler } from "@/components/calc/impl/Misc";
import {
  APYCalc,
  BakingPanCalc,
  BodyFatCalc,
  CarLoanCalc,
  ButterConverterCalc,
  CaloriesBurnedCalc,
  CountdownCalc,
  CreditCardRepaymentCalc,
  DataStorageConverterCalc,
  BusinessDaysCalc,
  CAGRCalc,
  CookingConverterCalc,
  DateAddCalc,
  EnergyConverterCalc,
  FuelCostCalc,
  FuelEconomyCalc,
  GravelCalc,
  FutureValueCalc,
  GradeCalc,
  IdealWeightCalc,
  InterestRateCalc,
  InvestmentCalc,
  CashBackCalc,
  LoanPayoffCalc,
  MarginCalc,
  MortgageRefinanceCalc,
  MulchCalc,
  OvenTemperatureCalc,
  PowerConverter,
  PressureConverter,
  ROICalc,
  RetirementCalc,
  SavingsGoalCalc,
  SimpleInterestCalc,
  TDEECalc,
  TestGradeCalc,
  TimeCardCalc,
  TaxCalc,
  VATCalc,
  WaistToHipCalc,
  ConcreteCalc,
  FlourConverterCalc,
  NetWorthCalc,
  SugarConverterCalc,
  WaterIntakeCalc,
  WeightLossCalc,
  YeastConverterCalc,
} from "@/components/calc/impl/FeaturePack";

const REGISTRY: Record<string, () => ReactElement> = {
  "compound-interest": () => <CompoundInterestCalc />,
  "compound-interest-daily": () => <CompoundInterestCalc daily />,
  loan: () => <LoanCalc />,
  "car-loan": () => <CarLoanCalc />,
  "cash-back": () => <CashBackCalc />,
  "net-worth": () => <NetWorthCalc />,
  mortgage: () => (
    <LoanCalc defaults={{ principal: 350000, rate: 6.5, years: 30, label: "Mortgage" }} />
  ),
  amortization: () => <AmortizationCalc />,
  "currency-converter": () => <CurrencyConverter />,
  salary: () => <SalaryCalc />,
  tip: () => <TipCalc />,
  "credit-card-repayment": () => <CreditCardRepaymentCalc />,
  "loan-payoff": () => <LoanPayoffCalc />,
  "mortgage-refinance": () => <MortgageRefinanceCalc />,
  apy: () => <APYCalc />,
  cagr: () => <CAGRCalc />,
  "future-value": () => <FutureValueCalc />,
  "interest-rate": () => <InterestRateCalc />,
  investment: () => <InvestmentCalc />,
  retirement: () => <RetirementCalc />,
  "savings-goal": () => <SavingsGoalCalc />,
  "simple-interest": () => <SimpleInterestCalc />,
  roi: () => <ROICalc />,
  tax: () => <TaxCalc />,
  vat: () => <VATCalc />,
  margin: () => <MarginCalc />,
  bmi: () => <BMICalc />,
  bmr: () => <BMRCalc />,
  "body-fat": () => <BodyFatCalc />,
  "calories-burned": () => <CaloriesBurnedCalc />,
  "ideal-weight": () => <IdealWeightCalc />,
  tdee: () => <TDEECalc />,
  "waist-to-hip": () => <WaistToHipCalc />,
  "water-intake": () => <WaterIntakeCalc />,
  "weight-loss": () => <WeightLossCalc />,
  length: () => <LengthConverter />,
  weight: () => <WeightConverter />,
  volume: () => <VolumeConverter />,
  area: () => <AreaConverter />,
  speed: () => <SpeedConverter />,
  temperature: () => <TemperatureConverter />,
  energy: () => <EnergyConverterCalc />,
  "data-storage": () => <DataStorageConverterCalc />,
  "fuel-economy": () => <FuelEconomyCalc />,
  power: () => <PowerConverter />,
  pressure: () => <PressureConverter />,
  "cooking-converter": () => <CookingConverterCalc />,
  "oven-temperature": () => <OvenTemperatureCalc />,
  "baking-pan": () => <BakingPanCalc />,
  yeast: () => <YeastConverterCalc />,
  butter: () => <ButterConverterCalc />,
  flour: () => <FlourConverterCalc />,
  sugar: () => <SugarConverterCalc />,
  percentage: () => <PercentageCalc />,
  discount: () => <DiscountCalc />,
  age: () => <AgeCalc />,
  "date-difference": () => <DateDiffCalc />,
  "date-add": () => <DateAddCalc />,
  "business-days": () => <BusinessDaysCalc />,
  countdown: () => <CountdownCalc />,
  hours: () => <HoursCalc />,
  "time-card": () => <TimeCardCalc />,
  "random-number": () => <RandomNumberCalc />,
  gpa: () => <GPACalc />,
  grade: () => <GradeCalc />,
  "test-grade": () => <TestGradeCalc />,
  "fuel-cost": () => <FuelCostCalc />,
  "recipe-scaler": () => <RecipeScaler />,
  concrete: () => <ConcreteCalc />,
  gravel: () => <GravelCalc />,
  mulch: () => <MulchCalc />,
};

export const Route = createFileRoute("/calc/$slug")({
  head: ({ params }) => {
    const c = CALCULATORS_BY_SLUG[params.slug];
    if (!c) return { meta: [{ title: "Calculator — calc.site" }] };
    const title = `${c.name} — calc.site`;
    return {
      meta: [
        { title },
        { name: "description", content: c.description },
        { property: "og:title", content: title },
        { property: "og:description", content: c.description },
      ],
    };
  },
  loader: ({ params }) => {
    if (!CALCULATORS_BY_SLUG[params.slug]) throw notFound();
    return null;
  },
  notFoundComponent: () => (
    <Shell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Calculator not found</h1>
        <p className="mt-2 text-muted-foreground">
          The calculator you're looking for doesn't exist.
        </p>
        <Link
          to="/all"
          className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Browse all
        </Link>
      </div>
    </Shell>
  ),
  component: CalcPage,
});

function CalcPage() {
  const { slug } = Route.useParams();
  const calc = CALCULATORS_BY_SLUG[slug];
  const Impl = REGISTRY[slug];
  const related = calculatorsByCategory(calc.category)
    .filter((c) => c.slug !== slug)
    .slice(0, 6);

  return (
    <Shell>
      <CalcLayout calc={calc}>{Impl ? <Impl /> : <FallbackByCategory slug={slug} />}</CalcLayout>

      {related.length > 0 && (
        <section className="mx-auto mb-16 max-w-5xl px-4 md:px-6">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            More in {CATEGORY_BY_ID[calc.category].name}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/calc/$slug"
                params={{ slug: r.slug }}
                className="rounded-xl border border-primary/15 bg-white p-4 text-sm shadow-sm shadow-primary/10 transition-colors hover:bg-accent"
              >
                <div className="font-medium">{r.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{r.description}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Shell>
  );
}

function FallbackByCategory({ slug }: { slug: string }) {
  const calc = CALCULATORS_BY_SLUG[slug];
  switch (calc.category) {
    case "finance":
      return <InvestmentCalc />;
    case "health":
      return <BMICalc />;
    case "conversion":
      return <LengthConverter />;
    case "math":
      return <PercentageCalc />;
    case "home-garden":
      return <ConcreteCalc />;
    case "cooking":
      return <CookingConverterCalc />;
    case "time":
      return <DateDiffCalc />;
    case "misc":
      return <RandomNumberCalc />;
    default:
      return <ReadyFallbackNote />;
  }
}

function ReadyFallbackNote() {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto mb-4 inline-flex rounded-full border border-primary/20 bg-secondary px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
        Live fallback
      </div>
      <h2 className="font-display text-xl font-semibold">This calculator is ready to use</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        A category-tuned calculator is loaded for this page so visitors can calculate immediately.
      </p>
      <Link
        to="/all"
        className="mt-6 inline-block rounded-lg border border-primary/20 bg-white px-4 py-2 text-sm hover:bg-accent"
      >
        Browse working calculators
      </Link>
    </div>
  );
}
