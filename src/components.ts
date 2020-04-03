import type {
  Dialog,
  SectionBlock,
  ContextBlock,
  ActionsBlock,
  View,
  KnownBlock,
  Block,
  InputBlock,
  RadioButtons,
  Checkboxes,
  Option,
  StaticSelect,
  MultiStaticSelect,
  Overflow,
  PlainTextElement,
} from '@slack/types';
import { stringToTextBlock } from './utils';

export const blocks = ({
  children,
  ...props
}: {
  children: (KnownBlock | Block)[];
}) => ({
  blocks: children,
  ...props,
});

export const section = ({
  children: [text, accessory],
  ...props
}: SectionBlock & {
  children: [SectionBlock['text'], SectionBlock['accessory']?];
}): SectionBlock => ({
  type: 'section',
  text,
  accessory,
  ...props,
});

export const context = ({
  children,
  ...props
}: ContextBlock & {
  children: ContextBlock['elements'];
}): ContextBlock => ({
  type: 'context',
  elements: children,
  ...props,
});

export const actions = ({
  children,
  ...props
}: ActionsBlock & {
  children: ActionsBlock['elements'];
}): ActionsBlock => ({
  type: 'actions',
  elements: children,
  ...props,
});

export const modal = ({
  children,
  title,
  submit,
  close,
  ...props
}: View & {
  children: View['blocks'];
  title: Required<View>['title'] | string;
  submit: View['submit'] | string;
  close: View['close'] | string;
}): View => ({
  type: 'modal',
  title: stringToTextBlock(title) as PlainTextElement,
  submit:
    submit == null ? submit : (stringToTextBlock(submit) as PlainTextElement),
  close: close == null ? close : (stringToTextBlock(close) as PlainTextElement),
  blocks: children,
  ...props,
});

export const home = (props: Parameters<typeof modal>[0]): View => ({
  ...modal(props),
  type: 'home',
});

export const input = ({
  children: [element],
  ...props
}: InputBlock & {
  children: [InputBlock['element']];
}): InputBlock => ({
  type: 'input',
  element,
  ...props,
});

export const radio_buttons = ({
  children,
  ...props
}: RadioButtons & {
  children: RadioButtons['options'];
}): RadioButtons => ({
  type: 'radio_buttons',
  options: children,
  ...props,
});

export const checkboxes = ({
  children,
  ...props
}: Checkboxes & {
  children: Checkboxes['options'];
}): Checkboxes => ({
  type: 'checkboxes',
  options: children,
  ...props,
});

export const option = ({
  children: [text],
  ...props
}: Option & {
  children: [Option['text']];
}): Option => ({
  text,
  ...props,
});

export const static_select = ({
  children,
  ...props
}: StaticSelect & {
  children: StaticSelect['options'];
}): StaticSelect => ({
  type: 'static_select',
  options: children,
  ...props,
});

export const multi_static_select = (
  props: Parameters<typeof static_select>[0]
): MultiStaticSelect => ({
  ...static_select(props),
  type: 'multi_static_select',
});

export const overflow = ({
  children,
  ...props
}: Overflow & {
  children: Overflow['options'];
}): Overflow => ({
  type: 'overflow',
  options: children,
  ...props,
});

export const dialog = ({
  children,
  ...props
}: Dialog & {
  children: Dialog['elements'];
}): Dialog => ({
  elements: children,
  ...props,
});

export const br = (): string => '\n';

export const b = ({ children }: { children: string[] }): string[] => [
  '*',
  ...children,
  '*',
];

export const i = ({ children }: { children: string[] }): string[] => [
  '_',
  ...children,
  '_',
];

export const s = ({ children }: { children: string[] }): string[] => [
  '~',
  ...children,
  '~',
];

export const blockquote = ({ children }: { children: string[] }): string[] => [
  ...children,
  '\n',
];

export const code = ({ children }: { children: string[] }): string[] => [
  '`',
  ...children,
  '`',
];

export const pre = ({ children }: { children: string[] }): string[] => [
  '```',
  ...children,
  '```\n',
];

export const link = ({
  url,
  children,
}: {
  url: string;
  children: string[];
}): string[] => ['<', url, '|', ...children, '>'];
// Alias
export const a = ({
  href,
  children,
}: {
  href: string;
  children: string[];
}): string[] => link({ url: href, children });

export const emoji = ({
  children: [{ text }],
}: {
  children: [PlainTextElement];
}): string => `:${text}:`;

export const channel = ({
  children: [{ text }],
}: {
  children: [PlainTextElement];
}): string => `<#${text}>`;

export const mention = ({
  children: [{ text: id }],
}: {
  children: [PlainTextElement];
}): string => {
  if (id.startsWith('U') || id.startsWith('W')) {
    return `<@${id}>`;
  } else if (id === 'here') {
    return `<!here|here>`;
  } else if (id === 'channel' || id === 'everyone') {
    return `<!${id}>`;
  } else {
    return `<!subteam^${id}>`;
  }
};

export const time = ({
  datetime,
  format,
  link,
  children: [plainText],
}: {
  datetime: string | number | Date;
  format:
    | string
    | ((tokens: {
        date_num: string;
        date: string;
        date_short: string;
        date_long: string;
        date_pretty: string;
        date_short_pretty: string;
        date_long_pretty: string;
        time: string;
        time_secs: string;
      }) => string);
  link?: string;
  children: [PlainTextElement?];
}): [string] => {
  const isTimestamp =
    typeof datetime === 'number' ||
    (typeof datetime === 'string' && !isNaN(parseInt(datetime, 10)));
  const timestamp = isTimestamp
    ? parseInt(String(datetime), 10)
    : new Date(datetime).getTime();

  let token = format;
  if (typeof format === 'function') {
    token = format({
      date_num: '{date_num}',
      date: '{date}',
      date_short: '{date_short}',
      date_long: '{date_long}',
      date_pretty: '{date_pretty}',
      date_short_pretty: '{date_short_pretty}',
      date_long_pretty: '{date_long_pretty}',
      time: '{time}',
      time_secs: '{time_secs}',
    });
  }

  const optionalLink = link ? `^${link}` : '';

  const fallbackText = plainText
    ? plainText.text
    : new Date(timestamp).toLocaleString();

  return [`<!date^${timestamp}^${token}${optionalLink}|${fallbackText}>`];
};
