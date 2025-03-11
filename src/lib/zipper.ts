import archiver, { Archiver } from "archiver";
import { Response } from "express";

export function zipFileMap(fileMap: Map<string, string>, res: Response) {
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  initArchiver(archive);
  archive.pipe(res);
  zipMap(archive, fileMap);
  archive.finalize();
}
function zipMap(archive: Archiver, files: Map<string, string>) {
  for (const [filePath, content] of files.entries()) {
    archive.append(content, { name: filePath });
  }
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
