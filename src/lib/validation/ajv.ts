import Ajv from "ajv";
import { requestDtoSchema } from "./schemas/request-dto-schema";
import { ProjectRequestDTO } from "../../domains/express/project-request-dto";

const ajv = new Ajv({ allErrors: true });

const requestedDtoValidator = ajv.compile(requestDtoSchema);

export function isRequestDto(obj: unknown): obj is ProjectRequestDTO {
  return requestedDtoValidator(obj);
}
