import { PlainTextElement, MrkdwnElement } from '@slack/types';

export function stringToTextBlock(
  text: PlainTextElement | MrkdwnElement | string | number | undefined,
  forceType: string = 'plain_text'
): PlainTextElement | MrkdwnElement | undefined {
  return typeof text === 'string' || typeof text === 'number'
    ? forceType === 'plain_text'
      ? {
          type: 'plain_text',
          emoji: true,
          text: String(text),
        }
      : {
          type: 'mrkdwn',
          text: String(text),
        }
    : text;
}

export function isNullish(value: unknown): boolean {
  return value == null || value === false;
}

export function isTextBlock(block: { type?: string }): boolean {
  return (
    block.type === 'plain_text' ||
    block.type === 'mrkdwn' ||
    block.type === 'markdown'
  );
}

export function isText(element: unknown): boolean {
  if (typeof element === 'string' || typeof element === 'number') {
    return true;
  }

  if (typeof element === 'object' && element != null) {
    return isTextBlock(element);
  }

  return false;
}

export function getTextElementType(
  element: string | number | PlainTextElement | MrkdwnElement
): 'plain_text' | 'mrkdwn' {
  if (
    typeof element === 'string' ||
    typeof element === 'number' ||
    element.type === 'plain_text'
  ) {
    return 'plain_text';
  }

  return 'mrkdwn';
}

export function flattenChildren(
  children: JSX.Element[]
): (
  | {
      type: string;
      [key: string]: unknown;
    }
  | string
)[] {
  const flattened = children.flat(Infinity);

  const filtered = flattened.filter((child) => !isNullish(child));

  for (let i = 0; i < filtered.length; i += 1) {
    const element = filtered[i];

    if (isText(element)) {
      let text = isTextBlock(element) ? element.text : String(element);
      const elementType = getTextElementType(element);

      let joinEnd = i + 1;
      let nextElement = filtered[joinEnd];
      while (
        joinEnd < filtered.length &&
        isText(nextElement) &&
        getTextElementType(nextElement) === elementType &&
        elementType !== 'mrkdwn'
      ) {
        text += isTextBlock(nextElement)
          ? nextElement.text
          : String(nextElement);

        joinEnd += 1;
        nextElement = filtered[joinEnd];
      }

      filtered.splice(i, joinEnd - i, stringToTextBlock(text, elementType));
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
