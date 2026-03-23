export interface Bouquet {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  composition: { name: string; count: string }[];
  image: string;
  images?: string[];
  occasion: string[];
  rating: number;
  reviewsCount: number;
  isHit?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const OCCASIONS = [
  { id: "birthday", label: "День рождения", icon: "solar:gift-linear" },
  { id: "date", label: "Свидание", icon: "solar:hearts-linear" },
  { id: "wedding", label: "Свадьба", icon: "solar:users-group-two-rounded-linear" },
  { id: "no-reason", label: "Без повода", icon: "solar:cup-star-linear" },
] as const;

/** Локальные изображения из /public/bouquets — работают без внешних CDN */
const img = (id: string) => `/bouquets/${id}.svg`;

export const BOUQUETS: Bouquet[] = [
  {
    id: "1",
    slug: "utrennij-tuman",
    name: "Утренний туман",
    price: 4500,
    description:
      "Воздушный букет в пастельных тонах. Идеальное сочетание пионовидных роз и ароматного эвкалипта. Создает легкое, романтичное настроение.",
    composition: [
      { name: "Роза пионовидная", count: "5 шт" },
      { name: "Эвкалипт", count: "3 шт" },
      { name: "Упаковка крафт", count: "1 шт" },
    ],
    image: "/bouquets/utrennij-tuman.png",
    images: [
      "/bouquets/utrennij-tuman.png",
      "/bouquets/utrennij-tuman.png",
      "/bouquets/utrennij-tuman.png",
    ],
    occasion: ["birthday", "date"],
    rating: 4.9,
    reviewsCount: 12,
    isHit: true,
  },
  {
    id: "2",
    slug: "nezhnost",
    name: "Нежность",
    price: 3200,
    description:
      "Гортензия и диантусы в нежных пастельных тонах. Идеально для романтического жеста.",
    composition: [
      { name: "Гортензия", count: "3 шт" },
      { name: "Диантус", count: "5 шт" },
      { name: "Упаковка крафт", count: "1 шт" },
    ],
    image: "/bouquets/nezhnost.png",
    images: [
      "/bouquets/nezhnost.png",
      "/bouquets/nezhnost.png",
      "/bouquets/nezhnost.png",
    ],
    occasion: ["date", "wedding"],
    rating: 4.8,
    reviewsCount: 8,
  },
  {
    id: "3",
    slug: "rozovyj-svet",
    name: "Розовый свет",
    price: 5500,
    description:
      "Роскошный букет из роз и пионов. Яркий акцент для особых праздников.",
    composition: [
      { name: "Роза", count: "7 шт" },
      { name: "Пион", count: "3 шт" },
      { name: "Эвкалипт", count: "2 шт" },
    ],
    image: "/bouquets/rozovyj-svet.png",
    images: [
      "/bouquets/rozovyj-svet.png",
      "/bouquets/rozovyj-svet.png",
      "/bouquets/rozovyj-svet.png",
    ],
    occasion: ["birthday", "wedding"],
    rating: 5,
    reviewsCount: 24,
  },
  {
    id: "4",
    slug: "vesennij-ritm",
    name: "Весенний ритм",
    price: 2800,
    description:
      "Тюльпаны и ветки брунии — свежий, лаконичный букет без лишнего. Хорош для «просто так» и небольшого подарка.",
    composition: [
      { name: "Тюльпан", count: "15 шт" },
      { name: "Бруния", count: "2 ветки" },
      { name: "Лента", count: "1 шт" },
    ],
    image: "/bouquets/vesennij-ritm.png",
    images: [
      "/bouquets/vesennij-ritm.png",
      "/bouquets/vesennij-ritm.png",
      "/bouquets/vesennij-ritm.png",
    ],
    occasion: ["no-reason", "birthday"],
    rating: 4.7,
    reviewsCount: 31,
  },
  {
    id: "5",
    slug: "belaja-sonata",
    name: "Белая соната",
    price: 6200,
    description:
      "Монобукет из белых роз и лизиантуса — спокойная роскошь для свадьбы или важного признания.",
    composition: [
      { name: "Роза белая", count: "11 шт" },
      { name: "Лизиантус", count: "5 шт" },
      { name: "Рускус", count: "3 ветки" },
    ],
    image: "/bouquets/belaja-sonata.png",
    images: [
      "/bouquets/belaja-sonata.png",
      "/bouquets/belaja-sonata.png",
      "/bouquets/belaja-sonata.png",
    ],
    occasion: ["wedding", "date"],
    rating: 4.95,
    reviewsCount: 18,
    isHit: true,
  },
  {
    id: "6",
    slug: "solnechnaja-poljana",
    name: "Солнечная поляна",
    price: 3900,
    description:
      "Жёлтые хризантемы и ромашковый акцент — тёплое настроение и улыбка с первого взгляда.",
    composition: [
      { name: "Хризантема", count: "7 шт" },
      { name: "Ромашка", count: "5 шт" },
      { name: "Упаковка", count: "1 шт" },
    ],
    image: img("6"),
    images: [img("6"), img("6"), img("6")],
    occasion: ["birthday", "no-reason"],
    rating: 4.85,
    reviewsCount: 9,
  },
  {
    id: "7",
    slug: "rubinovyj-vecher",
    name: "Рубиновый вечер",
    price: 4800,
    description:
      "Глубокие красные розы и зелень — классика для свиданий и извинений, когда слова лишние.",
    composition: [
      { name: "Роза красная", count: "9 шт" },
      { name: "Эвкалипт", count: "4 ветки" },
    ],
    image: img("7"),
    images: [img("7"), img("7"), img("7")],
    occasion: ["date", "wedding"],
    rating: 4.9,
    reviewsCount: 41,
  },
  {
    id: "8",
    slug: "lavandovoe-nastroenie",
    name: "Лавандовое настроение",
    price: 3600,
    description:
      "Сухоцветы и лаванда в спокойной палитре — долго стоит и напоминает о лете.",
    composition: [
      { name: "Лаванда", count: "пучок" },
      { name: "Сухоцветы", count: "микс" },
      { name: "Крафт", count: "1 шт" },
    ],
    image: img("8"),
    images: [img("8"), img("8"), img("8")],
    occasion: ["no-reason", "birthday"],
    rating: 4.75,
    reviewsCount: 6,
  },
  {
    id: "9",
    slug: "moroznaja-jagoda",
    name: "Морозная ягода",
    price: 4100,
    description:
      "Бордовые розы, ягоды и хвоя — сочный контраст и зимнее настроение без холода.",
    composition: [
      { name: "Роза", count: "7 шт" },
      { name: "Ягоды декоративные", count: "ветка" },
      { name: "Хвоя", count: "2 ветки" },
    ],
    image: img("9"),
    images: [img("9"), img("9"), img("9")],
    occasion: ["birthday", "date"],
    rating: 4.82,
    reviewsCount: 15,
    isHit: true,
  },
  {
    id: "10",
    slug: "persikovyj-zakat",
    name: "Персиковый закат",
    price: 4400,
    description:
      "Персиковые розы и кремовая гортензия — тёплый, уютный букет как мягкий вечерний свет.",
    composition: [
      { name: "Роза персиковая", count: "9 шт" },
      { name: "Гортензия", count: "2 шт" },
      { name: "Эвкалипт", count: "3 ветки" },
    ],
    image: img("10"),
    images: [img("10"), img("10"), img("10")],
    occasion: ["date", "wedding"],
    rating: 4.88,
    reviewsCount: 22,
  },
  {
    id: "11",
    slug: "polevoj-veter",
    name: "Полевой ветер",
    price: 2600,
    description:
      "Ромашки, васильки и злаки — лёгкий букет в стиле прованс, будто с поля.",
    composition: [
      { name: "Ромашка", count: "микс" },
      { name: "Василёк", count: "5 шт" },
      { name: "Крафт", count: "1 шт" },
    ],
    image: img("11"),
    images: [img("11"), img("11"), img("11")],
    occasion: ["no-reason", "birthday"],
    rating: 4.65,
    reviewsCount: 28,
  },
  {
    id: "12",
    slug: "zolotaja-osen",
    name: "Золотая осень",
    price: 3800,
    description:
      "Оранжевые розы и хризантемы с сухоцветами — богатые оттенки осени в одном букете.",
    composition: [
      { name: "Роза", count: "5 шт" },
      { name: "Хризантема", count: "5 шт" },
      { name: "Сухоцветы", count: "микс" },
    ],
    image: img("12"),
    images: [img("12"), img("12"), img("12")],
    occasion: ["birthday", "no-reason"],
    rating: 4.78,
    reviewsCount: 11,
  },
  {
    id: "13",
    slug: "mjatnaja-svezhest",
    name: "Мятная свежесть",
    price: 3400,
    description:
      "Белые розы, зелень и мятный акцент в упаковке — чистый, «воздушный» подарок.",
    composition: [
      { name: "Роза белая", count: "5 шт" },
      { name: "Зелень", count: "микс" },
      { name: "Упаковка", count: "1 шт" },
    ],
    image: img("13"),
    images: [img("13"), img("13"), img("13")],
    occasion: ["wedding", "date"],
    rating: 4.72,
    reviewsCount: 7,
  },
  {
    id: "14",
    slug: "vanilnyj-krem",
    name: "Ванильный крем",
    price: 5200,
    description:
      "Кремовые пионы и розы — нежная палитра для торжества и фотогеничных моментов.",
    composition: [
      { name: "Пион", count: "4 шт" },
      { name: "Роза кустовая", count: "6 шт" },
      { name: "Рускус", count: "4 ветки" },
    ],
    image: img("14"),
    images: [img("14"), img("14"), img("14")],
    occasion: ["wedding", "birthday"],
    rating: 4.92,
    reviewsCount: 19,
  },
  {
    id: "15",
    slug: "nochnoj-sad",
    name: "Ночной сад",
    price: 5800,
    description:
      "Тёмно-пурпурные тона, орхидеи и зелень — драматичный букет для особого вечера.",
    composition: [
      { name: "Орхидея", count: "3 ветки" },
      { name: "Роза", count: "5 шт" },
      { name: "Амарант", count: "2 ветки" },
    ],
    image: img("15"),
    images: [img("15"), img("15"), img("15")],
    occasion: ["date", "wedding"],
    rating: 4.96,
    reviewsCount: 13,
  },
  {
    id: "16",
    slug: "korallovyj-rif",
    name: "Коралловый риф",
    price: 4200,
    description:
      "Коралловые и лососевые оттенки, пионовидные розы — ярко и по-летнему свежо.",
    composition: [
      { name: "Роза пионовидная", count: "6 шт" },
      { name: "Эустома", count: "4 шт" },
      { name: "Эвкалипт", count: "3 ветки" },
    ],
    image: img("16"),
    images: [img("16"), img("16"), img("16")],
    occasion: ["birthday", "date"],
    rating: 4.86,
    reviewsCount: 26,
    isHit: true,
  },
  {
    id: "17",
    slug: "slivochnyj-kapuchino",
    name: "Сливочный капучино",
    price: 4900,
    description:
      "Капучино-розы и кофейная гамма упаковки — уютный, «вкусный» букет без кофеина.",
    composition: [
      { name: "Роза", count: "11 шт" },
      { name: "Диантус", count: "4 шт" },
      { name: "Лента", count: "1 шт" },
    ],
    image: img("17"),
    images: [img("17"), img("17"), img("17")],
    occasion: ["date", "no-reason"],
    rating: 4.8,
    reviewsCount: 17,
  },
  {
    id: "18",
    slug: "alijskij-lug",
    name: "Альпийский луг",
    price: 3100,
    description:
      "Колокольчики, гипсофила и лиловые акценты — лёгкий букет, как дуновение ветра в горах.",
    composition: [
      { name: "Колокольчик", count: "7 шт" },
      { name: "Гипсофила", count: "пучок" },
      { name: "Статица", count: "2 ветки" },
    ],
    image: img("18"),
    images: [img("18"), img("18"), img("18")],
    occasion: ["no-reason", "birthday"],
    rating: 4.68,
    reviewsCount: 10,
  },
];

export const ADDONS = [
  {
    id: "card",
    name: "Открытка",
    price: 0,
    icon: "solar:letter-linear",
  },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: "classic",
    name: "Классик",
    description: "Средние букеты для украшения дома или рабочего стола.",
    price: 3500,
    popular: true,
    features: ["Сезонные цветы", "Бесплатная ваза (в 1 раз)"],
  },
  {
    id: "premium",
    name: "Премиум",
    description: "Роскошные объемные композиции и экзотические цветы.",
    price: 7000,
    popular: false,
    features: ["Редкие сорта", "Премиум упаковка"],
  },
];
