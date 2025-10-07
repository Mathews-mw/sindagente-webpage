/**
 * Remove acentuação e substitui espaços por hífens.
 * Converte tudo para minúsculas.
 * Exemplo: "Está publicação possui acentuação" → "esta-publicacao-possui-acentuacao"
 */
export function removeAccentsAndNormalize(input: string): string {
  return input
    .normalize("NFD") // Decompõe caracteres acentuados em base + acento
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos (caracteres diacríticos)
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove caracteres especiais (exceto espaços e hífens)
    .trim() // Remove espaços extras no início/fim
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .toLowerCase(); // Converte tudo para minúsculas
}

