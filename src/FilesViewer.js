
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu"
import { deleteFile, unlinkFile } from "./contextMenuActions";
const electron = window.require('electron');
const shell = electron.shell;




export const FilesViewer = ({files,path, onBack, onOpen}) => {
 




export const FilesViewer = ({files, onBack, onOpen, path}) => {
      const openFile=(nome)=>{
         try{ shell.openPath(path+'/'+ nome);}
         catch(err){
             console.log(err);
         };
       }
  
    const handleAction = (action,name) => {
        switch(action){
            case 'copy':{
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
                        </ContextMenu>
                        </>

                    )
                })
            }
        </tbody>
    </table>)
}