import { Button, Table } from '@material-ui/core';
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ViewandPredictTable  from '../Components/ViewandPredictTable'
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Input } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Controls from '../Components/Controls';
import { Search } from "@material-ui/icons";
import {toast} from 'react-toastify'
import * as CONST from '../const'
var url = CONST.ROOT_URL;

const useStyles = makeStyles(theme => ({  
  pageContent: {
      //margin: theme.spacing(5),
      // padding: theme.spacing(3)
  },
  newButton: {
    position: 'absolute',
    right: '10px',
    marginTop: theme.spacing(2)
},

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
searchInput:{
  margin: theme.spacing(3),
  width:'50ch'
  
},
paper:{
  margin: theme.spacing(15),
  marginLeft:'-300px'
}
}))
const cells = [
  { id: 'Name', label: 'Patient Name' },
  { id: 'Pid', label: 'Patient ID' },
  { id: 'Severity', label: 'Severity' },
  { id: 'SeverityType' , label:'Severity Type'},
  { id: 'actions', label: 'Actions'}
]





export default function ViewAndPredict() {

  const [predictPatient,SetpredictPatient] = useState([]);
  const[patientDetails,SetpatientDetails] = useState([]);
  const[filterval,Setfilterval] = useState({fn : item => {return item;}})

useEffect(()=> {
   axios.get(`${url}/fetchAllPatientDetails`)
  .then((response) => {
    const patientDetails= response.data.result;
    SetpatientDetails(patientDetails)
    console.log(patientDetails[0].allPatientInfo[0].patient_id);
  })
  .catch((err) => {
    console.log(err);
  })
}, [1])

const handleSearch = e =>{
  let target = e.target;
        Setfilterval({
            fn: item => {
                if (target.value == "")
                    return item;
                else
                    return item.filter(x => x.patientName.toLowerCase().includes(target.value))
            }
        })
}

  const classes = useStyles();
  
  const {
    TableContainer,
    TblHead,
    TblPagination,
    tablePagingandSorting
  } = ViewandPredictTable(patientDetails,cells,filterval);
    return (
      <>
      <Link to="/Add">
       <Button 
          variant="outlined"
          startIcon={<AddIcon />}
          className={classes.newButton} >Add new patient</Button>
        </Link> 
      <div>
       <Toolbar>
          <Controls.InputFields
            label="Search"
            className={classes.searchInput}
            InputProps={{
                        startAdornment: (<InputAdornment position="start">
                          <Search />
                          </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
        </Toolbar>
        </div>
       <div> 
        <Paper className={classes.paper} elevation={3}>
       <TableContainer>
       <TblHead />
       
         <TableBody>
             {
               
               tablePagingandSorting().map((patientDetails) =>
               (
               <TableRow key={patientDetails.id}>
               <TableCell>{patientDetails.patientName}</TableCell>
               <TableCell>{patientDetails.patientGenId}</TableCell>
               <TableCell>{
               patientDetails.allPatientInfo.map((item) => 
                                                        {return item.severityScore})}</TableCell>
              <TableCell>{
               patientDetails.allPatientInfo.map((item) => 
                                                          {return item.diagnosisType}
                                                              )}</TableCell>
                <TableCell>   
                    <Button 
                      variant="outlined"
                      //  startIcon={<SearchIcon />}
                      onClick={(event) =>{
                        event.preventDefault();
  
                        axios.post(`${url}/predict/${patientDetails.patientGenId}`)
                          .then((response) => {
                            console.log(response)
                            const predictPatient = response.data.result;
                            SetpredictPatient(predictPatient)
                            const CustomToast = ({closeToast})=>{
                              return(
                                <div style={{textAlign:"center"}}>
                                  <h4>Successfully Predicted with Score: {response.data.score}</h4>
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
       <div style={{marginBottom:'10px'}}>
       <TblPagination />
       </div>
       </Paper>
       </div>
       
    </>   
    );
}


