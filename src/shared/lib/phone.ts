export function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (digits.startsWith("9") && digits.length >= 10) digits = "7" + digits;
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);
  if (digits.length <= 1) return digits ? `+7` : "";
  if (digits.length <= 4) return `+7 (${digits.slice(1, 4)}`;
  if (digits.length <= 7)
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}`;
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
}

export function parsePhone(formatted: string): string {
  const digits = formatted.replace(/\D/g, "");
  return digits.startsWith("7") || digits.startsWith("8")
    ? digits
    : "7" + digits;
}

export function isValidPhone(phone: string): boolean {
  const digits = parsePhone(phone);
  return digits.length === 11 && digits.startsWith("7");
}
