import { PlainTextElement } from '@slack/types';
import * as predefinedComponents from './components';
import { stringToPlainText, flattenChildren } from './utils';

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

  return block;
}

export default createBlock;
