import { BOUQUETS, type Bouquet } from "@/shared/lib/mock-data";
import { QUIZ_STEPS } from "@/features/quiz/quiz-steps";
import { BOUQUET_COLOR_TAGS } from "@/features/quiz/bouquet-tags";

export type QuizAnswersPayload = {
  occasion: string;
  budget: string;
  color: string[];
  size: string;
};

function getBudgetRange(budgetId: string): [number, number] {
  const step = QUIZ_STEPS.find((s) => s.id === "budget");
  const opt = step?.options.find((o) => o.id === budgetId) as
    | { value: [number, number] }
    | undefined;
  return opt?.value ?? [0, 50000];
}

function scoreBouquet(b: Bouquet, a: QuizAnswersPayload): number {
  let s = 0;
  const [min, max] = getBudgetRange(a.budget);
  const price = b.price;

  if (b.occasion.includes(a.occasion)) s += 40;

  if (price >= min && price <= max) s += 35;
  else if (price >= min * 0.8 && price <= max * 1.2) s += 18;
  else s += 5;

  const tags = BOUQUET_COLOR_TAGS[b.id] ?? ["mixed"];
  const colors = a.color.length > 0 ? a.color : ["mixed"];
  for (const c of colors) {
    if (tags.includes(c)) s += 14;
  }

  switch (a.size) {
    case "compact":
      if (price <= 3400) s += 22;
      else if (price <= 4200) s += 10;
      break;
    case "medium":
      if (price >= 2800 && price <= 5200) s += 22;
      else if (price >= 2400 && price <= 5800) s += 12;
      break;
    case "luxury":
      if (price >= 5000) s += 22;
      else if (price >= 4200) s += 12;
      break;
    case "surprise":
      s += 18;
      break;
    default:
      s += 8;
  }

  if (b.isHit) s += 3;
  s += b.rating * 0.4;

  return s;
}

/** 3–5 лучших совпадений по ответам квиза */
export function matchBouquets(answers: QuizAnswersPayload): Bouquet[] {
  const scored = BOUQUETS.map((b) => ({ b, score: scoreBouquet(b, answers) })).sort(
    (x, y) => y.score - x.score
  );
  /** до 5 позиций, не больше чем есть в каталоге */
  return scored.slice(0, Math.min(5, scored.length)).map((x) => x.b);
}

export function parseQuizSearchParams(
  sp: URLSearchParams
): QuizAnswersPayload | null {
  const occasion = sp.get("occasion");
  const budget = sp.get("budget");
  const size = sp.get("size");
  if (!occasion || !budget || !size) return null;
  const colorRaw = sp.get("color")?.trim() ?? "";
  const color = colorRaw
    ? colorRaw.split(",").map((c) => c.trim()).filter(Boolean)
    : ["mixed"];
  return { occasion, budget, color, size };
}
