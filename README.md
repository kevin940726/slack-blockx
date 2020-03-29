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

[View it on Block Kit Builder](https://api.slack.com/tools/block-kit-builder?mode=message&blocks=%5B%7B%22type%22%3A%22actions%22%2C%22elements%22%3A%5B%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22emoji%22%3Atrue%2C%22text%22%3A%22Button%22%7D%7D%5D%7D%5D)

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

[View it on Block Kit Builder](https://api.slack.com/tools/block-kit-builder?mode=message&blocks=%5B%7B%22type%22%3A%22actions%22%2C%22elements%22%3A%5B%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22emoji%22%3Atrue%2C%22text%22%3A%22Button%22%7D%7D%5D%7D%5D)

## Documentation

_WIP_
