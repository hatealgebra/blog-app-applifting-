import { expect } from '@jest/globals';
import server from '@mocks/server';
import { rest } from 'msw';
import { BASE_API_URL } from '@services/services.config';

import {
  clearDataAPI,
  createArticleLink,
  cutTextWithElipsis,
} from './generic.utils';
import { getDate, timeDifference } from './date.utils';

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

  test('wrong input', () => {
    expect(timeDifference(timestampNow, '2023-10-01T19:44:11.577668')).toEqual(
      '-'
    );
  });

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
  test('4 days ago ', () => {
    expect(timeDifference(1664983991577, '2022-10-01T17:33:11.577668')).toEqual(
      '4 days ago'
    );
  });
  test('more then 24 hours ', () => {
    expect(timeDifference(timestampNow, '2022-10-01T17:33:11.577668')).toEqual(
      'Yesterday'
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

describe('getDate test suite', () => {
  test('undefined date', () => {
    const undefinedDate = getDate(undefined);
    expect(undefinedDate).toBe('Unknown date');
  });

  test('invalid date', () => {
    const unknowDate = getDate('qeqweqweqe');
    expect(unknowDate).toBe('Unknown date');
  });

  test('valid date one', () => {
    const specificDate = getDate('2023-08-15T18:01:56.24026');
    expect(specificDate).toBe('08/15/23');
  });

  test('valid date two', () => {
    const specificDate = getDate('2022-10-02T23:13:11.577668');
    expect(specificDate).toBe('10/02/22');
  });
});

describe('clear data api test suite', () => {
  test('return completed', async () => {
    const result = await clearDataAPI('12345');
    expect(result).toBe('Success');
  });

  test('when there are no articles', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/articles`, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ items: [] }));
      })
    );
    const result = await clearDataAPI('12345');
    expect(result).toBe('Array is empty');
  });

  test('delete Article error', async () => {
    server.use(
      rest.delete(`${BASE_API_URL}/articles:articleId`, (req, res, ctx) => {
        res(ctx.status(404), ctx.json({ message: 'Article not found' }));
      })
    );

    const result = await clearDataAPI('12345');
    expect(result).toBe('Success');
  });
});

describe('article links', () => {
  const articleId = 'djij1u34821u30913i129ur9f1';

  test('if result is correct', () => {
    expect(createArticleLink(articleId)).toBe(`/articles/${articleId}`);
  });
});
