interface ValidParsedID {
    isValid: boolean;
    dateOfBirth: Date;
    gender: 'male' | 'female';
    citizenship: 'SA citizen' | 'permanent resident';
    age: number;
}

interface InvalidParsedID {
    isValid: false;
    errors: ("INVALID_DATE" | "INVALID_CHECKSUM" | "INVALID_LENGTH" | "INVALID_CITIZENSHIP")[]
}

export type ParsedID = ValidParsedID | InvalidParsedID;