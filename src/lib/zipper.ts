import archiver, { Archiver } from "archiver";
import { Response } from "express";
import path from "path";
import { VirtualFileSystem } from "./vfs";

export async function zip(vfs: VirtualFileSystem, res: Response) {
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  initArchiver(archive);
  archive.pipe(res);
  zipVfs(vfs, archive, vfs.root, "");
  archive.finalize();
}

function initArchiver(archive: Archiver) {
  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      console.log({ err });
    } else {
      throw err;
    }
  });

  archive.on("error", function (err) {
    throw err;
  });
}

function zipVfs(
  vfs: VirtualFileSystem,
  archive: Archiver,
  dir: string,
  zipDir?: string
) {
  if (!vfs.exists(dir)) return;

  const contents = vfs.readDir(dir);

  contents.forEach((c) => {
    const fileName = c.toString();

    const src = path.join(dir, fileName);
    const zipPath = zipDir ? path.join(zipDir, fileName) : fileName;

    if (vfs.isDir(src)) {
      zipVfs(vfs, archive, src, zipPath);
    } else {
      const fsStream = vfs.streamFile(src);
      archive.append(fsStream, { name: zipPath });
    }
  });
}
