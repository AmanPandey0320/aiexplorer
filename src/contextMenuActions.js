import { FileContext } from "./fileContext";
import React,{useContext} from 'react'


const fs = window.require('fs')
export const renameFile = (path, newPath) => 
  new Promise((res, rej) => {

    fs.rename(path, newPath, (err, data) =>{
      return err
        ? rej(err)
        : res(data);}) 
  });

export const copyFile = (path, newPath) =>
  new Promise((res, rej) => {
    const readStream = fs.createReadStream(path),
    writeStream = fs.createWriteStream(newPath);
    readStream.on("error", rej);
    writeStream.on("error", rej);
    writeStream.on("finish", res);
    readStream.pipe(writeStream);
  });

export const unlinkFile = path => {
  return new Promise((res, rej) => {
    fs.unlink(path, (err, data) =>{

     return err
        ? rej(err)
        : res(data)});
       
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