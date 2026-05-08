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

### Lightweight Validation and Formatting

If you just need basic checks or formatting without full parsing:

```ts
import { isValidSAID, formatSAID, sanitizeSAID } from "za-id-utils";

// Check validity
if (isValidSAID("9001015009087")) {
  // do something
}

// Format to YYMMDD GGGG CCZ standard format
console.log(formatSAID("9001015009087")); 
// "900101 5009 087"

// Sanitize (remove non-digits)
console.log(sanitizeSAID("900101-5009-087"));
// "9001015009087"
```

### Zod Integration

If you use [Zod](https://zod.dev/) for schema validation, you can use the built-in South African ID validator:

```ts
import { z } from "zod";
import { zSAID } from "za-id-utils/zod";

const schema = z.object({
  id: zSAID("Custom error message optional"),
});

// Validates and ensures it's a valid ID
schema.parse({ id: "9001015009087" });
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

### `isValidSAID(idNumber: string): boolean`
Quickly checks if a string is a valid SA ID number. Automatically sanitizes input first.

### `formatSAID(idNumber: string): string`
Formats an ID number to standard spacing: `"YYMMDD GGGG CCZ"`.

### `sanitizeSAID(idNumber: string): string`
Strips out any non-digit characters from the given string.

---

## License

MIT
