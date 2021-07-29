import { pickBy } from 'lodash';
import { CheckboxCollection, CheckboxIdMap } from './types';

export function buildCheckboxOptions(collection: Record<string, string[]>): CheckboxCollection {
  const buildOption = (s: string) => ({ id: s, label: s });

  return Object.keys(collection).reduce((acc, s) => {
    if (collection.hasOwnProperty(s)) acc[s] = collection[s].map(buildOption);
    return acc;
  }, {} as CheckboxCollection);
}

export function transformToCheckboxCollection(
  collection: Record<string, CheckboxIdMap>
): CheckboxCollection {
  return Object.keys(collection).reduce((acc, s) => {
    const map = buildCheckboxOptions({ [s]: Object.keys(collection[s]) });
    Object.assign(acc, map);
    return acc;
  }, {} as CheckboxCollection);
}

export function reduceToSelectedCheckboxOptions(map: CheckboxIdMap): CheckboxIdMap {
  return pickBy(map, (v, k) => v === true);
}
