import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileTree from './components/fileTree';
import { FilesViewer } from './FilesViewer' 

const useStyles = makeStyles( theme => ({

    main:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    
}));

const FileMain = ({files, onBack, onOpen, path}) => {
    const classes = useStyles();
    return ( 
        <div className={classes.main} >
            <FileTree files={files} onBack={onBack} onOpen={onOpen} path={path} />
            <FilesViewer files={files} onBack={onBack} onOpen={onOpen} path={path}/>
        </div>
     );
}
 
export default FileMain;