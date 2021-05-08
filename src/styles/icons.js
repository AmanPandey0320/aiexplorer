import { FcFolder,FcFile,FcImageFile, FcAudioFile,FcVideoFile } from "react-icons/fc";
import { VscJson } from 'react-icons/vsc';
import { SiJavascript,SiCplusplus,SiMicrosoftword } from 'react-icons/si';
import { AiFillFileMarkdown,AiFillFileText } from 'react-icons/ai';

export default {
    folder:<FcFolder size="4em" />,
    file:<FcFile size="4em"/>,
    json:<VscJson color="#02ccf5" size="4em"/>,
    md:<AiFillFileMarkdown size="4em" color="#02ccf5"/>,
    js:<SiJavascript color="#fce703" size="4em"/>,
    img:<FcImageFile size="4em"/>,
    audio:<FcAudioFile size="4em"/>,
    video:<FcVideoFile size="4em"/>,
    text:<AiFillFileText color="#02ccf5" size="4em"/>,
    cpp:<SiCplusplus color="#792bff" size="4em"/>,
    docx:<SiMicrosoftword color="#0073ff" size="4em"/>
}