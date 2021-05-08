import React from 'react';
import useStyles from '../styles/fileView.style';
import { FcFolder,FcFile } from "react-icons/fc";
import Grid from '@material-ui/core/Grid';

const FileMain = (props) => {
    const {files, onBack, onOpen} = props;
    const classes = useStyles();
    return ( 
        <div className={classes.main} >
            <Grid container spacing={3} xs={12} >
                {
                    files.map(({name, directory, size})=>{
                        return(
                            <Grid item xs={3} >
                                <div className={classes.folderic}>
                                    {directory && <FcFolder size="4em" />}
                                    {!directory && <FcFile size="4em" /> }
                                </div>
                                <div className={classes.name} >{name}</div>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
     );
}
 
export default FileMain;

// export const FilesViewer = ({files, onBack, onOpen}) => {
//     return (<table>
//         <tbody>
//             <tr onClick={onBack}>
//                 <td>Back</td>
//             </tr>
//             {
//                 files.map(({name, directory, size})=> {
//                     return (
//                         <tr onClick={()=>directory && onOpen(name)}>
//                             <td>{name}</td>
//                             <td>{size}</td>
//                         </tr>
//                     )
//                 })
//             }
//         </tbody>
//     </table>)
// }