import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import useStyles from '../styles/topbar.styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FcSearch,FcOpenedFolder } from 'react-icons/fc';
import { FaArrowCircleLeft } from 'react-icons/fa';

const TopBar = (props) => {
    const { path , searchString, setSearchString,onBack } = props;
    const classes = useStyles();

    return ( 
        <div style={{paddingTop:"10px"}}>
            <FormControl className={classes.formControl} >
                <span onClick={onBack} className={classes.backic} ><FaArrowCircleLeft color="#3f50b5" size="1.5em" /></span>
                <span className={classes.location} ><span className={classes.fileic} ><FcOpenedFolder/></span><span>{path}</span></span>
                <TextField 
                    value={searchString} 
                    onChange={e => setSearchString(e.target.value)} 
                    InputProps={{
                        startAdornment:<InputAdornment><FcSearch/>&nbsp;</InputAdornment>
                    }}
                    variant='standard'
                    placeholder="search files and folder"
                />
            </FormControl>
        </div>
     );
}
 
export default TopBar;