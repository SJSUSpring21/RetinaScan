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
import $ from 'jquery';

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

  const[patientDetails,SetpatientDetails] = useState();

useEffect(()=> {
   axios.get('http://localhost:9000/fetchAllPatientDetails')
  .then((response) => {
    const [patientDetails]=response.data.result;
    SetpatientDetails({
      ...patientDetails,
      severityScore: response.data[0].severityScore,
      severityType: response.data[0].severityType
    })
  })
  .catch((err) => {
    console.log(err);
  })
}, [])
  
const uploadImageHandle = async() =>{
  const imageData = new FormData();
  axios.post('http://localhost:5000/retinaImageUpload', imageData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${imageData._boundary}`,
                }
            })
                .then((response) => {
                    if (200 === response.status) {                        
                        if (response.data.error) {
                            if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                                displayAlert('Max size: 2MB', 'red');
                            } else {
                                console.log("Printing response data" + response.data);
                                displayAlert(response.data.error, 'red');
                            }
                        } else {
                            let fileName = response.data;
                            console.log('fileName', fileName);
                            displayAlert('File Uploaded', '#3089cf');
                        }
                    }
                }).catch((error) => {
                    displayAlert(error, 'red');
                });
              };
        // }, else {
        //     displayAlert('Please upload file', 'red');
        // }
   

const displayAlert = (message, background = '#3089cf') => {
  let alertContainer = document.querySelector('#alert-container'),
      alertEl = document.createElement('div'),
      textNode = document.createTextNode(message);
  alertEl.setAttribute('class', 'oc-alert-pop-up');
  $(alertEl).css('background', background);
  alertEl.appendChild(textNode);
  alertContainer.appendChild(alertEl);
  setTimeout(function () {
      $(alertEl).fadeOut('slow');
      $(alertEl).remove();
  }, 3000);
};

const predictHandle = async() => {
  axios.post(`http://localhost:9000/predict/${patientDetails.patientID}`)
  .then((response)=>console.log(response))
  .catch((err)=>console.log(err))
}


  
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
              patientDetails.map(item =>
              (<TableRow key={item.id}>
                <TableCell>{item.patientname}</TableCell>
                <TableCell>{item.patientId}</TableCell>
                <TableCell>{item.severityScore}</TableCell>
                <TableCell>{item.severityType}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={uploadImageHandle}
                    text="Upload" />
                    
                    <Controls.ActionButton
                    color="secondary"
                    onClick={predictHandle}
                    text="Predict" />
                    
                </TableCell>
              </TableRow>

            )) 
              } 
        </TableBody>
       
       </TableContainer>
       <Button 
          variant="outlined"
          startIcon={<PublishIcon />}
          className={classes.uploadButton} >Upload </Button>
        <Button 
          variant="outlined"
          startIcon={<SearchIcon />}
          className={classes.predictButton} >Predict </Button>
       
       </> 
    )
}

export default withRouter(ViewAndPredict)
