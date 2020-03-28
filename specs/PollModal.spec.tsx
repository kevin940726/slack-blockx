import { createBlock } from '../';

function PollModal({ responseURL }: { responseURL: string }) {
  return (
    <modal
      title="Workplace check-in"
      submit="Submit"
      close="Close"
      private_metadata={JSON.stringify({ responseURL })}
    >
      <section>
        :wave: Hey David!
        <br />
        We'd love to hear from you how we can make this place the best place
        you’ve ever worked.
      </section>

      <divider />

      <input label="Enter text of option" block_id="text">
        <plain_text_input multiline />
      </input>

      <input label="Enter value of option" block_id="value">
        <plain_text_input />
      </input>
    </modal>
  );
}

test('<PollModal />', () => {
  expect(<PollModal responseURL="https://slack.com" />).toMatchInlineSnapshot(`
    Object {
      "blocks": Array [
        Object {
          "text": Object {
            "emoji": true,
            "text": ":wave: Hey David!
    We'd love to hear from you how we can make this place the best place you’ve ever worked.",
            "type": "plain_text",
          },
          "type": "section",
        },
        Object {
          "type": "divider",
        },
        Object {
          "block_id": "text",
          "element": Object {
            "multiline": true,
            "type": "plain_text_input",
          },
          "label": Object {
            "emoji": true,
            "text": "Enter text of option",
            "type": "plain_text",
          },
          "type": "input",
        },
        Object {
          "block_id": "value",
          "element": Object {
            "type": "plain_text_input",
          },
          "label": Object {
            "emoji": true,
            "text": "Enter value of option",
            "type": "plain_text",
          },
          "type": "input",
        },
      ],
      "close": Object {
        "emoji": true,
        "text": "Close",
        "type": "plain_text",
      },
      "private_metadata": "{\\"responseURL\\":\\"https://slack.com\\"}",
      "submit": Object {
        "emoji": true,
        "text": "Submit",
        "type": "plain_text",
      },
      "title": Object {
        "emoji": true,
        "text": "Workplace check-in",
        "type": "plain_text",
      },
      "type": "modal",
    }
  `);
});
