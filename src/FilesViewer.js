import FileTree from './components/fileTree';
import FileMain from './components/fileView';
import { makeStyles } from '@material-ui/core/styles';

const useStyles =  makeStyles( theme => ({
    main:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
    
}));

export const FilesViewer = ({files, onBack, onOpen}) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <FileTree files={files} onBack={onBack} onOpen={onOpen} />
            <FileMain files={files} onBack={onBack} onOpen={onOpen} />
        </div>
    )
}