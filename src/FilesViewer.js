import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu"
import { deleteFile, unlinkFile } from "./contextMenuActions";
import { FcFolder,FcFile } from "react-icons/fc";
import { VscJson } from 'react-icons/vsc';
import { SiJavascript } from 'react-icons/si';
import { AiFillFileMarkdown } from 'react-icons/ai'
import Icons from './styles/icons'
import Grid from '@material-ui/core/Grid';
import useStyles from './styles/fileView.style';
import Paper from '@material-ui/core/Paper'
const electron = window.require('electron');
const shell = electron.shell;
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

    const classes = useStyles();

    const renderIconSwitch = (type) => {

        if(type === null) return Icons.file;

        const sup_type = type.split('/')[0];
        const sub_type = type.split('/')[1];

        if(sup_type === 'application' ){

            switch (sub_type) {
                case "javascript": return Icons.js
                case "json": return Icons.json
                case "vnd.openxmlformats-officedocument.wordprocessingml.document" : return Icons.docx
            
                default: return Icons.file
            }

        }else if( sup_type === 'audio' ){
            return Icons.audio
        }else if( sup_type === 'image' ){
            return Icons.img

        }else if( sup_type === 'text' ){
            switch (sub_type) {
                case "markdown" : return Icons.md
                case "x-c": return Icons.cpp
            
                default:return Icons.text
            }

        }else if( sup_type === 'video' ){
            return Icons.video
        }else{
            return Icons.file
        }
        
    }


    return (
        <div className={classes.main}> 
            <Grid  container xs={12}>
                    {
                        files.map(({name, directory, size,type})=> {
                            return (

        //                         <tr onClick={()=>directory?onOpen(name):openFile(name)}>
        //                             <td>{name}</td>
        //                             <td>{size}</td>
        //                            { !directory && <td>{type}</td>}
        //                         </tr>

                                <Grid className={classes.item}>
                                <ContextMenuTrigger id={name+directory+size}>
                                    <div onClick={()=>directory?onOpen(name):openFile(name)} item xs={3} >
                                        <div className={classes.folderic}>
                                            {directory && Icons.folder}
                                            {!directory && <div>
                                                {
                                                    renderIconSwitch(type)
                                                }
                                            </div> }
                                        </div>
                                        <div className={classes.name} >{name}</div>
                                    
                                        
                                    </div>
                                </ContextMenuTrigger>
                                <ContextMenu id={name+directory+size}>
                                    <Paper>
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
                                    </Paper>
                                </ContextMenu>
                                </Grid>

                            )
                        })
                    }
                
            </Grid>
    </div>
    )
}