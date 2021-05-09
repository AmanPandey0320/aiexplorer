
import {useContext, useState} from 'react'
import { FileContext } from "./fileContext";
//export const FilesViewer = ({files,path, onBack, onOpen}) => {
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu"
import { unlinkFile } from "./contextMenuActions";
import Icons from './styles/icons'
import Grid from '@material-ui/core/Grid';
import useStyles from './styles/fileView.style';
import Paper from '@material-ui/core/Paper';
import FormControl from'@material-ui/core/FormControl';
import MenuListItem from '@material-ui/core/MenuItem';
import { renderIconSwitch } from './logic/file'
import { getOperatingSystem } from './logic/osType';
import { MdContentPaste } from 'react-icons/md'
import { BiFolderPlus } from 'react-icons/bi'
const fs = window.require('fs')
const electron = window.require('electron');
const shell = electron.shell;
var pat = require('path')
const smalltalk = require('smalltalk');

export const FilesViewer = ({files, onBack, onOpen, path}) => {
        const {pathe,setPath,move, setMove,alterTogle} = useContext(FileContext);
        console.log(shell);
        const openFile=(nome)=>{
            try{ 
                shell.openPath(path+'/'+ nome);
            }
            catch(err){
                console.log(err);
            };
        }
  
       const handleAction = (action,name) => {
        switch(action){
            case 'mkdir':{
                smalltalk
                .prompt('Create Folder', 'Enter name of folder')
                .then((value)=>{
                    let p
                    let ext=value.split('.')[0]
                    if(ext=='')
                    {
                        alert("entered invalid name");
                        return;
                    }
                    if(getOperatingSystem(window)==='win'){
                       
                        p = path+'\\'+ext;
                            
                    }
                    else{
                        p = path+'\\'+ext;
                        p = p.split("\\").join("/");
                    }
                    fs.mkdir(p , function(err) {
                        alterTogle();
                        if (err) {
                            alert("Can not make folder of this name")
                            return;
                        } else {
                            console.log("New directory successfully created.")
                        }
                        })
                })
                
 
               
                break;
            }
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
                        let p,v;
                        if(getOperatingSystem(window)==='win'){
                            p = path+'\\'+name;
                            v = path+'\\'+value;
                        }
                        else{
                            p = path+'\\'+ name
                            v = path+'\\'+value;
                            p = p.split("\\").join("/");
                            v = v.split("\\").join("/");
                        }
                        fs.rename(p,v, (err)=>{
                            alterTogle();
                            if(err){
                               console.log(err);
                                console.log(p,v+ext);
                                alert("entered invalid "); 
                                return; 
                            }
                        } )
                    })
                    .catch(() => {
                        console.log('cancel');
                    });
                
                
                
                
                break;
            }
            case 'delete':{
                
                let joined;
                if(getOperatingSystem(window) === 'win'){
                    var z = `${path}`+"\\"+`${name}`
                    alert(z)
                    joined  = z.split('"').join('')
                }
                else{
                    joined = joined.split("\\").join("/");
                }
               
                
                unlinkFile(joined).then(()=>{alterTogle();})
                break;
            }
            case 'paste':{
               // alert(action)
               // copyFile(pathe,path);
                // alert("copied");
                let st;
                if(getOperatingSystem(window) === 'win'){
                    st=path+'\\'+pathe.name
                }
                else{
                    st=path+'\\'+pathe.name
                    st = st.split("\\").join("/")
                    pathe.path = pathe.path.split("\\").join("/");
                }
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
    const [show,setShow] = useState(false)

    return (
        <div onClick={e => {setShow(false)}} onContextMenu={e => { e.preventDefault();   setShow(true)}} style={{height:'100vh'}} className={classes.main}> 
            {
                show && <FormControl className={classes.FormControl}>
                            <div>
                               {pathe.path && pathe.path!='' && <Paper>
                                    <MenuListItem onClick={ e => {handleAction('paste')}} ><MdContentPaste/>&nbsp;Paste here</MenuListItem>
                                </Paper>}
                                <Paper>
                                    <MenuListItem onClick={ e => {handleAction('mkdir')}} ><BiFolderPlus/>&nbsp;New folder</MenuListItem>
                                </Paper>
                            </div>
                        </FormControl>
            }
            <Grid  container xs={12}>
                    {
                        files.map(({name, directory, size,type})=> {
                            return (
                                <Grid className={classes.item}>
                                <ContextMenuTrigger id={name+directory+size}>
                                    <div onClick={()=>directory?onOpen(name):null} onDoubleClick={()=>openFile(name)} item xs={3} >
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
                                        <MenuItem onClick={()=>handleAction('mkdir',name)}>
                                            New folder
                                        </MenuItem>
                                        { 
                                            pathe.path && pathe.path!='' && <MenuItem onClick={()=>handleAction('paste',name)}>
                                                Paste
                                            </MenuItem>
                                        }
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