import { JSONSchemaType } from "ajv";
import { ProjectRequestDTO } from "../../../domains/express/project-request-dto";

export const requestDtoSchema: JSONSchemaType<ProjectRequestDTO> = {
  type: "object",
  properties: {
    name: { type: "string" },
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
      nullable: true,
      properties: {
        includeFolder: { type: "boolean" },
        domains: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["domains", "includeFolder"],
    },
    git: {
      type: "object",
      nullable: true,
      properties: {
        toIgnore: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["toIgnore"],
    },
    env: {
      type: "object",
      nullable: true,
      properties: {
        vars: {
          type: "object",
          additionalProperties: {
            type: "string",
          },
          required: [],
        },
      },
      required: ["vars"],
    },
    ts: {
      type: "object",
      nullable: true,
      properties: {
        useDefaultNpmPackage: { type: "boolean" },
        findTypeDependencies: { type: "boolean" },
        config: {
          type: "object",
          properties: {
            args: {
              type: "object",
              additionalProperties: {
                type: "string",
              },
              required: [],
            },
          },
          required: ["args"],
        },
      },
      required: ["useDefaultNpmPackage", "findTypeDependencies", "config"],
    },
  },
  required: ["name", "runtime"],
};
