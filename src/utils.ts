import { PlainTextElement } from '@slack/types';

export function stringToPlainText(
  text: PlainTextElement | string | number
): PlainTextElement {
  return typeof text === 'string' || typeof text === 'number'
    ? {
        type: 'plain_text',
        emoji: true,
        text: String(text),
      }
    : text;
}

export function isNullish(value: unknown): boolean {
  return value == null || value === false;
}

export function flattenChildren(children: JSX.Element[]): JSX.Element[] {
  const flattened = children.flat(Infinity);

  const filtered = flattened.filter((child) => !isNullish(child));

  for (let i = 0; i < filtered.length; i += 1) {
    if (typeof filtered[i] !== 'object') {
      let joinArr = [filtered[i]];

      for (
        let joinEnd = i + 1;
        joinEnd < filtered.length && typeof filtered[joinEnd] !== 'object';
        joinEnd += 1
      ) {
        joinArr.push(filtered[joinEnd]);
      }

      const text = joinArr.join('');
      filtered.splice(i, joinArr.length, stringToPlainText(text));
    }
  }

  return filtered;
}
