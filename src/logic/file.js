import Icons from '../styles/icons';

const renderIconSwitch = (type) => {

    if(type === null) return Icons.file;

    const sup_type = type.split('/')[0];
    const sub_type = type.split('/')[1];

    if(sup_type === 'application' ){

        switch (sub_type) {
            case "javascript": return Icons.js
            case "json": return Icons.json
            case "vnd.openxmlformats-officedocument.wordprocessingml.document" : return Icons.docx
        
            default: return Icons.file
        }

    }else if( sup_type === 'audio' ){
        return Icons.audio
    }else if( sup_type === 'image' ){
        return Icons.img

    }else if( sup_type === 'text' ){
        switch (sub_type) {
            case "markdown" : return Icons.md
            case "x-c": return Icons.cpp
        
            default:return Icons.text
        }

    }else if( sup_type === 'video' ){
        return Icons.video
    }else{
        return Icons.file
    }
    
}

export { renderIconSwitch }