import { timeDifference } from './date.utils';
import { createArticleLink, cutTextWithElipsis } from './generic.utils';

describe('cut text with elipsis', () => {
  const textToTest = 'Hello world!';
  test('limit is higher than length of the text', () => {
    const result = cutTextWithElipsis(textToTest, textToTest.length + 1);
    expect(result).toBe(textToTest);
  });
  test('limit is lower than length of the text', () => {
    const result = cutTextWithElipsis(textToTest, textToTest.length - 1);
    expect(result).toBe('Hello world...');
  });
  test('limit equals the length of the text', () => {
    const result = cutTextWithElipsis(textToTest, textToTest.length);
    expect(result).toBe(textToTest);
  });
});

describe('time difference util', () => {
  // Sun Oct 02 2022 23:33:23 GMT+0000
  const timestampNow = 1664753603 * 1000;

  test('1 year difference ', () => {
    expect(timeDifference(timestampNow, '2021-10-01T19:44:11.577668')).toEqual(
      '1 year ago'
    );
  });
  test('2 years difference ', () => {
    expect(timeDifference(timestampNow, '2020-10-02T19:44:11.577668')).toEqual(
      '2 years ago'
    );
  });
  test('month difference ', () => {
    expect(timeDifference(timestampNow, '2022-09-12T19:44:11.577668')).toEqual(
      '1 month ago'
    );
  });
  test('3 months difference ', () => {
    expect(timeDifference(timestampNow, '2022-07-02T19:44:11.577668')).toEqual(
      '3 months ago'
    );
  });
  test('6 hours difference ', () => {
    expect(timeDifference(timestampNow, '2022-10-02T17:33:11.577668')).toEqual(
      '6 hours ago'
    );
  });
  test('hour difference ', () => {
    expect(timeDifference(timestampNow, '2022-10-02T22:33:11.577668')).toEqual(
      '1 hour ago'
    );
  });
  test('minute difference ', () => {
    expect(timeDifference(timestampNow, '2022-10-02T23:32:11.577668')).toEqual(
      '1 minute ago'
    );
  });
  test('50 minutes difference ', () => {
    expect(timeDifference(timestampNow, '2022-10-02T23:13:11.577668')).toEqual(
      '20 minutes ago'
    );
  });
  test('50 minutes difference ', () => {
    expect(timeDifference(timestampNow, '2022-10-02T23:33:11.577668')).toEqual(
      'Just now'
    );
  });
});

describe('article links', () => {
  const articleId = 'djij1u34821u30913i129ur9f1';

  test('if result is correct', () => {
    expect(createArticleLink(articleId)).toBe(`/articles/${articleId}`);
  });
});
