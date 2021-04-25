import { Button, Table } from '@material-ui/core';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ViewandPredictTable  from '../Components/ViewandPredictTable'
import { makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import SearchIcon from '@material-ui/icons/Search';

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
  position: 'absolute',
  right: '150px',
  margin: theme.spacing(70),
  marginBottom: theme.spacing(10)
},
predictButton:{
  position: 'absolute',
  right: '10px',
  margin: theme.spacing(70),
  marginBottom: theme.spacing(10) 
}
}))
const cells = [
  { id: 'Name', label: 'Patient Name' },
  { id: 'Pid', label: 'Patient ID' },
  { id: 'Severity', label: 'Severity' },
  { id: 'actions', label: 'Actions',}
]
function ViewAndPredict() {
  
  const classes = useStyles();
  const [records, setRecords] = useState();
  const {
    TableContainer,
    TblHead
  } = ViewandPredictTable(records,cells);
    return (
       <>
       <Link to="/Add">
       <Button 
          variant="outlined"
          startIcon={<AddIcon />}
          className={classes.newButton} >Add new patient</Button>
        </Link>  
       <TableContainer>
       <TblHead />
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
