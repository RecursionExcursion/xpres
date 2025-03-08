import { createFsFromVolume, fs, IFs, vol } from "memfs";

export type VfsData = {
  vfs: IFs;
  root: string;
};

// Record<vFilePath, fileContent>
export type PojoFs = Record<string, string>;
export class VirtualFileSystem {
  #root: string;
  #vfs: IFs;

  constructor(rootDir: string, pojo: PojoFs = {}) {
    this.#root = rootDir;
    vol.fromJSON(pojo, this.#root);
    this.#vfs = createFsFromVolume(vol);
  }

  get root(): string {
    return this.#root;
  }

  get vfs(): IFs {
    return this.#vfs;
  }

  writeFile(path: string, content: string) {
    this.#vfs.writeFileSync(path, content);
  }

  writeFiles(...args: { path: string; content: string }[]) {
    args.forEach((arg) => this.writeFile(arg.path, arg.path));
  }

  isDir(dir: string) {
    return this.#vfs.statSync(dir).isDirectory();
  }

  exists(path: string) {
    return this.#vfs.existsSync(path);
  }

  readDir(dir: string) {
    return this.#vfs.readdirSync(dir);
  }

  streamFile(path: string) {
    return this.#vfs.createReadStream(path);
  }
}
