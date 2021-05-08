import React from 'react';
import useStyles from '../styles/filetree.style'

const FileTree = (props) => {
    const classes = useStyles();
    return ( 
        <div className={classes.main} >
            file tree
        </div>
     );
}
 
export default FileTree;