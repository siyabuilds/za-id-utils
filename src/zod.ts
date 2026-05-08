import { z } from "zod";
import { isValidSAID } from "./utils.js";

// This function creates a Zod schema for validating South African ID numbers.
export const zSAID = (message?: string) => {
  return z.string().refine(isValidSAID, {
    message: message ?? "Invalid South African ID number",
  });
};
