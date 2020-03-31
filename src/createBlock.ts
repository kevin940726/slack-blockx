import { PlainTextElement, MrkdwnElement } from '@slack/types';
import * as predefinedComponents from './components';
import {
  stringToTextBlock,
  flattenChildren,
  createCleanError,
  isTextBlock,
} from './utils';
import { validateParent } from './validators';
import { Component } from './types';

function createBlock<P extends { [key: string]: unknown }>(
  type:
    | string
    | Component<P>
    | typeof predefinedComponents[keyof typeof predefinedComponents],
  inputProps: P,
  ...children: JSX.Element[]
): JSX.Element | JSX.Element[] {
  const flattenedChildren = flattenChildren(children);

  if (type in predefinedComponents) {
    const PredefinedComponent =
      predefinedComponents[type as keyof typeof predefinedComponents];
    return createBlock(PredefinedComponent, inputProps, ...flattenedChildren);
  } else if (type === '' || type === 'fragment') {
    return flattenedChildren;
  }

  const props: P & {
    text?: string | PlainTextElement | MrkdwnElement;
    placeholder?: string | number | PlainTextElement;
    label?: string | number | PlainTextElement;
  } = inputProps || {};

  if (typeof type === 'string') {
    if (flattenedChildren.length === 1 && isTextBlock(flattenedChildren[0])) {
      let text = flattenedChildren[0].text as
        | string
        | PlainTextElement
        | MrkdwnElement;

      if (typeof text === 'string') {
        text = stringToTextBlock(text) as PlainTextElement;
      }

      const textBlock: PlainTextElement | MrkdwnElement = text;

      if (type !== 'plain_text' && type !== 'mrkdwn') {
        props.text = textBlock;
      } else {
        props.text = textBlock.text;
      }
    }
  }

  // Common prop name for plain_text field
  (['placeholder', 'label'] as const).forEach((textProp) => {
    if (textProp in props) {
      props[textProp] = stringToTextBlock(
        props[textProp] as PlainTextElement | string | number
      ) as PlainTextElement;
    }
  });

  for (const child of flattenedChildren) {
    validateParent(type, child);
  }

  const block =
    typeof type === 'function'
      ? (type as Component<P>)({
          ...props,
          children: flattenedChildren,
        })
      : {
          type,
          ...props,
        };

  if (typeof block === 'object' && !Array.isArray(block)) {
    for (const prop in block) {
      if (block[prop] == null) {
        delete block[prop];
      }
    }
  }

  // Assign source file path to block for prettier error logging
  if (typeof block === 'object' && !Array.isArray(block)) {
    Object.defineProperty(block, Symbol.for('__source'), {
      value: createCleanError().stack!.split('\n')[1],
      configurable: true,
      enumerable: false,
    });
  }

  return block;
}

export default createBlock;
