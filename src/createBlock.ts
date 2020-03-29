import { PlainTextElement } from '@slack/types';
import * as predefinedComponents from './components';
import { stringToPlainText, flattenChildren, createCleanError } from './utils';
import { validateParent } from './validators';

function createBlock(
  type: string | Function,
  props: { [key: string]: unknown },
  ...children: JSX.Element[]
): JSX.Element | JSX.Element[] {
  const flattenedChildren = flattenChildren(children);

  if (type in predefinedComponents) {
    const Component =
      predefinedComponents[type as keyof typeof predefinedComponents];
    return createBlock(Component, props, ...children);
  } else if (type === '' || type === 'fragment') {
    return flattenedChildren;
  }

  props = props || {};

  if (typeof type === 'string') {
    if (
      children.length &&
      children.every((child) => typeof child !== 'object')
    ) {
      const text = children.join('');

      if (['mrkdwn', 'plain_text'].includes(type)) {
        props.text = text;
      } else {
        props.text = {
          type: 'plain_text',
          emoji: true,
          text,
        };
      }
    } else {
      props.text = children[0];
    }
  }

  ['placeholder', 'label'].forEach((textProp) => {
    if (textProp in props) {
      props[textProp] = stringToPlainText(
        props[textProp] as PlainTextElement | string | number
      );
    }
  });

  for (const child of flattenedChildren) {
    validateParent(type, child);
  }

  const block =
    typeof type === 'function'
      ? type({
          ...props,
          children: flattenedChildren,
        })
      : {
          type,
          ...props,
        };

  Object.keys(block).forEach((prop) => {
    if (block[prop] == null) {
      delete block[prop];
    }
  });

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
