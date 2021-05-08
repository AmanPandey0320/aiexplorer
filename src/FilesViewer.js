export const FilesViewer = ({files, onBack, onOpen}) => {
    return (<table>
        <tbody>
            <tr onClick={onBack}>
                <td>Back</td>
            </tr>
            {
                files.map(({name, directory, size})=> {
                    return (
                        <tr onClick={()=>directory && onOpen(name)}>
                            <td>{name}</td>
                            <td>{size}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>)
}