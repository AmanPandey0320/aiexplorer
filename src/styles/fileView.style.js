import { makeStyles } from '@material-ui/core/styles';

export default makeStyles( theme => ({

    main:{
        width:'66%',
    },
    name:{
        fontSize:'12px',
        textAlign:'center',
        wordWrap:'break-word'
    },
    folderic:{
        cursor:'pointer'
    },
    item:{
        display:'flex',
        flexDirection:'column',
        marginInline:'6px',
        maxWidth:'64px'
    }
    
}));