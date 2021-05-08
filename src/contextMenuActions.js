const fs = window.require('fs')
export const renameFile = (path, newPath) => 
  new Promise((res, rej) => {
    fs.rename(path, newPath, (err, data) =>
      err
        ? rej(err)
        : res(data));
  });

export const copyFile = (path, newPath, flags) =>
  new Promise((res, rej) => {
    const readStream = fs.createReadStream(path),
    writeStream = fs.createWriteStream(newPath, {flags});
    readStream.on("error", rej);
    writeStream.on("error", rej);
    writeStream.on("finish", res);
    readStream.pipe(writeStream);
  });

export const unlinkFile = path => {
  return new Promise((res, rej) => {
    fs.unlink(path, (err, data) =>
      err
        ? rej(err)
        : res(data));
  });
}

export const moveFile = (path, newPath, flags) =>
    renameFile(path, newPath)
    .catch(e => {
      if (e.code !== "EXDEV")
        throw new e;

      else
        return copyFile(path, newPath, flags)
          .then(() => unlinkFile(path));
    });