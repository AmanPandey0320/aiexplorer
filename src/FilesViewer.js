import {useContext} from 'react'
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu"
import { deleteFile, unlinkFile ,copyFile} from "./contextMenuActions";
import { FileContext } from "./fileContext";
const fs = window.require('fs')
const electron = window.require('electron');
const shell = electron.shell;




//export const FilesViewer = ({files,path, onBack, onOpen}) => {
 




export const FilesViewer = ({files, onBack, onOpen, path}) => {
      const {pathe,setPath} = useContext(FileContext);
      console.log(shell);
      const openFile=(nome)=>{
         try{ shell.openPath(path+'/'+ nome);}
         catch(err){
             console.log(err);
         };
       }
  
    const handleAction = (action,name) => {
        switch(action){
            case 'copy':{
                let str=`${path}\\${name}`
                setPath(str)
                console.log(pathe);
                alert(action)
                break;
            }
            case 'move':{
                alert(action)
                break;
            }
            case 'rename':{
                alert(action)
                break;
            }
            case 'delete':{
                alert(action)
                var z = `${path}`+"\\"+`${name}`
                alert(z)
                let joined  = z.split('"').join('')
                alert('join',joined)
                unlinkFile(joined)
                break;
            }
            case 'paste':{
                alert(action)
               // copyFile(pathe,path);
                // alert("copied");
                fs.copyFile(pathe,path,(err)=>{console.log(err);});
            }
            default:{
                alert(action)
                break;
            }
        }
    }


    return (<table>
        <tbody>
            <tr onClick={onBack}>
                <td>Back</td>
            </tr>
            {
                files.map(({name, directory, size,type})=> {
                    return (

//                         <tr onClick={()=>directory?onOpen(name):openFile(name)}>
//                             <td>{name}</td>
//                             <td>{size}</td>
//                            { !directory && <td>{type}</td>}
//                         </tr>

                        <>
                        <ContextMenuTrigger id={name+directory+size}>
                            <tr onClick={()=>directory?onOpen(name):openFile(name)}>
                                <td>{name}</td>
                                <td>{size}</td>
                                { !directory && <td>{type}</td>}
                            </tr>
                        </ContextMenuTrigger>
                        <ContextMenu id={name+directory+size}>
                            <MenuItem onClick={()=>{handleAction('copy',name)}}>
                                Copy
                            </MenuItem>
                            <MenuItem onClick={()=>handleAction('move',name)}>
                                Move
                            </MenuItem>
                            <MenuItem onClick={()=>handleAction('rename',name)}>
                                Rename
                            </MenuItem>
                            <MenuItem onClick={()=>handleAction('delete',name)}>
                                Delete
                            </MenuItem>
                           { pathe!='' && <MenuItem onClick={()=>handleAction('paste',name)}>
                                Paste
                            </MenuItem>}
                        </ContextMenu>
                        </>

                    )
                })
            }
        </tbody>
    </table>)
}