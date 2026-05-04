const isLuhnValid = (idNumber: string): boolean => {
    // Remove non-digits (just in case input has spaces/dashes)
    const digits = idNumber.replace(/\D/g, '');

    let sum = 0;
    let shouldDouble = false;

    // Loop from right to left
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = Number(digits[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

export {isLuhnValid} ;