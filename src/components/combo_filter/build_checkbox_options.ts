import { CheckboxCollection } from './types';

export function buildCheckboxOptions(collection: Record<string, string[]>): CheckboxCollection {
  const buildOption = (s: string) => ({ id: s, label: s });

  return Object.keys(collection).reduce((acc, s) => {
    if (collection.hasOwnProperty(s)) acc[s] = collection[s].map(buildOption);
    return acc;
  }, {} as CheckboxCollection);
}
