import Ajv, { JSONSchemaType } from "ajv";
import { RequestDTO } from "../../domains/express/requestDTO";

const ajv = new Ajv({ allErrors: true });

export const schema: JSONSchemaType<RequestDTO> = {
  type: "object",
  properties: {
    runtime: { type: "string" },
    packageJson: {
      type: "object",
      properties: {
        moduleType: { type: "string" },
        dependencies: {
          type: "array",
          items: {
            type: "string",
          },
        },
        devDependencies: {
          type: "array",
          items: {
            type: "string",
          },
        },
        scripts: {
          type: "object",
          additionalProperties: {
            type: "string",
          },
          required: [],
        },
      },
      required: ["moduleType", "dependencies", "devDependencies", "scripts"],
    },
    src: {
      type: "object",
      properties: {
        use: { type: "boolean" },
        includeFolder: { type: "boolean" },
        domains: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["domains", "includeFolder", "use"],
    },
    git: {
      type: "object",
      properties: {
        ignore: { type: "boolean" },
        toIgnore: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["ignore", "toIgnore"],
    },
    env: {
      type: "object",
      properties: {
        use: { type: "boolean" },
        vars: {
          type: "object",
          additionalProperties: {
            type: "string",
          },
          required: [],
        },
      },
      required: ["use", "vars"],
    },
    ts: {
      type: "object",
      properties: {
        use: { type: "boolean" },
        useDefaultNpmPackage: { type: "boolean" },
        findTypeDependencies: { type: "boolean" },
        config: {
          type: "object",
          properties: {
            use: { type: "boolean" },
            args: {
              type: "object",
              additionalProperties: {
                type: "string",
              },
              required: [],
            },
          },
          required: ["use", "args"],
        },
      },
      required: [
        "use",
        "useDefaultNpmPackage",
        "findTypeDependencies",
        "config",
      ],
    },
  },
  required: ["packageJson", "src", "git", "env", "ts"],
};

// ajv.compile();
