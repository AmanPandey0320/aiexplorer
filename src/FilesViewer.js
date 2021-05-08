
import {useContext} from 'react'
import { FileContext } from "./fileContext";
//export const FilesViewer = ({files,path, onBack, onOpen}) => {
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu"
import { deleteFile, unlinkFile } from "./contextMenuActions";
import { FcFolder,FcFile } from "react-icons/fc";
import { VscJson } from 'react-icons/vsc';
import { SiJavascript } from 'react-icons/si'
import Grid from '@material-ui/core/Grid';
import useStyles from './styles/fileView.style';
import Paper from '@material-ui/core/Paper'
const fs = window.require('fs')
const electron = window.require('electron');
const shell = electron.shell;
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

    const classes = useStyles();

    const renderIconSwitch = (type) => {
        switch (type) {
            case "application/javascript":return(<SiJavascript color="#fce703" size="4em"/>)
            case "application/json": return <VscJson color="#02ccf5" size="4em"/>
        
            default: return(<FcFile size="4em"/>)
        }
    }
    return (
        <div className={classes.main}> 
            <Grid  container xs={12} spacing={3}>
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
                                    <Grid className={classes.item} onClick={()=>directory?onOpen(name):openFile(name)} item xs={3} >
                                        <div className={classes.folderic}>
                                            {directory && <FcFolder size="4em" />}
                                            {!directory && <div>
                                                {
                                                    renderIconSwitch(type)
                                                }
                                            </div> }
                                        </div>
                                        <div className={classes.name} >{name}</div>
                                        
                                    </Grid>
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
                           { pathe!='' && <MenuItem onClick={()=>handleAction('paste',name)}>
                                Paste
                                </MenuItem>}
                                    </Paper>
                                </ContextMenu>
                                </>

                            )
                        })
                    }
                
            </Grid>
    </div>
    )
}