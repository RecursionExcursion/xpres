type AppOptions = {
  ts: {
    configType: "default" | "custom" | "slim";
    config: string;
    resolveTypeDependencies: boolean;
  };

  src: {
    srcDir: boolean;
    domains: {
      [name: string]: {
        router: boolean;
        controller: boolean;
      };
    };

    middleware: {
      globalErrorHandler: boolean;
    };
    miscFiles: { [name: string]: string };
  };

  node: {
    dependencies: string[];
    devDependencies: string[];
    scripts: { [key: string]: string };
  };

  gitignore: boolean;
};

export const options: AppOptions = {
  node: {
    dependencies: [],
    devDependencies: [],
    scripts: {},
  },
  ts: {
    configType: "default",
    config: "",
    resolveTypeDependencies: true,
  },
  src: {
    srcDir: false,
    domains: {},
    middleware: {
      globalErrorHandler: false,
    },
    miscFiles: {},
  },
  gitignore: true,
};
