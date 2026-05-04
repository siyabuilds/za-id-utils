const getCitizenShip = (
    idNumber: string
): 'SA citizen' | 'permanent resident' => {
    const digit = idNumber[10];

    if (digit === "0") return "SA citizen";
    if (digit === "1") return "permanent resident";

    throw new Error("INVALID_CITIZENSHIP");
};

const dobRegex = {
    month31: /^(0[13578]|1[02])(0[1-9]|[12][0-9]|3[01])$/,
    month30: /^(0[469]|11)(0[1-9]|[12][0-9]|30)$/,
    february: /^(02)(0[1-9]|1[0-9]|2[0-8])$/,
    leapYearFeb: /^(02)29$/,
};

const parseDOB = (idNumber: string): Date => {
    const yy = Number(idNumber.slice(0, 2));
    const mmdd = idNumber.slice(2, 6);

    // Century year logic
    const currentYear = new Date().getFullYear() % 100;
    const fullYear = yy <= currentYear ? 2000 + yy : 1900 + yy;

    // Leap year logic
    const isLeapYear =
        (fullYear % 4 === 0 && fullYear % 100 !== 0) ||
        fullYear % 400 === 0;

    // Validate using regex rules
    const isValidDate =
        dobRegex.month31.test(mmdd) ||
        dobRegex.month30.test(mmdd) ||
        dobRegex.february.test(mmdd) ||
        (isLeapYear && dobRegex.leapYearFeb.test(mmdd));

    if (!isValidDate) {
        throw new Error("INVALID_DATE");
    }

    const month = Number(mmdd.slice(0, 2)) - 1;
    const day = Number(mmdd.slice(2, 4));

    return new Date(fullYear, month, day);
};

const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();

    let age = today.getFullYear() - dateOfBirth.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > dateOfBirth.getMonth() ||
        (today.getMonth() === dateOfBirth.getMonth() &&
            today.getDate() >= dateOfBirth.getDate());

    if (!hasHadBirthdayThisYear) {
        age--;
    }

    return age;
};

export { getCitizenShip, parseDOB, calculateAge };