import React, { Component } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import './RegPatients.css';
import {toast} from 'react-toastify'
import * as CONST from '../const'
var url = CONST.ROOT_URL;


export default class RegPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
          setpatientID: Number,
          patientId: Number,
          patientName: String,
          age: Number,
          gender: String,
          dType: String,
          diagnosedYear: Number,
          sugarLevel: Number,
          cholestrolLevel: Number,
          bloodPressure: Number,
          tobaccoUser: String,
          severityScore: Number,
          severityType: String,
          previousRemarks: String,
          remarks: String,
          imageURL: String,  
          selectedFile: null,
        };
    }


    handleRetrieve = (e) => {
        e.preventDefault();
        axios.get(`${url}/fetchPatientDetails/${this.state.setpatientID}`, )
        //axios.get(`${url}/fetchPatientDetails/${this.state.setpatientID}`, )
          .then((response) => {
            const details = response.data.result
            console.log(details)
            if(details.length>0){
              this.setState({
                setpatientID: Number,
                patientId: details[0].patientGenId,
                patientName: details[0].patientName,
                age: details[0].age,
                gender: details[0].gender,
                dType: details[0].diabetesType,
                diagnosedYear: details[0].yearOfDiabetes,
                sugarLevel: details[0].bloodSugarLevel,
                cholestrolLevel: details[0].cholestrolLevel,
                systolicbloodPressure: details[0].systolicbloodPressure,
                diastolicbloodPressure: details[0].diastolicbloodPressure,
                tobaccoUser: details[0].isTobaccoUser.toString(),
                severityScore: details[0].patientInfo[0].severityScore,
                severityType: details[0].patientInfo[0].diagnosisType,
                previousRemarks: details[0].patientInfo[0].comments,
                imageURL: details[0].patientInfo[0].imageUrl,  
              })
            }
          });
    }


    patientIDChangeHandler = (e) => {
        this.setState({
          setpatientID: e.target.value
        });
    }


    remarksChangeHandler = (e) => {
        this.setState({
          remarks: e.target.value
        });
    }

    handleUpdate = (e) => {
      e.preventDefault();
      const patientID = this.state.patientId
      const remarks = this.state.remarks
      axios.post(`${url}/updateDiagnosis`, {patientID,remarks})
        .then((response) => {
          console.log(response)
          this.setState({previousRemarks: remarks,remarks:''})  
        });
  }

    singleFileChangedHandler = (event) => {
      this.setState({
          selectedFile: event.target.files[0]
      });
    };

    singleFileUploadHandler = (event) => {
      const imageData = new FormData()
      const check = this.state.patientId!==Number
      if (this.state.selectedFile && check) {
        imageData.append('retinaImage', this.state.selectedFile, this.state.selectedFile.name);
        axios.post(`${url}/retinaImageUpload/${this.state.patientId}`, imageData, {
          headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${imageData._boundary}`,
          }
      })
            .then((response) => {
                if (200 === response.status) {
                    //file size is larger than 2MB.
                    if (response.data.error) {
                      console.log(response)
                    } else {
                        let fileName = response.data;
                        console.log('fileName', fileName);
                        this.setState({
                          imageURL: response.data.imageLocation
                        })
                        // this.displayAlert('File Uploaded', '#3089cf');
                        const CustomToast = ({closeToast})=>{
                          return(
                            <div style={{textAlign:"center"}}>
                              <h4>Successfully Uploaded the Image!</h4>
                            </div>
                          )
                        }
                        toast.success(<CustomToast />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})
                    }
                }
            }).catch((error) => {
              console.log(error)
              const CustomToast1 = ({closeToast})=>{
                return(
                  <div style={{textAlign:"center"}}>
                    <h4>Error while Uploading the Image!</h4>
                  </div>
                )
              }
              toast.error(<CustomToast1 />, {position: toast.POSITION.TOP_CENTER, autoClose:true})
            });
    } else {
        console.log("File or patient ID not provided")
        const CustomToast1 = ({closeToast})=>{
          return(
            <div style={{textAlign:"center"}}>
              <h4>File or patient ID not provided!</h4>
            </div>
          )
        }
        toast.error(<CustomToast1 />, {position: toast.POSITION.TOP_CENTER, autoClose:true})
    }
  };

  handlePredict = (e) => {
    e.preventDefault();
    if (this.state.patientId!==Number){
      axios.post(`${url}/predict/${this.state.patientId}`)
      .then((response) => {
        console.log(response)
        this.setState({
          severityScore: response.data.score,
          severityType: response.data.sevType
        })
        const CustomToast = ({closeToast})=>{
          return(
            <div style={{textAlign:"center"}}>
              <h4>Successfully Predicted with Score: {this.state.severityScore}</h4>
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
    else{
      console.log("Patient Id not provided")
      const CustomToast1 = ({closeToast})=>{
        return(
          <div style={{textAlign:"center"}}>
            <h4>Patient Id not provided!</h4>
          </div>
        )
      }
      toast.error(<CustomToast1 />, {position: toast.POSITION.TOP_CENTER, autoClose:true})
    }
    
  }

    render() {
        return (
          <div className="rp">
            <form onSubmit={this.handleRetrieve} className="form-getDetails">
              <label style={{fontSize:20}}htmlFor="inputID">Enter Patient ID</label>
              <div className="inline">
                <input style={{width:400}} onChange={this.patientIDChangeHandler} value={this.state.setpatientID} type="number" name="patientID" className="form-control mb-3" required autoFocus autocomplete="off"/>
                <Button variant="contained" color="primary"className="btn btn-patient btn-lg btn-primary" type="submit" style={{width:200, height:'40px', fontSize: 20}}>Enter</Button>
              </div>

            </form>
            <br></br>
            <div className="details">
              <div className="imgc">
                <img src={this.state.imageURL} alt="" height="400"/>
              </div>
              
              <form onSubmit={this.handleUpdate} className="form-update">
                  <p>Patient ID: {this.state.patientId}</p>
                  <p>Patient Name: {this.state.patientName}</p>
                  <p>Age: {this.state.age}</p>
                  <p>Gender: {this.state.gender}</p>
                  <p>Diabetes Type: {this.state.dType}</p>
                  <p>Diagnosed Year: {this.state.diagnosedYear}</p>
                  <p>Sugar Level (mg/dL): {this.state.sugarLevel}</p>
                  <p>Cholestrol Level (mg/dL): {this.state.cholestrolLevel}</p>
                  <p>Systolic Blood Pressure (mm Hg): {this.state.systolicbloodPressure}</p>
                  <p>Diastolic Blood Pressure (mm Hg): {this.state.diastolicbloodPressure}</p>
                  <p>Tobacco User: {this.state.tobaccoUser}</p>
                  <p>Severity Score: {this.state.severityScore}</p>
                  <p>Severity Type: {this.state.severityType}</p>
                  <p>Previous Remarks: {this.state.previousRemarks}</p>
                  <label htmlFor="inputRemarks">Remarks:</label>
                  <input onChange={this.remarksChangeHandler} value={this.state.remarks} type="text" name="remarks" className="form-control mb-3" autocomplete="off"/>
                  <br></br>
                  <Button variant="contained" color="primary" className="btn btn-patient2 btn-lg btn-primary" type="submit" style={{width:200,height:'40px', marginTop:'6px' , fontSize: 20}}>Update</Button>
              </form>
              </div>
            <br></br>
            <div className="card-body">
              <p style={{fontSize: 20}}>Upload Retina Image</p>
              <input type="file" webkitdirectory onChange={this.singleFileChangedHandler} />
              <br></br>
              <div className="mt-5">
              <Button variant="contained" color="primary" className="btn btn-action btn-lg btn-info" onClick={this.singleFileUploadHandler} style={{width:200, height:'40px', marginTop:'6px', fontSize: 20}}>Upload</Button>
              </div>

            </div>
            <br></br>

            <div className="pbut">
            <p style={{fontSize: 20}}>Predict Retina Score</p>
            <Button variant="contained" color="primary" className="btn btn-action btn-lg btn-info" onClick={this.handlePredict} style={{width:200, fontSize: 20}}>Predict</Button>
            </div>
              

            
           
          </div>
        );
      }
}
