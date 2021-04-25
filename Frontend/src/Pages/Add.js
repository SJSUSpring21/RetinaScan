import React, { useState, useEffect} from 'react'
import './Add.css';
import {  makeStyles, Paper } from '@material-ui/core'
import AddPatientForm from './AddPatientForm';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';


const useStyles = makeStyles(theme =>({
    root:{
        pageContent:{
            margin:theme.spacing(5),
            padding:theme.spacing(3)

        }

        }
}))

export default function Add() {
    const classes = useStyles();
    
    return (
        <>
        <Paper className={classes.pageContent}>
        <AddPatientForm />
        </Paper>
        </>
    )
}

 
