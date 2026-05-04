# za-id-utils

Utilities for validating and parsing South African ID numbers.

## Features

* Validate SA ID numbers using Luhn checksum
* Parse date of birth (with leap year handling)
* Extract gender
* Detect citizenship status
* Calculate age
* Type-safe results with clear error handling

---

## Install

```bash
npm install za-id-utils
```

---

## Usage

```ts
import { parseSAID } from "za-id-utils";

const result = parseSAID("9001015009087");

if (result.isValid) {
  console.log("DOB:", result.dateOfBirth);
  console.log("Age:", result.age);
  console.log("Gender:", result.gender);
  console.log("Citizenship:", result.citizenship);
} else {
  console.log("Errors:", result.errors);
}
```

---

## How it works

South African ID numbers encode:

* **YYMMDD** → Date of birth
* **SSSS** → Gender (>= 5000 = male, < 5000 = female)
* **C** → Citizenship (0 = SA citizen, 1 = permanent resident)
* Final digit → Luhn checksum

---

##️ Errors

Possible error values:

* `INVALID_LENGTH`
* `INVALID_DATE`
* `INVALID_CHECKSUM`
* `INVALID_CITIZENSHIP`

---

## API

### `parseSAID(idNumber: string): ParsedID`

Returns:

```ts
type ParsedID =
  | {
      isValid: true;
      dateOfBirth: Date;
      gender: "male" | "female";
      citizenship: "SA citizen" | "permanent resident";
      age: number;
    }
  | {
      isValid: false;
      errors: string[];
    };
```

---

## License

MIT
