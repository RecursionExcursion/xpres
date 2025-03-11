import Ajv from "ajv";
import { requestDtoSchema } from "./schemas/request-dto-schema";
import { RequestDTO } from "../../domains/express/requestDTO";

const ajv = new Ajv({ allErrors: true });

const requestedDtoValidator = ajv.compile(requestDtoSchema);

export function isRequestDto(obj: unknown): obj is RequestDTO {
  return requestedDtoValidator(obj);
}
