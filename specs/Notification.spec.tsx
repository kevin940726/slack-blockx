import { createBlock } from '../';

function Notification() {
  return (
    <blocks>
      <section>
        Looks like you have a scheduling conflict with this event:
      </section>

      <divider />

      <section>
        <mrkdwn>
          <b>
            <a href="fakeLink.toUserProfiles.com">Iris / Zelda 1-1</a>
          </b>
          <br />
          Tuesday, January 21 4:00-4:30pm
          <br />
          Building 2 - Havarti Cheese (3)
          <br />2 guests
        </mrkdwn>

        <image
          image_url="https://api.slack.com/img/blocks/bkb_template_images/notifications.png"
          alt_text="calendar thumbnail"
        />
      </section>

      <context>
        <image
          image_url="https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png"
          alt_text="notifications warning icon"
        />
        <mrkdwn>
          <b>Conflicts with Team Huddle: 4:15-4:30pm</b>
        </mrkdwn>
      </context>

      <divider />

      <section>
        <mrkdwn>
          <b>Propose a new time:</b>
        </mrkdwn>
      </section>

      <section>
        <mrkdwn>
          <b>Today - 4:30-5pm</b>
          <br />
          Everyone is available: @iris, @zelda
        </mrkdwn>

        <button value="click_me_123">Choose</button>
      </section>

      <section>
        <mrkdwn>
          <b>Tomorrow - 4-4:30pm</b>
          <br />
          Everyone is available: @iris, @zelda
        </mrkdwn>

        <button value="click_me_123">Choose</button>
      </section>

      <section>
        <mrkdwn>
          <b>Tomorrow - 6-6:30pm</b>
          <br />
          Some people aren't available: @iris, <s>@zelda</s>
        </mrkdwn>

        <button value="click_me_123">Choose</button>
      </section>

      <section>
        <mrkdwn>
          <b>
            <a href="fakelink.ToMoreTimes.com">Show more times</a>
          </b>
        </mrkdwn>
      </section>
    </blocks>
  );
}

test('<Notification />', () => {
  expect(<Notification />).toEqual({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          emoji: true,
          text: 'Looks like you have a scheduling conflict with this event:',
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            '*<fakeLink.toUserProfiles.com|Iris / Zelda 1-1>*\nTuesday, January 21 4:00-4:30pm\nBuilding 2 - Havarti Cheese (3)\n2 guests',
        },
        accessory: {
          type: 'image',
          image_url:
            'https://api.slack.com/img/blocks/bkb_template_images/notifications.png',
          alt_text: 'calendar thumbnail',
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url:
              'https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png',
            alt_text: 'notifications warning icon',
          },
          {
            type: 'mrkdwn',
            text: '*Conflicts with Team Huddle: 4:15-4:30pm*',
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Propose a new time:*',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Today - 4:30-5pm*\nEveryone is available: @iris, @zelda',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: 'Choose',
          },
          value: 'click_me_123',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Tomorrow - 4-4:30pm*\nEveryone is available: @iris, @zelda',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: 'Choose',
          },
          value: 'click_me_123',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            "*Tomorrow - 6-6:30pm*\nSome people aren't available: @iris, ~@zelda~",
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: 'Choose',
          },
          value: 'click_me_123',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*<fakelink.ToMoreTimes.com|Show more times>*',
        },
      },
    ],
  });
});
