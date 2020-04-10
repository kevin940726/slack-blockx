import { createBlock } from '../';

function Counter({ count = 0 }: { count?: number }) {
  return (
    <blocks>
      <section>
        <mrkdwn>
          You have clicked the button <code>{count}</code>{' '}
          {count === 1 ? 'time' : 'times'}.
        </mrkdwn>

        <button value={String(count)}>Button</button>
      </section>
    </blocks>
  );
}

test('<Counter />', () => {
  expect(<Counter />).toEqual({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'You have clicked the button `0` times.',
        },
        accessory: {
          type: 'button',
          value: '0',
          text: {
            type: 'plain_text',
            emoji: true,
            text: 'Button',
          },
        },
      },
    ],
  });
});
