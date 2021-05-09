import React from 'react';
import useStyles from '../styles/filetree.style';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Icons from '../styles/icons';
import FolderNode from './folder.node';
const pathModule = window.require('path');
const electron = window.require('electron');
const shell = electron.shell;

const FileTree = (props) => {
    const {files, onBack, onOpen, path} = props;
    const classes = useStyles();
    const openFile=(nome)=>{
        try{ shell.openPath(path+'/'+ nome);}
        catch(err){
            console.log(err);
        };
    }
    return ( 
        <TreeView
            className={classes.tree}
            defaultCollapseIcon={Icons.tree.folderOpen}
            defaultExpandIcon={Icons.tree.folderClose}
            multiSelect
        >
            {
                files.map(({name, directory, size,type},index) => {
                    if(directory){
                        return(
                            <TreeItem key={index} nodeId={index} label={name}>
                                <FolderNode root={name} path={pathModule.join(path,name)}/>
                            </TreeItem>
                        )
                    }else{
                        return <TreeItem onClick={ () => { openFile(name) }} key={index} nodeId={index} label={name}/>
                    }
                })
            }

        </TreeView>
     );
}
 
export default FileTree;