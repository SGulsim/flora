export const QUIZ_STEPS = [
  {
    id: "occasion",
    title: "Какой повод?",
    subtitle: "Поможем подобрать идеальный букет для вашего события",
    options: [
      { id: "birthday", label: "День рождения", icon: "solar:gift-linear" },
      { id: "date", label: "Свидание", icon: "solar:hearts-linear" },
      { id: "wedding", label: "Свадьба", icon: "solar:users-group-two-rounded-linear" },
      { id: "no-reason", label: "Без повода", icon: "solar:cup-star-linear" },
    ],
  },
  {
    id: "budget",
    title: "Бюджет на букет",
    subtitle: "Выберите подходящий диапазон",
    options: [
      { id: "low", label: "до 3 000 ₽", value: [0, 3000] },
      { id: "mid", label: "3 000 – 5 000 ₽", value: [3000, 5000] },
      { id: "high", label: "5 000 – 10 000 ₽", value: [5000, 10000] },
      { id: "premium", label: "от 10 000 ₽", value: [10000, 50000] },
    ],
  },
  {
    id: "color",
    title: "Предпочтения по цвету",
    subtitle: "Можно выбрать несколько",
    options: [
      { id: "pastel", label: "Пастельные тона" },
      { id: "white", label: "Белый" },
      { id: "pink", label: "Розовый" },
      { id: "red", label: "Красный" },
      { id: "mixed", label: "Разноцветный" },
    ],
    multi: true,
  },
  {
    id: "size",
    title: "Размер и формат",
    subtitle: "Какой букет вам подходит?",
    options: [
      { id: "compact", label: "Компактный", desc: "Для стола или рабочего места" },
      { id: "medium", label: "Средний", desc: "Классический букет" },
      { id: "luxury", label: "Роскошный", desc: "Впечатляющая композиция" },
      { id: "surprise", label: "Сюрприз", desc: "На ваше усмотрение" },
    ],
  },
];
