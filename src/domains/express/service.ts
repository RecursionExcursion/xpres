import { projectFactory } from "./lib/starter-factory/project-factory";
import { ProjectRequestDTO } from "./project-request-dto";

export const expressService = {
  async createExpressStarterProject(request: ProjectRequestDTO) {
    return await projectFactory(request);
  },
};
