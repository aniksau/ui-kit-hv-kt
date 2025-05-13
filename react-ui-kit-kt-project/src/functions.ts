import { HvFormStatus } from "@hitachivantara/uikit-react-core";
import { FieldError } from "react-hook-form";

export const parseFieldStatus = (status: FieldError | undefined): HvFormStatus => status ? 'invalid' : 'valid';