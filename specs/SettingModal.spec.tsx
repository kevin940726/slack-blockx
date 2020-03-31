import { createBlock } from '../';

function SettingModal() {
  return (
    <modal title="App menu" submit="Submit" close="Cancel">
      <section>
        <mrkdwn>
          <b>
            Hi <link url="fakelink.toUser.com">@David</link>!
          </b>{' '}
          Here's how I can help you:
        </mrkdwn>
      </section>

      <divider />

      <section>
        <mrkdwn>
          <emoji>calendar</emoji> <b>Create event</b>
          <br />
          Create a new event
        </mrkdwn>

        <button style="primary" value="click_me_123">
          Create event
        </button>
      </section>

      <section>
        <mrkdwn>
          <emoji>clipboard</emoji> <b>List of events</b>
          <br />
          Choose from different event lists
        </mrkdwn>

        <static_select placeholder="Choose list">
          <option value="value-0">My events</option>
          <option value="value-1">All events</option>
          <option value="value-2">Event invites</option>
        </static_select>
      </section>

      <section>
        <mrkdwn>
          <emoji>gear</emoji> <b>Settings</b>
          <br />
          Manage your notifications and team settings
        </mrkdwn>

        <static_select placeholder="Edit settings">
          <option value="value-0">Notifications</option>
          <option value="value-1">Team settings</option>
        </static_select>
      </section>

      <actions>
        <button value="click_me_123">Send feedback</button>
        <button value="click_me_123">FAQs</button>
      </actions>
    </modal>
  );
}

test('<SettingModal />', () => {
  expect(<SettingModal />).toEqual({
    type: 'modal',
    title: {
      type: 'plain_text',
      text: 'App menu',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'Submit',
      emoji: true,
    },
    close: {
      type: 'plain_text',
      text: 'Cancel',
      emoji: true,
    },
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: "*Hi <fakelink.toUser.com|@David>!* Here's how I can help you:",
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: ':calendar: *Create event*\nCreate a new event',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Create event',
            emoji: true,
          },
          style: 'primary',
          value: 'click_me_123',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            ':clipboard: *List of events*\nChoose from different event lists',
        },
        accessory: {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Choose list',
            emoji: true,
          },
          options: [
            {
              text: {
                type: 'plain_text',
                text: 'My events',
                emoji: true,
              },
              value: 'value-0',
            },
            {
              text: {
                type: 'plain_text',
                text: 'All events',
                emoji: true,
              },
              value: 'value-1',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Event invites',
                emoji: true,
              },
              value: 'value-2',
            },
          ],
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            ':gear: *Settings*\nManage your notifications and team settings',
        },
        accessory: {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Edit settings',
            emoji: true,
          },
          options: [
            {
              text: {
                type: 'plain_text',
                text: 'Notifications',
                emoji: true,
              },
              value: 'value-0',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Team settings',
                emoji: true,
              },
              value: 'value-1',
            },
          ],
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Send feedback',
              emoji: true,
            },
            value: 'click_me_123',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'FAQs',
              emoji: true,
            },
            value: 'click_me_123',
          },
        ],
      },
    ],
  });
});
