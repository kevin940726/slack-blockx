import { createBlock } from 'slack-blockx';

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

document.getElementById('app')!.textContent = JSON.stringify(
  <Counter />,
  null,
  2
);
