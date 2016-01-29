export const fixtures = {
  dummy: {
    name: 'Blah',
    pattern: /foo (.*)/,
    properties: [
      { name: 'keyword' }
    ],
    invoke () {
      return { a: 'b' };
    }
  },

  dummyJSON: {
    name: 'Blah',
    intent: 'blah',
    properties: [
      { name: 'keyword' }
    ]
  }
};
