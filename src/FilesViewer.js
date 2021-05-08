import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu"
import { deleteFile, unlinkFile } from "./contextMenuActions";


export const FilesViewer = ({files, onBack, onOpen, path}) => {

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
                files.map(({name, directory, size})=> {
                    return (
                        <>
                        <ContextMenuTrigger id={name+directory+size}>
                            <tr onClick={(e)=>directory && onOpen(name)}>
                                <td>{name}</td>
                                <td>{size}</td>
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