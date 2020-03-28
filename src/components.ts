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
} from '@slack/types';
import { stringToPlainText } from './utils';

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
  title: stringToPlainText(title),
  submit: submit == null ? submit : stringToPlainText(submit),
  close: close == null ? close : stringToPlainText(close),
  ...props,
  blocks: children,
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
