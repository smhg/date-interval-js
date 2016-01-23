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
Pass a string in ISO 8601 interval format to create a duration.

#### Interval(Date, Date)
Pass a start and end Date object to create a duration.

### interval.toString()
Return interval as an ISO 8601 formatted string.

### interval.overlaps()
### interval.union()
### interval.intersection()
### interval.diff()