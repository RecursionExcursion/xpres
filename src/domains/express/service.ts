import { VirtualFileSystem } from "../../lib/vfs";
import { expressStarterFactory } from "./lib/express-starter";

import { packageJsonTemplate } from "./lib/templates/node/packageJson";

export const expressService = {
  createExpressStarter() {
    const starter = expressStarterFactory({
      dependencies: ["express"],
      devDependencies: ["typescript"],
      packageJson: packageJsonTemplate,
      code: "",
      misc: {},
    });

    return new VirtualFileSystem("/app", starter);
  },
};
