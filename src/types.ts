import {
  Dialog,
  View,
  ImageElement,
  PlainTextElement,
  MrkdwnElement,
  Option,
  Confirm,
  UsersSelect,
  MultiUsersSelect,
  StaticSelect,
  MultiStaticSelect,
  ConversationsSelect,
  MultiConversationsSelect,
  ChannelsSelect,
  MultiChannelsSelect,
  ExternalSelect,
  MultiExternalSelect,
  Button,
  Overflow,
  Datepicker,
  RadioButtons,
  Checkboxes,
  PlainTextInput,
  ImageBlock,
  ContextBlock,
  ActionsBlock,
  DividerBlock,
  SectionBlock,
  FileBlock,
  InputBlock,
} from '@slack/types';

export type Intrinsic<P> = Omit<P, 'type'> & {
  children?: Children;
};
export type IntrinsicChildren<P, K extends keyof P> = Omit<Intrinsic<P>, K> & {
  K?: P[K];
  children: Children;
};

export type NonBlockChild = string | number | null | false | undefined;

export type Child = { [key: string]: unknown } | NonBlockChild;
export type Children = {} | {}[];

export type Component<P extends {}> = (props: P) => JSX.Element | JSX.Element[];

export const MESSAGE_LAYOUT_BLOCKS = [
  'actions',
  'context',
  'divider',
  'file',
  'image',
  'section',
] as const;

export const MODAL_LAYOUT_BLOCKS = [
  'actions',
  'context',
  'divider',
  'image',
  'section',
] as const;

export const HOME_LAYOUT_BLOCKS = [
  'actions',
  'context',
  'divider',
  'image',
  'input',
  'section',
] as const;

declare global {
  namespace JSX {
    export type Element = Exclude<Exclude<Child, undefined>, null>;
    export interface ElementChildrenAttribute {
      children: Children;
    }
    export interface IntrinsicElements {
      blocks: {
        [key: string]: unknown;
      };
      dialog: IntrinsicChildren<Dialog, 'elements'>;
      modal:
        | IntrinsicChildren<View, 'blocks'>
        | {
            title: JSX.Element;
            submit: JSX.Element;
            close: JSX.Element;
          };
      home: JSX.IntrinsicElements['modal'];
      image: Intrinsic<ImageElement | ImageBlock>;
      plain_text: IntrinsicChildren<PlainTextElement, 'text'>;
      mrkdwn: IntrinsicChildren<MrkdwnElement, 'text'>;
      markdown: JSX.IntrinsicElements['mrkdwn'];
      option: IntrinsicChildren<Option, 'text'>;
      confirm: IntrinsicChildren<Confirm, 'text'>;
      users_select: Intrinsic<UsersSelect>;
      multi_users_select: Intrinsic<MultiUsersSelect>;
      static_select: IntrinsicChildren<StaticSelect, 'options'>;
      multi_static_select: IntrinsicChildren<MultiStaticSelect, 'options'>;
      conversations_select: Intrinsic<ConversationsSelect>;
      multi_conversations_select: Intrinsic<MultiConversationsSelect>;
      channels_select: Intrinsic<ChannelsSelect>;
      multi_channels_select: Intrinsic<MultiChannelsSelect>;
      external_select: Intrinsic<ExternalSelect>;
      multi_external_select: Intrinsic<MultiExternalSelect>;
      button: IntrinsicChildren<Button, 'text'>;
      overflow: IntrinsicChildren<Overflow, 'options'>;
      datepicker: Intrinsic<Datepicker>;
      radio_buttons: IntrinsicChildren<RadioButtons, 'options'>;
      checkboxes: IntrinsicChildren<Checkboxes, 'options'>;
      plain_text_input: Intrinsic<PlainTextInput>;
      context: IntrinsicChildren<ContextBlock, 'elements'>;
      actions: IntrinsicChildren<ActionsBlock, 'elements'>;
      divider: Intrinsic<DividerBlock>;
      section: Omit<Intrinsic<SectionBlock>, 'fields'> & {
        fields?: SectionBlock['fields'] | JSX.Element | JSX.Element[];
      };
      file: Intrinsic<FileBlock>;
      input:
        | IntrinsicChildren<InputBlock, 'element'>
        | {
            label: JSX.Element;
          };
      fragment: {};
      br: {};
      b: {};
      i: {};
      s: {};
      blockquote: {};
      code: {};
      pre: {};
      link: { url: string; children: Children };
      a: { href: string };
      emoji: {};
      channel: {};
      mention: {};
      time: {
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
      };
    }
  }
}
