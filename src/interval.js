'use strict';

import createDuration from 'date-duration';

let toDate = value => {
    if (typeof value === 'object' && typeof value.toDate === 'function') {
      return value.toDate();
    }

    if (typeof value === 'string' && value[0] !== 'P') {
      return new Date(value);
    }

    return value;
  },
  durationToDate = (value, idx, all) => {
    if (typeof value === 'string' && value[0] === 'P') {
      if (idx === 0) {
        return createDuration(value).subtractFrom(all[1]);
      } else if (idx === 1) {
        return createDuration(value).addTo(all[0]);
      }
    }

    return value;
  };

export default function createInterval () {
  if (arguments.length === 0) {
    throw new Error('Time interval requires at least one argument');
  }

  let [start, end] = (arguments.length === 1 ? arguments[0].split('/') : [arguments[0], arguments[1]])
      .map(toDate)
      .map(durationToDate)
      .map(value => { return +value; });

  const toString = () => {
      return `${(new Date(start)).toISOString()}/${(new Date(end)).toISOString()}`;
    },
    overlaps = interval => {
      return start < interval.end && interval.start < end;
    },
    union = function (interval) {
      if (overlaps(interval) || end === interval.start || interval.end === start) {
        return [createInterval(start <= interval.start ? start : interval.start, end >= interval.end ? end : interval.end)];
      }

      return [createInterval(start, end), createInterval(interval.start, interval.end)];
    },
    diff = function (interval) {
      if (!overlaps(interval)) {
          return [createInterval(start, end)];
      }

      if (interval.start <= start) {
          // start before/together
          if (end > interval.end) {
              // end inside
              return [createInterval(interval.end, end)];
          }

          // end after/together
          return [];
      }

      // start inside
      if (interval.end < end) {
          // end inside
          return [createInterval(start, interval.start), createInterval(interval.end, end)];
      }

      // end after/together
      return [createInterval(start, interval.start)];
    },
    intersection = function (interval) {
      if (!overlaps(interval)) {
        return;
      }

      if (interval.start <= start) {
        // start before/together
        if (end > interval.end) {
            // end inside
            return createInterval(start, interval.end);
        }

        // end after/together
        return createInterval(start, end);
      }

      // start inside
      if (interval.end < end) {
          // end inside
          return createInterval(interval.start, interval.end);
      }

      // end after/together
      return createInterval(interval.start, end);
    };

  return Object.freeze({
    start, end,
    toString, overlaps, union, diff, intersection
  });
}
