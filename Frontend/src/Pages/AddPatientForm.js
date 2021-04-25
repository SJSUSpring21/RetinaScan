import React, { useState, useEffect} from 'react'
import './Add.css';
import { Grid, TextField, makeStyles, Select, MenuItem, InputLabel } from '@material-ui/core'
import  {useForm,Form}  from '../Components/useForm'
import Controls from '../Components/Controls'
import inst from '../axios'
import axios from "axios";

const genderList = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
]

const initialValues = {
    patientName:'',
    gender:'',
    DOB: Date(),
    email:'',
    diabetesType:'',
    yearOfDiabetes:Number,
    age:Number,
    bloodSugarLevel:Number,
    cholestrolLevel:Number,
    isTobaccoUser:false,
    bloodPressure:Number
}

function AddPatientForm() {

    const{
        val,
        setVal,
        handleInput

    } = useForm(initialValues)

    const postPatientData = async() => {
        axios.post('http://localhost:9000/registerPatient', val)
          .then((response) => {
            console.log(response)
          }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <>
        
        <Form>
            <Grid container>
                <Grid xs={6}>
                    <TextField 
                    variant="outlined"
                    label="Name"
                    name="patientName"
                    value={val.patientName}
                    onChange={handleInput}
                    />
                    <TextField 
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={val.email}
                    onChange={handleInput}
                    />
                    <Controls.DatePicker
                        name="DOB"
                        label="Date of Birth"
                        value={val.DOB}
                        onChange={handleInput}
                    />
                    <TextField 
                    variant="outlined"
                    label="Age"
                    name="age"
                    value={parseInt(val.age)}
                    onChange={handleInput}
                    />
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={val.gender}
                        onChange={handleInput}
                        items={genderList}
                    />
                    <Controls.Checkbox
                        name="isTobaccoUser"
                        label="Uses tobacco"
                        value={val.isTobaccoUser}
                        onChange={handleInput}
                    />
                    </Grid>
                    <Grid xs={6}>
                    <Controls.Select
                        name="diabetesType" 
                        label="Type of Diabetes"
                        value={val.diabetesType}
                        onChange={handleInput}
                        
                    />
                    <TextField
                        variant="outlined"
                        name="yearOfDiabetes"
                        label="Year of Diagnosis"
                        value={parseInt(val.yearOfDiabetes)}
                        onChange={handleInput}
                    />
                    <TextField 
                    variant="outlined"
                    label="Sugar Level"
                    name="bloodSugarLevel"
                    value={parseInt(val.bloodSugarLevel)}
                    onChange={handleInput}
                    />
                    
                    <TextField 
                    variant="outlined"
                    label="Cholestrol"
                    name="cholestrolLevel"
                    value={parseInt(val.cholestrolLevel)}
                    onChange={handleInput}
                    />
                    <TextField 
                    variant="outlined"
                    label="Blood Pressure"
                    name="bloodPressure"
                    value={parseInt(val.bloodPressure)}
                    onChange={handleInput}
                    />
                    </Grid>
                    <div>
                        <Controls.Button
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
