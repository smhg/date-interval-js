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

let interval = Interval('2015-08-03T12:00:00Z/2015-08-04T12:00:00Z');
```

## API
### Interval()
Pass a string in ISO 8601 interval format or a start and end Date object to create a duration.

### interval.toString()
### interval.overlaps()
### interval.union()
### interval.intersection()
### interval.diff()