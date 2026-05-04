import { ParsedID } from "@/types/index.js";
import {isLuhnValid} from "@/validateLuhnSequence.js";
import {getCitizenShip, parseDOB, calculateAge, getGender} from "@/dataCollector.js";

const parseIDNumber = (idNumber: string): ParsedID => {
  // Check if the ID number is exactly 13 digits long
  if (!/^\d{13}$/.test(idNumber)) {
    return {
      isValid: false,
      errors: ["INVALID_LENGTH"],
    };
  }
  const errors: ("INVALID_DATE" | "INVALID_CHECKSUM" | "INVALID_LENGTH" | "INVALID_CITIZENSHIP")[] = [];

  // Validate the ID number using the Luhn algorithm
  if (!isLuhnValid(idNumber)) {
    errors.push("INVALID_CHECKSUM");
  }

  /**
   * Extract the date of birth and citizenship information from the ID number. 
   * If either of these operations fails, we will add the corresponding error to the errors array.
   * If there are any errors, we will return an InvalidParsedID object with the list of errors. 
   * If there are no errors, we will return a ValidParsedID object with the extracted information.
   */
  let dob: Date | undefined;
  try {
    dob = parseDOB(idNumber);
  } catch {
    errors.push("INVALID_DATE");
  }

  let citizenship: 'SA citizen' | 'permanent resident' | undefined;
  try {
    citizenship = getCitizenShip(idNumber);
  } catch {
    errors.push("INVALID_CITIZENSHIP");
  }

  if (errors.length > 0 || !dob || !citizenship) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    dateOfBirth: dob,
    gender: getGender(idNumber),
    citizenship,
    age: calculateAge(dob),
  };
};