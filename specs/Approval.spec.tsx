import { createBlock, Children } from '../';

function Field({ label, children }: { label: string; children: Children }) {
  return (
    <fragment>
      <b>{label}:</b>
      <br />
      {children}
    </fragment>
  );
}

function Approval({
  title,
  details = [],
  compact = false,
}: {
  title: Children;
  details: { label: string; value: string }[];
  compact?: boolean;
}) {
  return (
    <blocks>
      <section>{title}</section>

      <section
        fields={
          compact
            ? details.map(({ label, value }) => (
                <mrkdwn>
                  <Field label={label}>{value}</Field>
                </mrkdwn>
              ))
            : undefined
        }
      >
        {!compact && (
          <mrkdwn>
            {details.map(({ label, value }, index) => (
              <fragment>
                {index !== 0 && <br />}
                <Field label={label}>{value}</Field>
              </fragment>
            ))}
          </mrkdwn>
        )}
      </section>

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

const title = (
  <mrkdwn>
    You have a new request:
    <br />
    <b>
      <link url="fakeLink.toEmployeeProfile.com">
        Fred Enriquez - New device request
      </link>
    </b>
  </mrkdwn>
);

const details = [
  { label: 'Type', value: 'Computer (laptop)' },
  { label: 'When', value: 'Submitted Aut 10' },
  { label: 'Last Update', value: 'Mar 10, 2015 (3 years, 5 months)' },
  { label: 'Reason', value: "All vowel keys aren't working." },
  { label: 'Specs', value: '"Cheetah Pro 15" - Fast, really fast"' },
];

test('<Approval compact />', () => {
  expect(<Approval title={title} details={details} compact />).toEqual({
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

test('<Approval />', () => {
  expect(<Approval title={title} details={details} />).toMatchInlineSnapshot(`
    Object {
      "blocks": Array [
        Object {
          "text": Object {
            "text": "You have a new request:
    *<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*",
            "type": "mrkdwn",
          },
          "type": "section",
        },
        Object {
          "text": Object {
            "text": "*Type:*
    Computer (laptop)
    *When:*
    Submitted Aut 10
    *Last Update:*
    Mar 10, 2015 (3 years, 5 months)
    *Reason:*
    All vowel keys aren't working.
    *Specs:*
    \\"Cheetah Pro 15\\" - Fast, really fast\\"",
            "type": "mrkdwn",
          },
          "type": "section",
        },
        Object {
          "elements": Array [
            Object {
              "style": "primary",
              "text": Object {
                "emoji": true,
                "text": "Approve",
                "type": "plain_text",
              },
              "type": "button",
              "value": "click_me_123",
            },
            Object {
              "style": "danger",
              "text": Object {
                "emoji": true,
                "text": "Deny",
                "type": "plain_text",
              },
              "type": "button",
              "value": "click_me_123",
            },
          ],
          "type": "actions",
        },
      ],
    }
  `);
});
