import { makeStyles } from '@material-ui/core/styles';

export default makeStyles( theme => ({

    main:{
        width:'60%',
    },
    name:{
        fontSize:'12px',
        textAlign:'right',
    },
    folderic:{
        cursor:'pointer'
    },
    item:{
        display:'flex',
        flexDirection:'column',
        marginInline:'2px'
    }
    
}));