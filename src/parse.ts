import { ParsedID } from "@/types/index.js";
import {isLuhnValid} from "@/validateLuhnSequence.js";
import {getCitizenShip, parseDOB, calculateAge, getGender} from "@/dataCollector.js";

const parseIDNumber = (idNumber: string):ParsedID => {
    if (isLuhnValid(idNumber)) {
        const dob = parseDOB(idNumber);
        const age = calculateAge(dob);
        return {
            age: 0,
            citizenship: getCitizenShip(idNumber),
            dateOfBirth: dob,
            gender: getGender(idNumber),
            isValid: true
        };
    } else {
        return {
            isValid: false,
            errors: [],
        };
    }
}