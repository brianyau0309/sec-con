# sec-con

## Description

Converting the number of seconds to string in defferent formats.
Supported formats:

- `HH:MM:SS`
- `HH:MM`
- `MM:SS`
- `HH`
- `MM`
- `SS`

## Installation

```bash
npm install sec-con
```

## Usage

```javascript
const SecCon = require("sec-con");

const anHour = new SecCon(3600);
console.log(anHour.format("H:M:S")); // 1:00:00
console.log(anHour.format("H:M")); // 1:00
console.log(anHour.format("M:S")); // 60:00
console.log(anHour.format("H")); // 1
console.log(anHour.format("H:M:S", 2)); // 01:00:00

const twoHours = new SecCon("02:00", "H:M");
console.log(twoHours.format("H:M:S")); // 2:00:00
console.log(twoHours.format("H:M")); // 2:00
console.log(twoHours.format("H:M", 2)); // 02:00
```
