import { projectFactory } from "./lib/starter-factory/project-factory";
import { RequestDTO } from "./requestDTO";

export const expressService = {
  async createExpressProject(request: RequestDTO) {
    return await projectFactory(request);
  },
};
