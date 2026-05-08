import parseIDNumber from "./parse.js";
import { getCitizenShip, calculateAge, parseDOB, getGender} from "./dataCollector.js";
import { formatSAID, sanitizeSAID, isValidSAID } from "./utils.js";

export {
    parseIDNumber as parseSAID,
    getCitizenShip,
    parseDOB,
    calculateAge,
    getGender,
    formatSAID,
    sanitizeSAID,
    isValidSAID,
};