import { Option } from '@slack/types';
import { isNullish } from './utils';

type BlockExpression =
  | string
  | {
      type: string;
      props: { [key: string]: any };
      children: BlockExpression[];
    };

type Block = {
  type?: string;
  [key: string]: any;
};

function fromJSON(
  json: Block | Block[] | undefined | string
): BlockExpression | BlockExpression[] | undefined {
  if (json == null) {
    return json;
  } else if (typeof json === 'string') {
    return {
      type: 'plain_text',
      props: { emoji: true },
      children: fromText({
        type: 'plain_text',
        text: json,
      }),
    };
  } else if (Array.isArray(json)) {
    return json.map((block) => fromJSON(block)).flat(Infinity);
  } else if (!('type' in json) && Array.isArray(json.blocks)) {
    const { blocks, ...props } = json;
    return {
      type: 'blocks',
      props,
      children: fromJSON(blocks as Block[]) as BlockExpression[],
    };
  }

  if (!('type' in json)) {
    throw new Error('Missing type in block');
  }

  const { type, ...props } = json as { type: string; [key: string]: any };

  switch (type) {
    case 'modal':
    case 'home': {
      const { blocks, title, submit, close, ...rest } = props;
      return {
        type,
        props: {
          title: fromJSON(title),
          submit: fromJSON(submit),
          close: fromJSON(close),
          ...rest,
        },
        children: blocks.map((block: Block) => fromJSON(block)),
      };
    }
    case 'plain_text':
    case 'mrkdwn': {
      const { text, ...rest } = props;
      return {
        type,
        props: rest,
        children: fromText({ type, text }),
      };
    }
    case 'option': {
      const { text, description, ...rest } = props;
      return {
        type,
        props: {
          description: fromJSON(description),
          ...rest,
        },
        children: fromText(text),
      };
    }
    case 'confirm':
    case 'image': {
      const { text, title, confirm, deny, ...rest } = props;
      return {
        type,
        props: {
          title: fromJSON(title),
          confirm: fromJSON(confirm),
          deny: fromJSON(deny),
          ...rest,
        },
        children: fromText(text),
      };
    }
    case 'users_select':
    case 'multi_users_select':
    case 'static_select':
    case 'multi_static_select':
    case 'conversations_select':
    case 'multi_conversations_select':
    case 'channels_select':
    case 'multi_channels_select':
    case 'external_select':
    case 'multi_external_select':
    case 'radio_buttons':
    case 'checkboxes':
    case 'overflow': {
      const {
        placeholder,
        confirm,
        initial_option,
        initial_options,
        options,
        option_groups,
        ...rest
      } = props;
      return {
        type,
        props: {
          placeholder: fromJSON(placeholder),
          confirm: confirm && {
            type: 'confirm',
            ...confirm,
          },
          initial_option: initial_option && {
            type: 'option',
            ...initial_option,
          },
          initial_options:
            initial_options &&
            initial_options.map((option: Option) => ({
              type: 'option',
              ...option,
            })),
          // FIXME: this is not right
          option_groups:
            option_groups &&
            option_groups.map((optionGroup: Block) => ({
              label: fromJSON(optionGroup.label),
              options:
                optionGroup.options &&
                optionGroup.options.map((option: Option) => ({
                  type: 'option',
                  ...option,
                })),
            })),
          ...rest,
        },
        children: options
          ? options.map((option: Option) => ({
              type: 'option',
              ...option,
            }))
          : [],
      };
    }
    case 'button': {
      const { text, confirm, ...rest } = props;
      return {
        type,
        props: {
          confirm: confirm && {
            type: 'confirm',
            ...confirm,
          },
          ...rest,
        },
        children: [text.text],
      };
    }
    case 'datepicker':
    case 'plain_text_input': {
      const { placeholder, confirm, ...rest } = props;
      return {
        type,
        props: {
          confirm: confirm && {
            type: 'confirm',
            ...confirm,
          },
          placeholder: fromJSON(placeholder),
          ...rest,
        },
        children: [],
      };
    }
    case 'context':
    case 'actions': {
      const { elements, rest } = props;
      return {
        type,
        props: rest,
        children: elements.map((element: Block) => fromJSON(element)),
      };
    }
    case 'divider': {
      return {
        type,
        props,
        children: [],
      };
    }
    case 'section': {
      const { text, fields, accessory, ...rest } = props;
      return {
        type,
        props: {
          fields: fields && fields.map((field: Block) => fromJSON(field)),
          ...rest,
        },
        children: [fromJSON(text), fromJSON(accessory)]
          .flat(Infinity)
          .filter((child) => !isNullish(child)),
      };
    }
    case 'input': {
      const { label, hint, element, ...rest } = props;
      return {
        type,
        props: {
          label: fromJSON(label),
          hint: fromJSON(hint),
          ...rest,
        },
        children: [fromJSON(element)].flat(Infinity),
      };
    }
    default:
      return {
        type,
        props,
        children: [],
      };
  }
}

export function fromText({
  type,
  text,
}: {
  type: 'plain_text' | 'mrkdwn';
  text: string;
}): BlockExpression[] {
  const expressions = type === 'mrkdwn' ? fromMultilineMarkdown(text) : [text];

  return expressions
    .map((expression) => {
      if (typeof expression !== 'string') {
        return expression;
      }

      return expression.split(/\n/g).map((line) =>
        line === '\n'
          ? {
              type: 'br',
              props: {},
              children: [],
            }
          : type === 'mrkdwn'
          ? fromInlineMarkdown(line)
          : line
      );
    })
    .flat(Infinity)
    .filter(Boolean);
}

export function fromMultilineMarkdown(md: string): BlockExpression[] {
  let expressions = [];

  /**
   * Code blocks
   */
  let lastMatchedIndex = 0;
  const codeBlockRegex = /^```\n?(.+?)\n?```$\n?/gms;

  let match;
  while ((match = codeBlockRegex.exec(md))) {
    expressions.push(md.slice(lastMatchedIndex, match.index));
    expressions.push({
      type: 'pre',
      props: {},
      children: [match[1]],
    });

    lastMatchedIndex = codeBlockRegex.lastIndex;
  }

  expressions.push(md.slice(lastMatchedIndex));

  /**
   * blockquote
   */

  expressions = expressions
    .map((expression) => {
      if (typeof expression !== 'string') {
        return expression;
      }

      const ex = [];

      const blockQuoteRegex = /^>\s*(.*)$\n?/gm;
      let lastMatchedIndex = 0;
      let match;

      while ((match = blockQuoteRegex.exec(expression))) {
        const lastExpression = ex[ex.length - 1];

        if (
          typeof lastExpression !== 'string' &&
          lastExpression &&
          lastExpression.type === 'blockquote' &&
          lastMatchedIndex === match.index
        ) {
          // Merge with the last blockquote
          lastExpression.children[0] += '\n' + match[1];
        } else {
          ex.push(expression.slice(lastMatchedIndex, match.index));
          ex.push({
            type: 'blockquote',
            props: {},
            children: [match[1]],
          });
        }

        lastMatchedIndex = blockQuoteRegex.lastIndex;
      }

      ex.push(expression.slice(lastMatchedIndex));

      return ex;
    })
    .flat(Infinity)
    .map((expression) =>
      typeof expression === 'object' && expression.type === 'blockquote'
        ? {
            ...expression,
            children: fromInlineMarkdown(expression.children[0]),
          }
        : expression
    );

  return expressions.filter(Boolean);
}

export function fromInlineMarkdown(md: string): BlockExpression[] {
  let lastMatchedIndex = 0;
  const expressions = [];

  const codeToTypeMap = {
    '*': 'b',
    _: 'i',
    '~': 's',
    '`': 'code',
    ':': 'emoji',
  } as const;

  const regex = /([*_~`:])(.+?)\1/g;
  let match;

  while ((match = regex.exec(md))) {
    expressions.push(md.slice(lastMatchedIndex, match.index));
    expressions.push({
      type: codeToTypeMap[match[1] as keyof typeof codeToTypeMap],
      props: {},
      children: fromInlineMarkdown(match[2]),
    });

    lastMatchedIndex = regex.lastIndex;
  }

  expressions.push(md.slice(lastMatchedIndex));

  return expressions.filter(Boolean);
}

export default fromJSON;
