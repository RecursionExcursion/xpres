export function generateGitIgnore(args?: string[]) {
  const ignored = ["node_modules"];
  if (args) {
    ignored.push(...args);
  }
  return ignored.join("\n");
}
