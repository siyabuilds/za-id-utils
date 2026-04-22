interface ParsedID {
    isValid: boolean;
    dateOfBirth: Date;
    gender: 'male' | 'female';
    citizenship: 'SA citizen' | 'permanent resident';
    age: number;
}

export type { ParsedID };