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

export function flattenChildren(
  children: JSX.Element[]
): {
  type: string;
  [key: string]: any;
}[] {
  const flattened = children.flat(Infinity);

  const filtered = flattened.filter((child) => !isNullish(child));

  for (let i = 0; i < filtered.length; i += 1) {
    if (typeof filtered[i] !== 'object' || filtered[i].type === 'plain_text') {
      let joinArr = [
        typeof filtered[i].text === 'string' ? filtered[i].text : filtered[i],
      ];

      for (
        let joinEnd = i + 1;
        joinEnd < filtered.length &&
        (typeof filtered[joinEnd] !== 'object' ||
          filtered[joinEnd].type === 'plain_text');
        joinEnd += 1
      ) {
        joinArr.push(
          typeof filtered[joinEnd].text === 'string'
            ? filtered[joinEnd].text
            : filtered[joinEnd]
        );
      }

      const text = joinArr.join('');
      filtered.splice(i, joinArr.length, stringToPlainText(text));
    }
  }

  return filtered;
}

export function createCleanError(errorMessage?: string) {
  const error = new Error(errorMessage);

  error.stack = error
    .stack!.split('\n')
    .filter((stack) => !/\/slack-blockx\/(src|dist)\//.test(stack))
    .join('\n');

  return error;
}
