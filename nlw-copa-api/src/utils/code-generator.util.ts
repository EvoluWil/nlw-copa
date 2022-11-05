import ShortUniqueId from 'short-unique-id';

export const codeGenerator = (text: string): string => {
  if (!text) {
    return '';
  }

  const generate = new ShortUniqueId({ length: 5 });

  return `${text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/gi, '')
    .toLocaleLowerCase()}-${String(generate()).toLowerCase()}`;
};
