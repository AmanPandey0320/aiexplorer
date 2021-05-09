import React from 'react';
import { FileContext } from "../fileContext";
import TreeItem from '@material-ui/lab/TreeItem';
const fs = window.require('fs-extra')
const mime=window.require('mime')
const pathModule = window.require('path');

const formatSize = (size) => {
    var i = Math.floor(Math.log(size)/Math.log(1024))
    return(
      (size/Math.pow(1024,i)).toFixed(2)*1+' '+['B','kB','MB', 'GB','TB'][i]
    )
  }

 const FolderNode = (props) => {
     const {path,root} = props;
     const toggle = React.useContext(FileContext)
     const files = React.useMemo(()=>fs.readdirSync(path).map((file) => {
        const stats = fs.statSync(pathModule.join(path, file))
        return {
          name: file,
           size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
           directory: stats.isDirectory(),
           type:mime.getType(file)
        }
      })
      .sort((a,b)=>{
        if(a.directory === b.directory){
          return a.name.localeCompare(b.name)
        }
        return a.directory ? -1:1
      })
      ,[path,toggle])
     return ( 
         <>
         {
            files.map(({name, directory, size,type},index) => {
                if(directory){
                    return(
                        <TreeItem key={`${root}${index}`} nodeId={`${root}${index}`} label={name}>
                            <FolderNode path={pathModule.join(path,name)}/>
                        </TreeItem>
                    )
                }else{
                    return <TreeItem key={`${root}${index}`} nodeId={`${root}${index}`} label={name}/>
                }
                // return <TreeItem key={`${name}${index}`} nodeId={`${name}${index}`} label={name}/>
            })
         }
         </>
    );
 }
  
 export default FolderNode;