date-interval  [![Build status](https://api.travis-ci.org/smhg/date-interval-js.png)](https://travis-ci.org/smhg/date-interval-js)
======
Algebraic operations for time intervals.

## Installation
```bash
$ npm install @smhg/date-interval
```

## Usage
```javascript
import Interval from '@smhg/date-interval';

// with ISO 8601 string
let interval1 = Interval('2015-08-03T12:00:00Z/2015-08-04T12:00:00Z');

// with 2 dates
let interval2 = Interval(new Date('2015-08-03T12:00:00Z'), new Date('2015-08-04T12:00:00Z'));
```

## API
### Interval()
#### Interval(String)
Pass an ISO 8601 time interval formatted string to create an interval.

#### Interval(Date, Date)
Pass a start and end Date object to create an interval.

### interval.toString()
Returns the interval as an ISO 8601 formatted string.

### interval.overlaps(Interval)
Returns whether both intervals overlap.

### interval.union(Interval)
Returns an array with the result of a merge of both intervals.

### interval.diff(Interval)
Returns an array with the difference of both intervals.

### interval.intersection(Interval)
Returns the interval that lies at the intersection of both intervals (if any).
