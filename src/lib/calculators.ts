// Master registry of every calculator on thecalculatorsite.com (improved clone).
// `implemented: true` means a working route exists; otherwise it shows a "coming soon" page.

export type CategoryId =
  | "finance"
  | "health"
  | "conversion"
  | "math"
  | "home-garden"
  | "cooking"
  | "time"
  | "misc";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  tone: string; // tailwind class for accent color e.g. text-cat-finance
}

export interface Calculator {
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  implemented?: boolean;
  keywords?: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "finance",
    name: "Finance",
    blurb: "Loans, mortgages, savings, investments, taxes.",
    tone: "cat-finance",
  },
  {
    id: "health",
    name: "Health",
    blurb: "BMI, BMR, body fat, calories, pregnancy, fitness.",
    tone: "cat-health",
  },
  {
    id: "conversion",
    name: "Conversion",
    blurb: "Length, weight, volume, area, temperature, speed.",
    tone: "cat-conv",
  },
  {
    id: "math",
    name: "Math",
    blurb: "Percentages, fractions, ratios, statistics, geometry.",
    tone: "cat-math",
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    blurb: "Concrete, paint, flooring, gravel, mulch.",
    tone: "cat-home",
  },
  {
    id: "cooking",
    name: "Cooking",
    blurb: "Recipe scaling, baking, oven temps, ingredient swaps.",
    tone: "cat-cook",
  },
  {
    id: "time",
    name: "Time & Date",
    blurb: "Date difference, age, business days, time zones.",
    tone: "cat-time",
  },
  {
    id: "misc",
    name: "Miscellaneous",
    blurb: "Random numbers, password, GPA, grade, fuel.",
    tone: "cat-misc",
  },
];

// ---------------------- The full list ----------------------
export const CALCULATORS: Calculator[] = [
  // ===== FINANCE =====
  {
    slug: "compound-interest",
    name: "Compound Interest",
    category: "finance",
    description: "Calculate future value of savings or investments with compounding.",
    implemented: true,
    keywords: ["savings", "investment", "interest"],
  },
  {
    slug: "compound-interest-daily",
    name: "Compound Interest (Daily)",
    category: "finance",
    description: "Daily-compounded growth projections.",
    implemented: true,
  },
  {
    slug: "loan",
    name: "Loan Calculator",
    category: "finance",
    description: "Repayments for personal, student or auto loans.",
    implemented: true,
    keywords: ["repayment", "credit"],
  },
  {
    slug: "mortgage",
    name: "Mortgage Calculator",
    category: "finance",
    description: "Monthly mortgage payments with principal & interest.",
    implemented: true,
  },
  {
    slug: "amortization",
    name: "Amortization Calculator",
    category: "finance",
    description: "Full amortization schedule for any loan.",
    implemented: true,
  },
  {
    slug: "apy",
    name: "APY Calculator",
    category: "finance",
    description: "Annual percentage yield from a nominal rate.",
    implemented: true,
  },
  {
    slug: "cagr",
    name: "CAGR Calculator",
    category: "finance",
    description: "Compound annual growth rate.",
    implemented: true,
  },
  {
    slug: "car-loan",
    name: "Car Loan Calculator",
    category: "finance",
    description: "Auto loan repayments and interest.",
    implemented: true,
  },
  {
    slug: "cash-back",
    name: "Cash Back Calculator",
    category: "finance",
    description: "Effective return on cash-back rewards.",
    implemented: true,
  },
  {
    slug: "credit-card-repayment",
    name: "Credit Card Repayment",
    category: "finance",
    description: "Time and interest to pay off a credit card balance.",
    implemented: true,
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    category: "finance",
    description: "Convert between major world currencies.",
    implemented: true,
  },
  {
    slug: "forex-compounding",
    name: "Forex Compounding",
    category: "finance",
    description: "Compound forex returns.",
  },
  {
    slug: "future-value",
    name: "Future Value Calculator",
    category: "finance",
    description: "Future value of present sum at given rate.",
    implemented: true,
  },
  {
    slug: "how-long-to-save",
    name: "How Long to Save",
    category: "finance",
    description: "Time to reach a savings goal.",
  },
  {
    slug: "how-long-money-last",
    name: "How Long Will Money Last",
    category: "finance",
    description: "Time horizon for retirement withdrawals.",
  },
  {
    slug: "interest-rate",
    name: "Interest Rate Calculator",
    category: "finance",
    description: "Implied rate from cashflows.",
    implemented: true,
  },
  {
    slug: "investment",
    name: "Investment Calculator",
    category: "finance",
    description: "Project portfolio growth.",
    implemented: true,
  },
  {
    slug: "irr",
    name: "IRR Calculator",
    category: "finance",
    description: "Internal rate of return on a series of cashflows.",
  },
  {
    slug: "loan-payoff",
    name: "Loan Payoff Calculator",
    category: "finance",
    description: "Pay-off date with extra payments.",
    implemented: true,
  },
  {
    slug: "margin",
    name: "Margin Calculator",
    category: "finance",
    description: "Profit margin and markup.",
    implemented: true,
  },
  {
    slug: "million-to-billion",
    name: "Million to Billion Converter",
    category: "finance",
    description: "Convert between large number names.",
  },
  {
    slug: "mortgage-payoff",
    name: "Mortgage Payoff",
    category: "finance",
    description: "Effect of extra payments on mortgage.",
  },
  {
    slug: "mortgage-refinance",
    name: "Mortgage Refinance",
    category: "finance",
    description: "Should you refinance your mortgage?",
    implemented: true,
  },
  {
    slug: "net-worth",
    name: "Net Worth Calculator",
    category: "finance",
    description: "Assets minus liabilities.",
    implemented: true,
  },
  {
    slug: "pension",
    name: "Pension Calculator",
    category: "finance",
    description: "Project retirement income.",
  },
  {
    slug: "retirement",
    name: "Retirement Calculator",
    category: "finance",
    description: "Plan for retirement savings.",
    implemented: true,
  },
  {
    slug: "roi",
    name: "ROI Calculator",
    category: "finance",
    description: "Return on investment.",
    implemented: true,
  },
  {
    slug: "rule-of-72",
    name: "Rule of 72",
    category: "finance",
    description: "Estimate doubling time at a given rate.",
  },
  {
    slug: "salary",
    name: "Salary Calculator",
    category: "finance",
    description: "Annual / monthly / hourly salary conversions.",
    implemented: true,
  },
  {
    slug: "savings-goal",
    name: "Savings Goal",
    category: "finance",
    description: "Monthly contribution to hit a goal.",
    implemented: true,
  },
  {
    slug: "simple-interest",
    name: "Simple Interest",
    category: "finance",
    description: "Non-compounding interest.",
    implemented: true,
  },
  {
    slug: "stock-profit",
    name: "Stock Profit Calculator",
    category: "finance",
    description: "Profit/loss on a stock trade.",
  },
  {
    slug: "tax",
    name: "Tax Calculator",
    category: "finance",
    description: "Estimate income tax.",
    implemented: true,
  },
  {
    slug: "tip",
    name: "Tip Calculator",
    category: "finance",
    description: "Tip and split a bill.",
    implemented: true,
  },
  {
    slug: "vat",
    name: "VAT Calculator",
    category: "finance",
    description: "Add or remove VAT.",
    implemented: true,
  },

  // ===== HEALTH =====
  {
    slug: "bmi",
    name: "BMI Calculator",
    category: "health",
    description: "Body Mass Index from height and weight.",
    implemented: true,
  },
  {
    slug: "bmr",
    name: "BMR Calculator",
    category: "health",
    description: "Basal metabolic rate.",
    implemented: true,
  },
  {
    slug: "body-fat",
    name: "Body Fat Calculator",
    category: "health",
    description: "Estimate body fat percentage.",
    implemented: true,
  },
  {
    slug: "calories-burned",
    name: "Calories Burned",
    category: "health",
    description: "Calories burned by activity.",
    implemented: true,
  },
  {
    slug: "ideal-weight",
    name: "Ideal Weight Calculator",
    category: "health",
    description: "Healthy weight range.",
    implemented: true,
  },
  {
    slug: "macro",
    name: "Macro Calculator",
    category: "health",
    description: "Daily macronutrient targets.",
  },
  {
    slug: "pace",
    name: "Running Pace Calculator",
    category: "health",
    description: "Pace, time and distance.",
  },
  {
    slug: "pregnancy",
    name: "Pregnancy Calculator",
    category: "health",
    description: "Estimate due date.",
  },
  {
    slug: "tdee",
    name: "TDEE Calculator",
    category: "health",
    description: "Total daily energy expenditure.",
    implemented: true,
  },
  {
    slug: "water-intake",
    name: "Water Intake",
    category: "health",
    description: "Daily water target.",
    implemented: true,
  },
  {
    slug: "weight-loss",
    name: "Weight Loss Calculator",
    category: "health",
    description: "Calorie deficit for goal weight.",
    implemented: true,
  },
  {
    slug: "heart-rate-zones",
    name: "Heart Rate Zones",
    category: "health",
    description: "Training zones from max HR.",
  },
  {
    slug: "waist-to-hip",
    name: "Waist-to-Hip Ratio",
    category: "health",
    description: "Cardio-metabolic risk indicator.",
    implemented: true,
  },

  // ===== CONVERSION =====
  {
    slug: "length",
    name: "Length Converter",
    category: "conversion",
    description: "Meters, feet, inches, miles, km.",
    implemented: true,
  },
  {
    slug: "weight",
    name: "Weight Converter",
    category: "conversion",
    description: "Kg, pounds, ounces, stones.",
    implemented: true,
  },
  {
    slug: "temperature",
    name: "Temperature Converter",
    category: "conversion",
    description: "Celsius, Fahrenheit, Kelvin.",
    implemented: true,
  },
  {
    slug: "volume",
    name: "Volume Converter",
    category: "conversion",
    description: "Liters, gallons, cups, ml.",
    implemented: true,
  },
  {
    slug: "area",
    name: "Area Converter",
    category: "conversion",
    description: "Sq meters, sq feet, acres, hectares.",
    implemented: true,
  },
  {
    slug: "speed",
    name: "Speed Converter",
    category: "conversion",
    description: "mph, kph, m/s, knots.",
    implemented: true,
  },
  {
    slug: "energy",
    name: "Energy Converter",
    category: "conversion",
    description: "Joules, calories, kWh, BTU.",
    implemented: true,
  },
  {
    slug: "power",
    name: "Power Converter",
    category: "conversion",
    description: "Watts, horsepower, kW.",
    implemented: true,
  },
  {
    slug: "pressure",
    name: "Pressure Converter",
    category: "conversion",
    description: "Pa, bar, psi, atm.",
    implemented: true,
  },
  {
    slug: "data-storage",
    name: "Data Storage",
    category: "conversion",
    description: "Bytes, KB, MB, GB, TB.",
    implemented: true,
  },
  {
    slug: "fuel-economy",
    name: "Fuel Economy",
    category: "conversion",
    description: "MPG, L/100km, km/L.",
    implemented: true,
  },
  {
    slug: "force",
    name: "Force Converter",
    category: "conversion",
    description: "Newtons, pound-force.",
  },
  {
    slug: "angle",
    name: "Angle Converter",
    category: "conversion",
    description: "Degrees, radians, gradians.",
  },
  {
    slug: "frequency",
    name: "Frequency Converter",
    category: "conversion",
    description: "Hz, kHz, MHz, GHz.",
  },
  {
    slug: "shoe-size",
    name: "Shoe Size Converter",
    category: "conversion",
    description: "US, UK, EU shoe sizes.",
  },
  {
    slug: "clothing-size",
    name: "Clothing Size Converter",
    category: "conversion",
    description: "Convert international clothing sizes.",
  },
  {
    slug: "ring-size",
    name: "Ring Size Converter",
    category: "conversion",
    description: "Convert between ring sizing systems.",
  },

  // ===== MATH =====
  {
    slug: "percentage",
    name: "Percentage Calculator",
    category: "math",
    description: "Percent of, % change, % increase/decrease.",
    implemented: true,
  },
  {
    slug: "discount",
    name: "Discount Calculator",
    category: "math",
    description: "Sale price after a percentage off.",
    implemented: true,
  },
  {
    slug: "fraction",
    name: "Fraction Calculator",
    category: "math",
    description: "Add, subtract, multiply, divide fractions.",
  },
  {
    slug: "ratio",
    name: "Ratio Calculator",
    category: "math",
    description: "Solve and simplify ratios.",
  },
  {
    slug: "average",
    name: "Average (Mean) Calculator",
    category: "math",
    description: "Arithmetic mean of a list.",
  },
  {
    slug: "standard-deviation",
    name: "Standard Deviation",
    category: "math",
    description: "Population and sample SD.",
  },
  {
    slug: "scientific",
    name: "Scientific Calculator",
    category: "math",
    description: "Trig, log, exp, parens.",
  },
  {
    slug: "square-root",
    name: "Square Root",
    category: "math",
    description: "Square roots and nth roots.",
  },
  {
    slug: "exponent",
    name: "Exponent Calculator",
    category: "math",
    description: "Powers and exponentiation.",
  },
  {
    slug: "circle",
    name: "Circle Calculator",
    category: "math",
    description: "Area, circumference, diameter.",
  },
  {
    slug: "triangle",
    name: "Triangle Calculator",
    category: "math",
    description: "Area and side lengths.",
  },
  {
    slug: "rectangle",
    name: "Rectangle Calculator",
    category: "math",
    description: "Area and perimeter.",
  },
  {
    slug: "cylinder",
    name: "Cylinder Volume",
    category: "math",
    description: "Volume and surface area.",
  },
  {
    slug: "sphere",
    name: "Sphere Volume",
    category: "math",
    description: "Volume and surface area.",
  },
  { slug: "cube-root", name: "Cube Root", category: "math", description: "Cube roots." },
  { slug: "prime", name: "Prime Number Checker", category: "math", description: "Test primality." },
  {
    slug: "lcm-gcf",
    name: "LCM and GCF",
    category: "math",
    description: "Least common multiple, greatest common factor.",
  },
  {
    slug: "quadratic",
    name: "Quadratic Equation",
    category: "math",
    description: "Solve ax² + bx + c = 0.",
  },

  // ===== HOME & GARDEN =====
  {
    slug: "concrete",
    name: "Concrete Calculator",
    category: "home-garden",
    description: "Cubic yards/meters of concrete needed.",
    implemented: true,
  },
  {
    slug: "gravel",
    name: "Gravel Calculator",
    category: "home-garden",
    description: "Tons or yards of gravel.",
    implemented: true,
  },
  {
    slug: "mulch",
    name: "Mulch Calculator",
    category: "home-garden",
    description: "Mulch needed for a bed.",
    implemented: true,
  },
  {
    slug: "soil",
    name: "Soil Calculator",
    category: "home-garden",
    description: "Topsoil volume needed.",
  },
  {
    slug: "paint",
    name: "Paint Calculator",
    category: "home-garden",
    description: "Liters or gallons of paint.",
  },
  {
    slug: "wallpaper",
    name: "Wallpaper Calculator",
    category: "home-garden",
    description: "Wallpaper rolls needed.",
  },
  {
    slug: "flooring",
    name: "Flooring Calculator",
    category: "home-garden",
    description: "Square footage of flooring.",
  },
  {
    slug: "tile",
    name: "Tile Calculator",
    category: "home-garden",
    description: "Tiles needed for an area.",
  },
  {
    slug: "carpet",
    name: "Carpet Calculator",
    category: "home-garden",
    description: "Carpet area and cost.",
  },
  {
    slug: "roofing",
    name: "Roofing Calculator",
    category: "home-garden",
    description: "Roof shingles needed.",
  },
  {
    slug: "fence",
    name: "Fence Calculator",
    category: "home-garden",
    description: "Fence posts and panels.",
  },
  {
    slug: "deck",
    name: "Deck Calculator",
    category: "home-garden",
    description: "Decking boards needed.",
  },
  {
    slug: "asphalt",
    name: "Asphalt Calculator",
    category: "home-garden",
    description: "Asphalt tonnage.",
  },
  {
    slug: "insulation",
    name: "Insulation Calculator",
    category: "home-garden",
    description: "R-value coverage.",
  },
  {
    slug: "lawn-seed",
    name: "Lawn Seed Calculator",
    category: "home-garden",
    description: "Grass seed for an area.",
  },
  {
    slug: "stair",
    name: "Stair Calculator",
    category: "home-garden",
    description: "Stair rise and run.",
  },
  {
    slug: "btu",
    name: "BTU Calculator",
    category: "home-garden",
    description: "AC BTU sizing for a room.",
  },

  // ===== COOKING =====
  {
    slug: "recipe-scaler",
    name: "Recipe Scaler",
    category: "cooking",
    description: "Scale ingredient quantities up or down.",
    implemented: true,
  },
  {
    slug: "cooking-converter",
    name: "Cooking Conversions",
    category: "cooking",
    description: "Cups, tbsp, ml, grams.",
    implemented: true,
  },
  {
    slug: "oven-temperature",
    name: "Oven Temperature",
    category: "cooking",
    description: "Convert oven temps and gas marks.",
    implemented: true,
  },
  {
    slug: "baking-pan",
    name: "Baking Pan Converter",
    category: "cooking",
    description: "Convert pan sizes.",
    implemented: true,
  },
  {
    slug: "yeast",
    name: "Yeast Converter",
    category: "cooking",
    description: "Active dry, instant, fresh yeast.",
    implemented: true,
  },
  {
    slug: "butter",
    name: "Butter Converter",
    category: "cooking",
    description: "Sticks, cups, grams of butter.",
    implemented: true,
  },
  {
    slug: "flour",
    name: "Flour Converter",
    category: "cooking",
    description: "Cups to grams of flour.",
    implemented: true,
  },
  {
    slug: "sugar",
    name: "Sugar Converter",
    category: "cooking",
    description: "Granulated, brown, powdered sugar.",
    implemented: true,
  },
  {
    slug: "rice",
    name: "Rice to Water Ratio",
    category: "cooking",
    description: "Water needed for cooking rice.",
  },
  {
    slug: "turkey",
    name: "Turkey Cooking Time",
    category: "cooking",
    description: "Cook time by weight.",
  },
  {
    slug: "ham",
    name: "Ham Cooking Time",
    category: "cooking",
    description: "Cook time by weight.",
  },
  {
    slug: "egg-timer",
    name: "Egg Timer",
    category: "cooking",
    description: "Boil times for soft, medium, hard eggs.",
  },

  // ===== TIME & DATE =====
  {
    slug: "age",
    name: "Age Calculator",
    category: "time",
    description: "Exact age in years, months, days.",
    implemented: true,
  },
  {
    slug: "date-difference",
    name: "Date Difference",
    category: "time",
    description: "Days between two dates.",
    implemented: true,
  },
  {
    slug: "date-add",
    name: "Date Add/Subtract",
    category: "time",
    description: "Add or subtract days from a date.",
    implemented: true,
  },
  {
    slug: "business-days",
    name: "Business Days",
    category: "time",
    description: "Working days between dates.",
    implemented: true,
  },
  {
    slug: "countdown",
    name: "Countdown Timer",
    category: "time",
    description: "Time remaining to a date.",
    implemented: true,
  },
  {
    slug: "hours",
    name: "Hours Calculator",
    category: "time",
    description: "Hours between two times.",
    implemented: true,
  },
  {
    slug: "time-card",
    name: "Time Card Calculator",
    category: "time",
    description: "Calculate worked hours.",
    implemented: true,
  },
  {
    slug: "timezone",
    name: "Time Zone Converter",
    category: "time",
    description: "Convert times across zones.",
  },
  { slug: "stopwatch", name: "Stopwatch", category: "time", description: "Track elapsed time." },
  {
    slug: "week-number",
    name: "Week Number",
    category: "time",
    description: "ISO week of a date.",
  },

  // ===== MISC =====
  {
    slug: "random-number",
    name: "Random Number",
    category: "misc",
    description: "Generate random integers.",
    implemented: true,
  },
  {
    slug: "password",
    name: "Password Generator",
    category: "misc",
    description: "Strong random passwords.",
  },
  {
    slug: "gpa",
    name: "GPA Calculator",
    category: "misc",
    description: "Grade point average.",
    implemented: true,
  },
  {
    slug: "grade",
    name: "Grade Calculator",
    category: "misc",
    description: "Required score on final.",
    implemented: true,
  },
  {
    slug: "test-grade",
    name: "Test Grade Calculator",
    category: "misc",
    description: "Score from correct/incorrect.",
    implemented: true,
  },
  {
    slug: "fuel-cost",
    name: "Fuel Cost Calculator",
    category: "misc",
    description: "Fuel cost for a trip.",
    implemented: true,
  },
  { slug: "love", name: "Love Calculator", category: "misc", description: "Just for fun." },
  {
    slug: "name-numerology",
    name: "Name Numerology",
    category: "misc",
    description: "Numerology from your name.",
  },
  { slug: "dice-roller", name: "Dice Roller", category: "misc", description: "Roll any dice." },
  { slug: "coin-flip", name: "Coin Flip", category: "misc", description: "Flip a virtual coin." },
];

export const CALCULATORS_BY_SLUG = Object.fromEntries(
  CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, Calculator>;

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<
  CategoryId,
  Category
>;

export function calculatorsByCategory(id: CategoryId) {
  return CALCULATORS.filter((c) => c.category === id);
}

export function searchCalculators(query: string, limit = 20) {
  const q = query.trim().toLowerCase();
  if (!q) return [] as Calculator[];
  return CALCULATORS.filter((c) => {
    const hay = `${c.name} ${c.description} ${(c.keywords || []).join(" ")}`.toLowerCase();
    return hay.includes(q);
  }).slice(0, limit);
}
