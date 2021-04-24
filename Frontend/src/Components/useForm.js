import  { React,useState } from 'react'
import { makeStyles } from '@material-ui/core'
import './useForm.css'

export  function useForm(initialValues) {

    const [val, setVal] = useState(initialValues);
    const handleInput= e =>{
        const {name,value} = e.target
        setVal({
            ...val,
            [name]:value

        })
    }

    
    return {
        val,
        setVal,
        handleInput
    }
}

const useStyles = makeStyles(theme =>({
    root:{
    '& .MuiFormControl-root':{
         width: '80%',
         margin:theme.spacing(1),
         
         
},
        position: 'absolute',
        left: '30%',
        top: '50%',
        transform:'translate(0,-50%)',
        width:'60%',
        overflow: true
        
        
    },
    selecttype:{
        margin:theme.spacing(1),
        minWidth: 120
    }
}))

export  function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}


 
