export function generateEnvFile(envVars: { [key: string]: string } = {}) {
  return Object.entries(envVars)
    .map((envVar) => `${envVar[0]} = ${envVar[1]}`)
    .join("\n");
}
