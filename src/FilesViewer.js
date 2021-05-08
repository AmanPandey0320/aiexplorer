const electron = window.require('electron');
const shell = electron.shell;




export const FilesViewer = ({files,path, onBack, onOpen}) => {
    const openFile=(nome)=>{
       try{ shell.openPath(path+'/'+ 
       nome);}
       catch(err){
           console.log(err);
       };
     }
    return (<table>
        <tbody>
            <tr onClick={onBack}>
                <td>Back</td>
            </tr>
            {
                files.map(({name, directory, size,type})=> {
                    return (
                        <tr onClick={()=>directory?onOpen(name):openFile(name)}>
                            <td>{name}</td>
                            <td>{size}</td>
                           { !directory && <td>{type}</td>}
                        </tr>
                    )
                })
            }
        </tbody>
    </table>)
}