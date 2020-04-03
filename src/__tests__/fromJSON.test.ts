import fromJSON, {
  fromMultilineMarkdown,
  fromInlineMarkdown,
} from '../fromJSON';

describe('fromJSON', () => {
  test('Simple section with markdown', () => {
    expect(
      fromJSON({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            "*:one: Use the `/task` command*. Type `/task` followed by a short description of your tasks and I'll ask for a due date (if applicable). Try it out by using the `/task` command in this channel.",
        },
      })
    ).toEqual({
      type: 'section',
      props: {},
      children: [
        {
          type: 'mrkdwn',
          props: {},
          children: [
            {
              type: 'b',
              props: {},
              children: [
                { type: 'emoji', props: {}, children: ['one'] },
                ' Use the ',
                { type: 'code', props: {}, children: ['/task'] },
                ' command',
              ],
            },
            '. Type ',
            { type: 'code', props: {}, children: ['/task'] },
            " followed by a short description of your tasks and I'll ask for a due date (if applicable). Try it out by using the ",
            { type: 'code', props: {}, children: ['/task'] },
            ' command in this channel.',
          ],
        },
      ],
    });
  });
});

describe('fromMultilineMarkdown', () => {
  test('Plain text', () => {
    expect(fromMultilineMarkdown('This is an ordinary plain text')).toEqual([
      'This is an ordinary plain text',
    ]);
  });

  test('Code blocks', () => {
    expect(
      fromMultilineMarkdown(`
\`\`\`
code block
multi-line
\`\`\`
`)
    ).toEqual([
      '\n',
      {
        type: 'pre',
        props: {},
        children: [`code block\nmulti-line`],
      },
    ]);

    expect(
      fromMultilineMarkdown(`
\`\`\`code block
multi-line\`\`\`
`)
    ).toEqual([
      '\n',
      {
        type: 'pre',
        props: {},
        children: [`code block\nmulti-line`],
      },
    ]);

    expect(
      fromMultilineMarkdown(`
inline won't work \`\`\`code block\`\`\`
`)
    ).toEqual(["\ninline won't work ```code block```\n"]);

    expect(
      fromMultilineMarkdown(`
\`\`\`

code block
with new lines

\`\`\`
`)
    ).toEqual([
      '\n',
      {
        type: 'pre',
        props: {},
        children: [`\ncode block\nwith new lines\n`],
      },
    ]);

    expect(
      fromMultilineMarkdown(`
Multiple code blocks
\`\`\`
code block 1
\`\`\`
And another
\`\`\`
code block 2
\`\`\`
`)
    ).toEqual([
      '\nMultiple code blocks\n',
      {
        type: 'pre',
        props: {},
        children: [`code block 1`],
      },
      'And another\n',
      {
        type: 'pre',
        props: {},
        children: [`code block 2`],
      },
    ]);
  });

  test('blockquote', () => {
    expect(
      fromMultilineMarkdown(`
>block quote

> with prefix spaces

>multiline
>block quote
`)
    ).toEqual([
      '\n',
      {
        type: 'blockquote',
        props: {},
        children: ['block quote'],
      },
      '\n',
      {
        type: 'blockquote',
        props: {},
        children: ['with prefix spaces'],
      },
      '\n',
      {
        type: 'blockquote',
        props: {},
        children: ['multiline\nblock quote'],
      },
    ]);

    expect(
      fromMultilineMarkdown(`
> with inline markdown: *bold*, _italic and ~strike~_
> and also \`code block\`
`)
    ).toEqual([
      '\n',
      {
        type: 'blockquote',
        props: {},
        children: [
          'with inline markdown: ',
          {
            type: 'b',
            props: {},
            children: ['bold'],
          },
          ', ',
          {
            type: 'i',
            props: {},
            children: [
              'italic and ',
              {
                type: 's',
                props: {},
                children: ['strike'],
              },
            ],
          },
          '\nand also ',
          { type: 'code', props: {}, children: ['code block'] },
        ],
      },
    ]);
  });
});

describe('fromInlineMarkdown', () => {
  test('Plain text', () => {
    expect(fromInlineMarkdown('This is an ordinary plain text')).toEqual([
      'This is an ordinary plain text',
    ]);
  });

  test('With one level of special tags', () => {
    expect(
      fromInlineMarkdown(
        'This is *bold* and this is _italic_, also more *bold*'
      )
    ).toEqual([
      'This is ',
      { type: 'b', props: {}, children: ['bold'] },
      ' and this is ',
      { type: 'i', props: {}, children: ['italic'] },
      ', also more ',
      { type: 'b', props: {}, children: ['bold'] },
    ]);
  });

  test('With multi-level of special tags', () => {
    expect(
      fromInlineMarkdown(
        'This is *bold and _italic_, ~strike and also `code`~*.'
      )
    ).toEqual([
      'This is ',
      {
        type: 'b',
        props: {},
        children: [
          'bold and ',
          { type: 'i', props: {}, children: ['italic'] },
          ', ',
          {
            type: 's',
            props: {},
            children: [
              'strike and also ',
              { type: 'code', props: {}, children: ['code'] },
            ],
          },
        ],
      },
      '.',
    ]);
  });

  test('With special tags in plain text', () => {
    expect(
      fromInlineMarkdown(
        "Here is a * sign, but it's not paired, _italic_ follows a single _ sign."
      )
    ).toEqual([
      "Here is a * sign, but it's not paired, ",
      { type: 'i', props: {}, children: ['italic'] },
      ' follows a single _ sign.',
    ]);
  });
});
