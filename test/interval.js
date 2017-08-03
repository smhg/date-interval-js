'use strict';

import assert from 'assert';
import createInterval from '../src/interval';

describe('interval', () => {
  describe('#()', () => {
    it('should require one parameter', (done) => {
      try {
        createInterval();
        done(new Error('No parameters does not throw an error'));
      } catch (e) {
        assert.equal(e.message, 'Time interval requires at least one valid argument');
        done();
      }
    });

    it('should require a valid first parameter', (done) => {
      try {
        createInterval(undefined);
        done(new Error('Invalid first parameter does not throw an error'));
      } catch (e) {
        assert.equal(e.message, 'Time interval requires at least one valid argument');
        done();
      }
    });

    it('should accept an ISO 8601 start/end string', () => {
      let iso = '2015-08-03T12:00:00.000Z/2015-08-04T12:00:00.000Z';

      assert.doesNotThrow(() => { createInterval(iso); });
    });

    it('should accept an ISO 8601 start/duration string', () => {
      let iso = '2015-08-03T12:00:00.000Z/P1D';

      assert.doesNotThrow(() => { createInterval(iso); });
    });

    it('should accept an ISO 8601 duration/end string', () => {
      let iso = 'P1D/2015-08-04T12:00:00.000Z';

      assert.doesNotThrow(() => { createInterval(iso); });
    });

    it('should accept a start and end date', () => {
      let start = new Date();
      let end = new Date();

      end.setUTCDate(end.getUTCDate() + 1);

      assert.doesNotThrow(() => { createInterval(start, end); });
    });
  });

  describe('#toString()', () => {
    it('should return to string', () => {
      let iso = '2015-08-03T12:00:00.000Z/2015-08-04T12:00:00.000Z';

      assert.equal(createInterval(iso).toString(), iso);
    });
  });

  describe('#overlaps()', () => {
    it('should detect overlapping intervals', () => {
      let iso1 = '2015-08-03T12:00:00.000Z/2015-08-04T12:00:00.000Z';
      let iso2 = '2015-08-04T00:00:00.000Z/2015-08-05T00:00:00.000Z';
      let iso3 = '2015-08-06T12:00:00.000Z/2015-08-07T12:00:00.000Z';
      let iso4 = '2015-08-07T12:00:00.000Z/2015-08-10T12:00:00.000Z';

      assert(createInterval(iso1).overlaps(createInterval(iso2)));
      assert(!createInterval(iso1).overlaps(createInterval(iso3)));
      assert(!createInterval(iso3).overlaps(createInterval(iso4)));
      assert(!createInterval(iso4).overlaps(createInterval(iso3)));

      let iso5 = '2015-10-25T02:00:00+01:00/2015-10-25T03:00:00+01:00';
      let iso6 = '2015-10-25T01:00:00+02:00/2015-10-25T02:00:00+02:00';
      let iso7 = '2015-10-25T01:00:00+02:00/2015-10-25T03:00:00+01:00';

      assert(!createInterval(iso5).overlaps(createInterval(iso6)));
      assert(createInterval(iso5).overlaps(createInterval(iso7)));
    });
  });

  describe('#union()', () => {
    it('should create union arrays', () => {
      let iso1 = '2015-08-03T12:00:00.000Z/2015-08-04T12:00:00.000Z';
      let iso2 = '2015-08-04T00:00:00.000Z/2015-08-05T12:00:00.000Z';

      assert(createInterval(iso1).union(createInterval(iso2)).length === 1);

      let iso3 = '2015-08-03T12:00:00.000Z/2015-08-04T12:00:00.000Z';
      let iso4 = '2015-08-04T18:00:00.000Z/2015-08-05T12:00:00.000Z';
      let iso5 = '2015-08-04T12:00:00.000Z/2015-08-05T12:00:00.000Z';

      assert(createInterval(iso3).union(createInterval(iso4)).length === 2);
      assert(createInterval(iso3).union(createInterval(iso5)).length === 1);
    });
  });

  describe('#diff()', () => {
    it('should create difference arrays', () => {
      let iso1 = '2015-08-03T12:00:00.000Z/2015-08-04T12:00:00.000Z';
      let iso2 = '2015-08-04T00:00:00.000Z/2015-08-05T12:00:00.000Z';
      let diff1 = createInterval(iso1).diff(createInterval(iso2));

      assert(diff1.length === 1);
      assert.equal(diff1[0].toString(), '2015-08-03T12:00:00.000Z/2015-08-04T00:00:00.000Z');

      let iso3 = '2015-08-03T12:00:00.000Z/2015-08-05T12:00:00.000Z';
      let iso4 = '2015-08-04T00:00:00.000Z/2015-08-05T00:00:00.000Z';
      let diff2 = createInterval(iso3).diff(createInterval(iso4));

      assert(diff2.length === 2);
      assert.equal(diff2[1].toString(), '2015-08-05T00:00:00.000Z/2015-08-05T12:00:00.000Z');
    });
  });

  describe('#intersection()', () => {
    it('should create intersection interval', () => {
      let iso1 = '2015-08-03T12:00:00.000Z/2015-08-04T12:00:00.000Z';
      let iso2 = '2015-08-04T00:00:00.000Z/2015-08-05T12:00:00.000Z';
      let intersection1 = createInterval(iso1).intersection(createInterval(iso2));

      assert.equal(intersection1.toString(), '2015-08-04T00:00:00.000Z/2015-08-04T12:00:00.000Z');

      let iso3 = '2015-08-03T12:00:00.000Z/2015-08-05T12:00:00.000Z';
      let iso4 = '2015-08-04T00:00:00.000Z/2015-08-05T00:00:00.000Z';
      let intersection2 = createInterval(iso3).intersection(createInterval(iso4));

      assert.equal(intersection2.toString(), '2015-08-04T00:00:00.000Z/2015-08-05T00:00:00.000Z');

      let iso5 = '2015-08-03T12:00:00.000Z/2015-08-05T12:00:00.000Z';
      let iso6 = '2015-08-07T00:00:00.000Z/2015-08-10T00:00:00.000Z';
      let intersection3 = createInterval(iso5).intersection(createInterval(iso6));

      assert.equal(typeof intersection3, 'undefined');
    });
  });
});
