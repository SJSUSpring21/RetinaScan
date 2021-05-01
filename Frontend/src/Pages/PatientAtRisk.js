import { Button, Table } from '@material-ui/core';
import React, { useEffect, useState} from 'react';
import { withRouter } from 'react-router';
import ViewandPredictTable  from '../Components/ViewandPredictTable'
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Input } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({  
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
}))

const cells = [
    { id: 'Name', label: 'Patient Name' },
    { id: 'Pid', label: 'Patient ID' },
    { id:'Age', label: 'Age'},
    { id:'sugarlevel', label: 'Sugar level(mg/dL)'},
    { id:'cholesterol', label: 'Cholesterol(mg/dL)'},
    { id: 'Severity', label: 'Severity' },
    { id: 'BP' , label:'Blood Pressure (mm Hg)'},
    { id: 'istobaccoUser', label: 'Tobacco User'}
  ]

function PatientAtRisk() {

    const[patientDetails,SetpatientDetails] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:9000/getHighRiskPatients')
       .then((response) => {
         const patientDetails= response.data.result;
         SetpatientDetails(patientDetails)
         console.log(patientDetails[0].diagnostic[0].patient_id);
       })
       .catch((err) => {
         console.log(err);
       })
     }, [])

    const classes = useStyles();

  
    const {
        TableContainer,
        TblHead
    } = ViewandPredictTable(patientDetails,cells);
    return (
        <div className="PatientAtRisk">
          <h1>Patients at High Risk</h1>
        <TableContainer>
       <TblHead />
       <TableBody>
             {
               
               patientDetails.map((patientDetails) =>
               (
               <TableRow key={patientDetails.id}>
               <TableCell>{patientDetails.patientName}</TableCell>
               <TableCell>{patientDetails.patientGenId}</TableCell>
               <TableCell>{patientDetails.age}</TableCell>
               <TableCell>{patientDetails.bloodSugarLevel}</TableCell>
               <TableCell>{patientDetails.cholestrolLevel}</TableCell>
               <TableCell>{
                            patientDetails.diagnostic.map((item) => 
                                                {return item.diagnosisType}
                                                              )}</TableCell>
                <TableCell>{ patientDetails.systolicbloodPressure && patientDetails.diastolicbloodPressure ? `${patientDetails.systolicbloodPressure} / ${patientDetails.diastolicbloodPressure}` : ''}</TableCell>
                {/* <TableCell>{()=> {if (patientDetails.systolicbloodPressure && patientDetails.diastolicbloodPressure){
                                         return patientDetails.systolicbloodPressure/patientDetails.diastolicbloodPressure}}}</TableCell> */}
                
                <TableCell>{patientDetails.isTobaccoUser ? 'Yes' : 'No'}
                
                </TableCell>                     
                </TableRow>
               ))
            }
               </TableBody> 
       
       </TableContainer>

           
        </div>
    )
}

export default withRouter(PatientAtRisk)
