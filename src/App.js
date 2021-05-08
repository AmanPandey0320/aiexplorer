import './App.css';
import React, {useState, useMemo,useContext,useEffect} from 'react';
import { FilesViewer } from './FilesViewer';
import { searchFilter } from './search';
import { FileContext } from "./fileContext";



const fs = window.require('fs-extra')
const mime=window.require('mime')



const pathModule = window.require('path')
const {app} = window.require('@electron/remote');


const formatSize = (size) => {
  var i = Math.floor(Math.log(size)/Math.log(1024))
  return(
    (size/Math.pow(1024,i)).toFixed(2)*1+' '+['B','kB','MB', 'GB','TB'][i]
  )
}

function App() {
  const [path, setPath] = useState(app.getAppPath());
  const {togle} =  useContext(FileContext);
 
  const files = useMemo(()=>fs.readdirSync(path).map((file) => {
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
  ,[path,togle])

  const onBack = () => {
    setPath(pathModule.dirname(path))
  }
  const onOpen = (folder) => {
    setPath(pathModule.join(path, folder));
  }

  const [searchString, setSearchString] = useState('');

  const filteredFiles = files.filter(s=>searchFilter(s.name,searchString))
  

  return (
    

    
    <div className="App">
      {path}
      <input value={searchString} onChange={e => setSearchString(e.target.value)}/>

      <FilesViewer files={filteredFiles} path={path} onBack={onBack} onOpen={onOpen}/>

    </div>
   
  );
}

export default App;
