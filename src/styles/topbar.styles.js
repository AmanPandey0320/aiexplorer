import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formControl:{
        minWidth:'90%',
        marginLeft:'4px',
        display:'flex',
        flexDirection:'row',
        marginBottom:'4px'
    },
    location:{
        backgroundColor:'#f2f2f2',
        width:'64%',
        borderStyle:'solid',
        borderWidth:'0px',
        borderRadius:'30px',
        paddingTop:'6px',
        paddingLeft:'4px',
        textAlign:'left',
        fontSize:'13px'
    },
    search:{
        width:'20%',
        marginInline:'4px'
    },
    fileic:{
        marginInline:'3px'
    },
    backic:{
        margin:'4px',
        cursor:'pointer'
    }
}));