import { Button, Table } from '@material-ui/core';
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ViewandPredictTable  from '../Components/ViewandPredictTable'
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Input } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Controls from '../Components/Controls';
import { Search } from "@material-ui/icons";
import {toast} from 'react-toastify'

const useStyles = makeStyles(theme => ({  
  pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
  },
  newButton: {
    position: 'absolute',
    right: '10px',
    marginTop: theme.spacing(2)
},
uploadButton:{
  textDecoration:'none'
}
// uploadButton:{
//   position: 'absolute',
//   right: '150px',
//   margin: theme.spacing(70),
//   marginBottom: theme.spacing(10)
// },
// predictButton:{
//   position: 'absolute',
//   right: '10px',
//   margin: theme.spacing(70),
//   marginBottom: theme.spacing(10) 
// },
// searchInput:{
//   marginBottom: theme.spacing(60),
//   width:'75%'
  
// }
}))
const cells = [
  { id: 'Name', label: 'Patient Name' },
  { id: 'Pid', label: 'Patient ID' },
  { id: 'Severity', label: 'Severity' },
  { id: 'SeverityType' , label:'Severity Type'},
  { id: 'actions', label: 'Actions'}
]

// const handleSearch = e =>{
//   return e.target;
// }



function ViewAndPredict() {

  const [predictPatient,SetpredictPatient] = useState([]);
  const[patientDetails,SetpatientDetails] = useState([]);
  

useEffect(()=> {
   axios.get('http://localhost:9000/fetchAllPatientDetails')
  .then((response) => {
    const patientDetails= response.data.result;
    // var patientID = patientDetails.patientGenId;
    
    //  console.log(patientDetails)
    SetpatientDetails(patientDetails)
    //console.log(patientDetails.patientGenId);
    //console.log(patientDetails.id);
    //console.log(patientDetails)
    //patientDetails.map((patientDetail)=>console.log(patientDetail.patientName));
    console.log(patientDetails[0].allPatientInfo[0].patient_id);
  })
  .catch((err) => {
    console.log(err);
  })
}, [])


  const classes = useStyles();
  // const [records, setRecords] = useState(SetpatientDetails(patientDetails));
  
  const {
    TableContainer,
    TblHead
  } = ViewandPredictTable(patientDetails,cells);
    return (
       <>
       {/* <Toolbar>
          <Controls.Input
            label="Search Employees"
            className={classes.searchInput}
            InputProps={{
                        startAdornment: (<InputAdornment position="start">
                          <Search />
                          </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
        </Toolbar> */}
       <Link to="/Add">
       <Button 
          variant="outlined"
          startIcon={<AddIcon />}
          className={classes.newButton} >Add new patient</Button>
        </Link>  
       
       <TableContainer>
       <TblHead />
       
         <TableBody>
             {
               
               patientDetails.map((patientDetails) =>
               (
               <TableRow key={patientDetails.id}>
               <TableCell>{patientDetails.patientName}</TableCell>
               <TableCell>{patientDetails.patientGenId}</TableCell>
               
               {/* <TableCell>{patientDetails[0].allPatientInfo[0].severityScore}</TableCell> */}
               <TableCell>{
               patientDetails.allPatientInfo.map((item) => {if(item.severityScore)
                                                              {return item.severityScore}
                                                              else return "-"})}</TableCell>
              <TableCell>{
               patientDetails.allPatientInfo.map((item) => {if(item.diagnosisType)
                                                              {return item.diagnosisType}
                                                              else return "-"})}</TableCell>
                <TableCell>
                <Link to='/regpatients'>
			           <Button 
                     variant="outlined"
                      // startIcon={<PublishIcon />}
                      //onClick={}
                      className={classes.uploadButton} >Upload </Button>
                 
                </Link>    
                    <Button 
                      variant="outlined"
                      //  startIcon={<SearchIcon />}
                      onClick={(event) =>{
                        event.preventDefault();
  
                        axios.post(`http://3.85.224.226:9000/predict/${patientDetails.patientGenId}`)
                          .then((response) => {
                            console.log(response)
                            const predictPatient = response.data.result;
                            SetpredictPatient(predictPatient)
                            const CustomToast = ({closeToast})=>{
                              return(
                                <div style={{textAlign:"center"}}>
                                  <h4>Successfully Predicted with Score: {predictPatient.severityScore}</h4>
                                </div>
                              )
                              
                            }
                            toast.success(<CustomToast />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})
                          }).catch((error) => {
                            console.log(error)
                            const CustomToast1 = ({closeToast})=>{
                              return(
                                <div style={{textAlign:"center"}}>
                                  <h4>Error while Prediciting Score!</h4>
                                </div>
                              )
                            }
                            toast.error(<CustomToast1 />, {position: toast.POSITION.TOP_CENTER, autoClose:true})
                          });;
                      
                    
                    }
                      } 
                      className={classes.predictButton} >Predict </Button>
                    
                 </TableCell>   

               </TableRow> 
               ))
              
              
             }    
                 
        </TableBody> 
       
       </TableContainer>
       {/* <Button 
          variant="outlined"
          startIcon={<PublishIcon />}
          className={classes.uploadButton} >Upload </Button>
        <Button 
          variant="outlined"
          startIcon={<SearchIcon />}
          className={classes.predictButton} >Predict </Button> */}
       
       </> 
    )
}

export default withRouter(ViewAndPredict)
