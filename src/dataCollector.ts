const getCitizenShip = (
    idNumber: string
): 'SA citizen' | 'permanent resident' => {
    const digit = idNumber[10];

    if (digit === "0") return "SA citizen";
    if (digit === "1") return "permanent resident";

    throw new Error("INVALID_CITIZENSHIP");
};

export { getCitizenShip };