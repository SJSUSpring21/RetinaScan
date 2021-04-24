import React, { useState, useEffect} from 'react'
import './Add.css';
import { Grid, TextField, makeStyles, Select, MenuItem, InputLabel } from '@material-ui/core'
import  {useForm,Form}  from '../Components/useForm'
import Controls from '../Components/Controls'
import inst from '../axios'

const genderList = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
]


const initialValues = {
    name:'',
    gender:'',
    dob: Date(),
    email:'',
    type:'',
    year_of_diag:'',
    age:'',
    sugar_level:'',
    cholestrol:'',
    isTobaccouser:false,
    bloodpressure:''
}





function AddPatientForm() {

    const{
        val,
        setVal,
        handleInput

    } = useForm(initialValues)

    const postPatientData = async() => {
        let res = await inst.post('/registerPatient',{
            val})
        .then(console.log(res))        
    }
    return (
        <>
        
        <Form>
            <Grid container>
                <Grid xs={6}>
                    <TextField 
                    variant="outlined"
                    label="Name"
                    name="name"
                    value={val.name}
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
                        name="dob"
                        label="Date of Birth"
                        value={val.dob}
                        onChange={handleInput}
                    />
                    <TextField 
                    variant="outlined"
                    label="Age"
                    name="age"
                    value={val.age}
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
                        name="isTobaccouser"
                        label="Uses tobacco"
                        value={val.isTobaccouser}
                        onChange={handleInput}
                    />
                    </Grid>
                    <Grid xs={6}>
                    <Controls.Select
                        name="type" 
                        label="Type of Diabetes"
                        value={val.type}
                        onChange={handleInput}
                        
                    />
                    <TextField
                        variant="outlined"
                        name="year_of_diag"
                        label="Year of Diagnosis"
                        value={val.year_of_diag}
                        onChange={handleInput}
                    />
                    <TextField 
                    variant="outlined"
                    label="Sugar Level"
                    name="sugar_level"
                    value={val.sugar_level}
                    onChange={handleInput}
                    />
                    
                    <TextField 
                    variant="outlined"
                    label="Cholestrol"
                    name="cholestrol"
                    value={val.cholestrol}
                    onChange={handleInput}
                    />
                    <TextField 
                    variant="outlined"
                    label="Blood Pressure"
                    name="bloodpressure"
                    value={val.cholestrol}
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
