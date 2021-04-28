import React, { Component } from 'react';
import axios from "axios";
import './RegPatients.css';
import {toast} from 'react-toastify'

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
        axios.get(`http://localhost:9000/fetchPatientDetails/${this.state.setpatientID}`, )
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
      axios.post('http://localhost:9000/updateDiagnosis', {patientID,remarks})
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
      const imageData = new FormData();
      if (this.state.selectedFile) {
        imageData.append('retinaImage', this.state.selectedFile, this.state.selectedFile.name);
        axios.post(`http://localhost:9000/retinaImageUpload/${this.state.patientId}`, imageData, {
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
        console.log("File not providedd")
    }
  };

  handlePredict = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:9000/predict/${this.state.patientId}`)
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

    render() {
        return (
          <div className="rp">
            <form onSubmit={this.handleRetrieve} className="form-getDetails">
              <label style={{fontSize:20}}htmlFor="inputID" className="sr-only">Enter Patient ID</label>
              <input onChange={this.patientIDChangeHandler} value={this.state.setpatientID} type="number" name="patientID" className="form-control mb-3" required autoFocus autocomplete="off"/>
              <br></br>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Enter</button>
            </form>


            <br></br>
            {/* 'https://i.imgur.com/jFSkR3S.png' */}
            <img src={this.state.imageURL} alt="" height="300" style={{alignItems:'center'}}/>
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
                <label htmlFor="inputRemarks" className="sr-only">Remarks</label>
                <input onChange={this.remarksChangeHandler} value={this.state.remarks} type="text" name="remarks" className="form-control mb-3" autocomplete="off"/>
                <br></br>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>
            </form>

            <div className="card-body">
                        <p className="card-text">Please upload Retina image</p>
                        <input type="file" webkitdirectory onChange={this.singleFileChangedHandler} />
                        <div className="mt-5">
                            <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload Retina Image</button>
                        </div>
            </div>
            <br></br>
            <button className="btn btn-info" onClick={this.handlePredict}>Predict Retina Score</button>
          </div>
        );
      }
}
