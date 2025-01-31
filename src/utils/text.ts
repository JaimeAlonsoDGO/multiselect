export const normalizeText = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export const underlineMatch = (text: string, searchTerm: string, avoidRegex: boolean) => {
  if (!searchTerm || avoidRegex) return text
  const regex = new RegExp(`(${searchTerm})`, 'gi')
  return text.replace(regex, '<span class="underline font-bold">$1</span>')
}
