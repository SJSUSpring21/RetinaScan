import React, { Component } from 'react';
import axios from "axios";
import './RegPatients.css';


export default class RegPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
          setpatientID: Number,
          patientID: Number,
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
          remarks: String,
          imageURL: String,  
        };
    }


    handleRetrieve = (e) => {
        e.preventDefault();


        axios.post('http://localhost:9000/', this.state.setpatientID)
          .then((response) => {
            
          });
    }


    handleUpdate = (e) => {
        e.preventDefault();


        axios.post('http://localhost:9000/', this.state.patientID)
          .then((response) => {
            
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


    render() {
        return (
          <div className="rp">
            <form onSubmit={this.handleRetrieve} className="form-getDetails">
              <label htmlFor="inputID" className="sr-only">Patient ID</label>
              <input onChange={this.patientIDChangeHandler} value={this.state.setpatientID} type="number" name="patientID" className="form-control mb-3" required autoFocus autocomplete="off"/>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Enter</button>
            </form>


            <br></br>
            <img src={this.state.imageURL}/>
            <form onSubmit={this.handleUpdate} className="form-update">
                <p>Patient ID: {this.state.patientID}</p>
                <p>Patient Name: {this.state.patientName}</p>
                <p>Age: {this.state.age}</p>
                <p>Gender: {this.state.gender}</p>
                <p>Diabetes Type: {this.state.dType}</p>
                <p>Diagnosed Year: {this.state.diagnosedYear}</p>
                <p>Sugar Level: {this.state.sugarLevel}</p>
                <p>Cholestrol Level: {this.state.cholestrolLevel}</p>
                <p>Blood Pressure: {this.state.bloodPressure}</p>
                <p>Tobacco User: {this.state.tobaccoUser}</p>
                <p>Severity Score: {this.state.severityScore}</p>
                <p>Remarks:</p>
                <label htmlFor="inputRemarks" className="sr-only">Remarks</label>
                <input onChange={this.remarksChangeHandler} value={this.state.remarks} type="text" name="remarks" className="form-control mb-3" autocomplete="off"/>
                <br></br>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>
               
            </form>
            <a className="btn btn-lg btn-success btn-block" href="/patients">Close</a>
          </div>
        );
      }
}
