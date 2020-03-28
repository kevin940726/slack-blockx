import { createBlock } from '../';

function Counter({ count = 0, ...props }: { count?: number }) {
  return (
    <blocks {...props}>
      <section>
        <mrkdwn>
          You have clicked the button `{count}` {count === 1 ? 'time' : 'times'}
          .
        </mrkdwn>

        <button value={String(count)}>Button</button>
      </section>
    </blocks>
  );
}

test('<Counter />', () => {
  expect(<Counter />).toMatchInlineSnapshot(`
    Object {
      "blocks": Array [
        Object {
          "accessory": Object {
            "text": Object {
              "emoji": true,
              "text": "Button",
              "type": "plain_text",
            },
            "type": "button",
            "value": "0",
          },
          "text": Object {
            "text": "You have clicked the button \`0\` times.",
            "type": "mrkdwn",
          },
          "type": "section",
        },
      ],
    }
  `);
});
