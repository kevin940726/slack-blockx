import { green } from 'colorette';
import * as predefinedComponents from './components';
import { createCleanError } from './utils';
import {
  MESSAGE_LAYOUT_BLOCKS,
  MODAL_LAYOUT_BLOCKS,
  HOME_LAYOUT_BLOCKS,
} from './types';

export function throwIfInvalidParentError(
  parentType: string,
  expected: readonly string[],
  child: { type: string; [key: string]: any }
) {
  if (!expected.includes(child.type)) {
    const joined = `${expected.map((type) => green(`<${type}>`)).join(', ')}`;

    const parentLabel = green(`<${parentType}>`);
    const childLabel = green(`<${child.type}>`);

    const error = createCleanError(`${parentLabel} can only contains layout blocks.
Expected one of ${joined}, but instead received ${childLabel}.
`);

    const childSource = Object.getOwnPropertyDescriptor(
      child,
      Symbol.for('__source')
    );

    if (childSource && childSource.value) {
      const stacks = error.stack!.split('\n');

      const firstStackIndex = stacks.findIndex((stack) =>
        stack.startsWith('    at')
      );
      stacks.splice(
        firstStackIndex,
        0,
        Object.getOwnPropertyDescriptor(child, Symbol.for('__source'))!.value
      );

      error.stack = stacks.join('\n');
    }

    throw error;
  }
}

export function validateParent(
  parentType: string | Function,
  child: { type: string; [key: string]: any }
) {
  switch (parentType) {
    case predefinedComponents.blocks: {
      throwIfInvalidParentError('blocks', MESSAGE_LAYOUT_BLOCKS, child);
      break;
    }
    case 'modal': {
      throwIfInvalidParentError('modal', MODAL_LAYOUT_BLOCKS, child);
      break;
    }
    case 'home': {
      throwIfInvalidParentError('home', HOME_LAYOUT_BLOCKS, child);
      break;
    }
    default:
      break;
  }
}
