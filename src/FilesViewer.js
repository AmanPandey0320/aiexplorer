
import {useContext} from 'react'
import { FileContext } from "./fileContext";
//export const FilesViewer = ({files,path, onBack, onOpen}) => {
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu"
import { unlinkFile } from "./contextMenuActions";
import Icons from './styles/icons'
import Grid from '@material-ui/core/Grid';
import useStyles from './styles/fileView.style';
import Paper from '@material-ui/core/Paper'
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
                                <Grid className={classes.item}>
                                <ContextMenuTrigger id={name+directory+size}>
                                    <div onClick={()=>directory?onOpen(name):openFile(name)} item xs={3} >
                                        <div className={classes.folderic}>
                                            {directory && Icons.folder}
                                            {!directory && <div>
                                                {
                                                    renderIconSwitch(type?type:'')
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