import React, { useState, useEffect} from 'react'
import './Add.css';
import { Grid, TextField, makeStyles, Select, MenuItem, InputLabel} from '@material-ui/core'
import  {useForm,Form}  from '../Components/useForm'
import Controls from '../Components/Controls'
import axios from "axios";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator' ;
import { format } from 'date-fns';
import {toast} from 'react-toastify'
import validator from 'validator'
import * as CONST from '../const'
var url = CONST.ROOT_URL;

const genderList = [
    { id: 'Male', title: 'Male' },
    { id: 'Female', title: 'Female' },
]

const initialValues = {
    patientName:String,
    gender:String,
    DOB: format(new Date(), 'yyyy/MM/dd'),
    email:'',
    diabetesType:'',
    yearOfDiabetes:Number,
    age:Number,
    bloodSugarLevel:Number,
    cholestrolLevel:Number,
    isTobaccoUser:false,
    systolicbloodPressure:Number,
    diastolicbloodPressure:Number,
}



function AddPatientForm() {


    const{
        val,
        setVal,
        handleInput

    } = useForm(initialValues)

    const postPatientData = async() => {
        if (validator.isEmail(val.email)) {
            axios.post(`${url}/registerPatient`, val)
            .then((response) => {
              console.log(response)
              if(response.status===200){
                  const CustomToast = ({closeToast})=>{
                    return(
                      <div style={{textAlign:"center"}}>
                        <h4>Successfully Registered Patient!</h4>
                      </div>
                    )
                  }
                  toast.success(<CustomToast />, {position: toast.POSITION.TOP_CENTER, autoClose:true})
                }
            }).catch((error) => {
              console.log(error)
              const CustomToast1 = ({closeToast})=>{
                return(
                  <div style={{textAlign:"center"}}>
                    <h4>Error while Registering Patient!</h4>
                  </div>
                )
              }
              toast.error(<CustomToast1 />, {position: toast.POSITION.TOP_CENTER, autoClose:true})
              
          });
        }
        else{
            const CustomToast1 = ({closeToast})=>{
                return(
                  <div style={{textAlign:"center"}}>
                    <h4>Error while Registering Patient!</h4>
                  </div>
                )
              }
              toast.error(<CustomToast1 />, {position: toast.POSITION.TOP_CENTER, autoClose:true})
        }

    }
    return (
        <>
      
        <Form>
        <h1>Add A New Patient</h1>
            <Grid container>
                <Grid xs={6}>
                    <TextField
                        required
                        variant="outlined"
                        label="Name"
                        name="patientName"
                        defaultValue = {String}
                        onChange={handleInput}
                    />
                    <ValidatorForm>
                        <TextValidator
                        required
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={val.email}
                        onChange={handleInput}
                        validators={['isEmail']}
                        errorMessages={['Email is not valid']}
                    />
                    </ValidatorForm>

                    <Controls.DatePicker
                        required
                        name="DOB"
                        label="Date of Birth"
                        value={val.DOB}
                        onChange={handleInput}
                    />
                    <TextField
                        required
                        variant="outlined"
                        label="Age"
                        name="age"
                        defaultValue = {Number}
                        type="number"
                        InputProps={{ inputProps: { min: 1} }}
                        onChange={handleInput}
                    />
                    <Controls.RadioGroup
                        required
                        name="gender"
                        label="Gender"
                        value={val.gender}
                        onChange={handleInput}
                        items={genderList}
                    />
                    <Controls.Checkbox
                        required
                        name="isTobaccoUser"
                        label="Uses tobacco"
                        value={val.isTobaccoUser}
                        onChange={handleInput}
                    />
                    </Grid>
                    <Grid xs={6}>
                    <Controls.Select
                        required
                        name="diabetesType" 
                        label="Type of Diabetes"
                        value={val.diabetesType}
                        onChange={handleInput}
                        
                    />
                    <TextField
                        required
                        variant="outlined"
                        name="yearOfDiabetes"
                        label="Year of Diagnosis"
                        defaultValue = {Number}
                        inputProps={{minLength:4, maxLength:4 }}
                        onChange={handleInput}
                    />
                    <TextField 
                        required
                        variant="outlined"
                        label="Blood Sugar Level (mg/dL) - 2 hours after eating"
                        name="bloodSugarLevel"
                        type="number"
                        defaultValue = {Number}
                        InputProps={{ inputProps: { min: 1} }}
                        onChange={handleInput}
                    />
                    
                    <TextField
                        required
                        variant="outlined"
                        label="Cholesterol Level (mg/dL)"
                        name="cholestrolLevel"
                        type="number"
                        defaultValue = {Number}
                        InputProps={{ inputProps: { min: 1} }}
                        onChange={handleInput}
                    />
                    <TextField 
                        required
                        variant="outlined"
                        label="Systolic Blood Pressure (mm Hg)"
                        name="systolicbloodPressure"
                        type="number"
                        defaultValue = {Number}
                        InputProps={{ inputProps: { min: 1} }}
                        onChange={handleInput}
                    />
                    <TextField
                        required
                        variant="outlined"
                        label="Diastolic Blood Pressure (mm Hg)"
                        name="diastolicbloodPressure"
                        type="number"
                        defaultValue = {Number}
                        InputProps={{ inputProps: { min: 1} }}
                        onChange={handleInput}
                    />
                    </Grid>
                    <div>
                        <Controls.Button
                            type="reset"
                            text="Register"
                            color="default"
                            onClick={postPatientData}
                             />
                    </div>
                </Grid>        
        </Form>
        </>
    )
}

export default AddPatientForm
