
import {useContext} from 'react'
import { FileContext } from "./fileContext";
//export const FilesViewer = ({files,path, onBack, onOpen}) => {
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu"
import { deleteFile, unlinkFile } from "./contextMenuActions";
import { FcFolder,FcFile } from "react-icons/fc";
import { VscJson } from 'react-icons/vsc';
import { SiJavascript } from 'react-icons/si';
import { AiFillFileMarkdown } from 'react-icons/ai'
import Icons from './styles/icons'
import Grid from '@material-ui/core/Grid';
import useStyles from './styles/fileView.style';
import Paper from '@material-ui/core/Paper';
import { renderIconSwitch } from './logic/file'
const fs = window.require('fs')
const electron = window.require('electron');
const shell = electron.shell;
var pat = require('path')
const smalltalk = require('smalltalk');

export const FilesViewer = ({files, onBack, onOpen, path}) => {
        const {pathe,setPath,move, setMove,alterTogle} = useContext(FileContext);
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
                setMove(false);
                let str=`${path}\\${name}`
                setPath({path:str,name})
                console.log(pathe);
                alert(action)
                break;
            }
            case 'move':{
                alert(action)
                setMove(true);
                let str=`${path}\\${name}`
                setPath({path:str,name})
                break;
            }
            case 'rename':{
                smalltalk
                    .prompt('Rename', 'Enter new name you want', name.split('.')[0])
                    .then((value) => {
                        const ext=pat.extname(name);
                        // value=value.toString().trim();
                        if(value=='')
                        {
                            alert("entered invalid name");
                            return;
                        }
                        fs.rename(path+'\\'+name,path+'\\'+value, (err)=>{
                            alterTogle();
                            if(err){
                               console.log(err);
                                console.log(path+'\\'+name,path+'\\'+value+ext);
                                alert("entered invalid "); 
                                return; 
                            }
                        } )
                    })
                    .catch(() => {
                        console.log('cancel');
                       
                    });
                
                
                
                alert(action)
                break;
            }
            case 'delete':{
                alert(action)
                var z = `${path}`+"\\"+`${name}`
                alert(z)
                let joined  = z.split('"').join('')
                alert('join',joined)
                unlinkFile(joined).then(()=>{alterTogle();})
                               
                break;
            }
            case 'paste':{
                alert(action)
               // copyFile(pathe,path);
                // alert("copied");
                const st=path+'\\'+pathe.name
                fs.copyFile(pathe.path,st,(err)=>{console.log(err); alterTogle()});
                if(move)
                {
                    unlinkFile(pathe.path)
                    setMove(false);
                    setPath({path,name:pathe.name})
                }
                alert("Task compleated");
            }
            default:{
                alert(action)
                break;
            }
        }
    }

    const classes = useStyles();

    return (
        <div  className={classes.main}> 
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
                           { pathe!='' && <MenuItem onClick={()=>handleAction('paste',name)}>
                                Paste
                                </MenuItem>}
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