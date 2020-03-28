import htm from 'htm';
import createBlock from './createBlock';

const jsx = htm.bind(createBlock);

export * from './types';

export {
  createBlock,
  createBlock as h,
  createBlock as createElement,
  jsx,
  jsx as html,
};
