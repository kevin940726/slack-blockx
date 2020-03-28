import { createBlock } from '../';

interface OptionProps {
  text: string;
  value: string;
  votes: { picture: string; name: string }[];
}

function Option({ text, value, votes }: OptionProps) {
  return (
    <fragment>
      <section>
        <mrkdwn>{text}</mrkdwn>

        <button value={value}>Vote</button>
      </section>

      <context>
        {votes.slice(0, 8).map((vote) => (
          <image image_url={vote.picture} alt_text={vote.name} />
        ))}
        {votes.length > 8 && '...'}
        {votes.length || 'No'} {votes.length === 1 ? 'vote' : 'votes'}
      </context>
    </fragment>
  );
}

function Poll({ options = [], ...props }: { options?: OptionProps[] }) {
  return (
    <blocks response_type="in_channel" {...props}>
      <section>
        <mrkdwn>
          {
            '*Where should we order lunch from?* Poll by <fakeLink.toUser.com|Mark>'
          }
        </mrkdwn>
      </section>

      <divider />

      {options.length ? (
        options.map((option) => (
          <Option
            text={option.text}
            value={option.value}
            votes={option.votes}
          />
        ))
      ) : (
        <section>
          <mrkdwn>No options yet</mrkdwn>
        </section>
      )}

      <divider />

      <actions>
        <button>Add a suggestion</button>
      </actions>
    </blocks>
  );
}

test('<Poll />', () => {
  expect(<Poll />).toMatchInlineSnapshot(`
    Object {
      "blocks": Array [
        Object {
          "text": Object {
            "text": "*Where should we order lunch from?* Poll by <fakeLink.toUser.com|Mark>",
            "type": "mrkdwn",
          },
          "type": "section",
        },
        Object {
          "type": "divider",
        },
        Object {
          "text": Object {
            "text": "No options yet",
            "type": "mrkdwn",
          },
          "type": "section",
        },
        Object {
          "type": "divider",
        },
        Object {
          "elements": Array [
            Object {
              "text": Object {
                "emoji": true,
                "text": "Add a suggestion",
                "type": "plain_text",
              },
              "type": "button",
            },
          ],
          "type": "actions",
        },
      ],
      "response_type": "in_channel",
    }
  `);
});

test('<Poll options=... />', () => {
  const options = [
    {
      text:
        ':sushi: *Ace Wasabi Rock-n-Roll Sushi Bar*\nThe best landlocked sushi restaurant.',
      value: 'sushi',
      votes: [
        {
          name: 'Michael Scott',
          picture:
            'https://api.slack.com/img/blocks/bkb_template_images/profile_1.png',
        },
        {
          name: 'Dwight Schrute',
          picture:
            'https://api.slack.com/img/blocks/bkb_template_images/profile_2.png',
        },
        {
          name: 'Pam Beasely',
          picture:
            'https://api.slack.com/img/blocks/bkb_template_images/profile_3.png',
        },
      ],
    },
    {
      text:
        ':hamburger: *Super Hungryman Hamburgers*\nOnly for the hungriest of the hungry.',
      value: 'hamburger',
      votes: [
        {
          name: 'Angela',
          picture:
            'https://api.slack.com/img/blocks/bkb_template_images/profile_4.png',
        },
        {
          name: 'Dwight Schrute',
          picture:
            'https://api.slack.com/img/blocks/bkb_template_images/profile_2.png',
        },
      ],
    },
    {
      text:
        ':ramen: *Kagawa-Ya Udon Noodle Shop*\nDo you like to shop for noodles? We have noodles.',
      value: 'ramen',
      votes: [],
    },
  ];

  expect(<Poll options={options} />).toMatchInlineSnapshot(`
    Object {
      "blocks": Array [
        Object {
          "text": Object {
            "text": "*Where should we order lunch from?* Poll by <fakeLink.toUser.com|Mark>",
            "type": "mrkdwn",
          },
          "type": "section",
        },
        Object {
          "type": "divider",
        },
        Object {
          "accessory": Object {
            "text": Object {
              "emoji": true,
              "text": "Vote",
              "type": "plain_text",
            },
            "type": "button",
            "value": "sushi",
          },
          "text": Object {
            "text": ":sushi: *Ace Wasabi Rock-n-Roll Sushi Bar*
    The best landlocked sushi restaurant.",
            "type": "mrkdwn",
          },
          "type": "section",
        },
        Object {
          "elements": Array [
            Object {
              "alt_text": "Michael Scott",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
              "type": "image",
            },
            Object {
              "alt_text": "Dwight Schrute",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
              "type": "image",
            },
            Object {
              "alt_text": "Pam Beasely",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
              "type": "image",
            },
            Object {
              "emoji": true,
              "text": "3 votes",
              "type": "plain_text",
            },
          ],
          "type": "context",
        },
        Object {
          "accessory": Object {
            "text": Object {
              "emoji": true,
              "text": "Vote",
              "type": "plain_text",
            },
            "type": "button",
            "value": "hamburger",
          },
          "text": Object {
            "text": ":hamburger: *Super Hungryman Hamburgers*
    Only for the hungriest of the hungry.",
            "type": "mrkdwn",
          },
          "type": "section",
        },
        Object {
          "elements": Array [
            Object {
              "alt_text": "Angela",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_4.png",
              "type": "image",
            },
            Object {
              "alt_text": "Dwight Schrute",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
              "type": "image",
            },
            Object {
              "emoji": true,
              "text": "2 votes",
              "type": "plain_text",
            },
          ],
          "type": "context",
        },
        Object {
          "accessory": Object {
            "text": Object {
              "emoji": true,
              "text": "Vote",
              "type": "plain_text",
            },
            "type": "button",
            "value": "ramen",
          },
          "text": Object {
            "text": ":ramen: *Kagawa-Ya Udon Noodle Shop*
    Do you like to shop for noodles? We have noodles.",
            "type": "mrkdwn",
          },
          "type": "section",
        },
        Object {
          "elements": Array [
            Object {
              "emoji": true,
              "text": "No votes",
              "type": "plain_text",
            },
          ],
          "type": "context",
        },
        Object {
          "type": "divider",
        },
        Object {
          "elements": Array [
            Object {
              "text": Object {
                "emoji": true,
                "text": "Add a suggestion",
                "type": "plain_text",
              },
              "type": "button",
            },
          ],
          "type": "actions",
        },
      ],
      "response_type": "in_channel",
    }
  `);
});
