# slack-blockx

jsx for Slack block-kit

## Installation

```sh
yarn add slack-blockx
```

## Usage

```jsx
/** @jsx createBlock */
import { createBlock } from 'slack-blockx';

console.log(
  <blocks>
    <actions>
      <button>Button</button>
    </actions>
  </blocks>
);
// Logs:
// {
//   "blocks": [
//     {
//       "type": "actions",
//       "elements": [
//         {
//           "type": "button",
//           "text": {
//             "type": "plain_text",
//             "emoji": true,
//             "text": "Button"
//           }
//         }
//       ]
//     }
//   ]
// }
```

## Usage without compiler

```jsx
const { jsx } = require('slack-blockx');

console.log(jsx`
  <blocks>
    <actions>
      <button>Button</button>
    </actions>
  </blocks>
`); // Same as above
```

## Documentation

_WIP_
