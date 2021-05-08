export const FilesViewer = ({files, onBack, onOpen}) => {

    const openFile = (name) => {
        alert(name)
    }
    const handleClick = (e,name,directory) => {

        alert('click type',e.type)
        if(e.type === 'click') {
            alert('left click')
            directory? onOpen(name):openFile(name)
        }
        else if(e.type === 'contextmenu'){
            alert('right click')
        }
    }
    return (<table>
        <tbody>
            <tr onClick={onBack}>
                <td>Back</td>
            </tr>
            {
                files.map(({name, directory, size})=> {
                    return (
                        <tr onClick={(e)=>handleClick(e,name, directory)}>
                            <td>{name}</td>
                            <td>{size}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>)
}