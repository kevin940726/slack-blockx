import { createBlock, Children } from '../';

function Field({ label, children }: { label: string; children: Children }) {
  return (
    <mrkdwn>
      <b>{label}:</b>
      <br />
      {children}
    </mrkdwn>
  );
}

function Approval({
  title,
  details = [],
}: {
  title: Children;
  details: { label: string; value: string }[];
}) {
  return (
    <blocks>
      <section>{title}</section>

      <section
        fields={details.map(({ label, value }) => (
          <Field label={label}>{value}</Field>
        ))}
      />

      <actions>
        <button value="click_me_123" style="primary">
          Approve
        </button>
        <button value="click_me_123" style="danger">
          Deny
        </button>
      </actions>
    </blocks>
  );
}

test('<Approval />', () => {
  expect(
    <Approval
      title={
        <mrkdwn>
          You have a new request:
          <br />
          <b>
            <link url="fakeLink.toEmployeeProfile.com">
              Fred Enriquez - New device request
            </link>
          </b>
        </mrkdwn>
      }
      details={[
        { label: 'Type', value: 'Computer (laptop)' },
        { label: 'When', value: 'Submitted Aut 10' },
        { label: 'Last Update', value: 'Mar 10, 2015 (3 years, 5 months)' },
        { label: 'Reason', value: "All vowel keys aren't working." },
        { label: 'Specs', value: '"Cheetah Pro 15" - Fast, really fast"' },
      ]}
    />
  ).toEqual({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            'You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: '*Type:*\nComputer (laptop)',
          },
          {
            type: 'mrkdwn',
            text: '*When:*\nSubmitted Aut 10',
          },
          {
            type: 'mrkdwn',
            text: '*Last Update:*\nMar 10, 2015 (3 years, 5 months)',
          },
          {
            type: 'mrkdwn',
            text: "*Reason:*\nAll vowel keys aren't working.",
          },
          {
            type: 'mrkdwn',
            text: '*Specs:*\n"Cheetah Pro 15" - Fast, really fast"',
          },
        ],
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              emoji: true,
              text: 'Approve',
            },
            style: 'primary',
            value: 'click_me_123',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              emoji: true,
              text: 'Deny',
            },
            style: 'danger',
            value: 'click_me_123',
          },
        ],
      },
    ],
  });
});
