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
  action_id?: string;
  block_id?: string;
};
export type IntrinsicChildren<P, K extends keyof P> = Omit<Intrinsic<P>, K> & {
  children?: P[K] | Children;
};

export type Child = Object | string | number | null | false | undefined;
export type Children = Child | Child[];

declare global {
  namespace JSX {
    export type Element = Child;
    export interface IntrinsicElements {
      blocks: Intrinsic<{
        [key: string]: any;
      }>;
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
      section: Intrinsic<SectionBlock> & {
        children?: JSX.Element | [JSX.Element, JSX.Element];
      };
      file: Intrinsic<FileBlock>;
      input:
        | IntrinsicChildren<InputBlock, 'element'>
        | {
            label: JSX.Element;
          };
      fragment: {};
      br: {};
    }
  }
}
