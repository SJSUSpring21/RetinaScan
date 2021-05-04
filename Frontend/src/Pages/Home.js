import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import {Scatter, Bar} from 'react-chartjs-2';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            severityScore: [],
            aggSS: [],
            systolicbloodPressure: [],
            diastolicbloodPressure: [],
            cholestrolLevel: [],
            bloodSugarLevel: []
        };
    }

    componentDidMount(){
        axios.get('http://localhost:9000/fetchAllPatientDetails')
        .then((response)=>{
            let ss = []
            let sbp = []
            let dbp = []
            let cl = []
            let sl = []
            let sevScore = []
            const details= response.data.result;
            for (var i=0;i<details.length;i++){
                sbp.push(details[i].systolicbloodPressure)
                dbp.push(details[i].diastolicbloodPressure)
                cl.push(details[i].cholestrolLevel)
                ss.push(details[i].allPatientInfo[0].severityScore)
                sl.push(details[i].bloodSugarLevel)
            }

            var counts = {}, j, value;
            for (j = 0; j < ss.length; j++) {
                value = ss[j];
                if (typeof counts[value] === "undefined") {
                    counts[value] = 1;
                } else {
                    counts[value]++;
                }
            }

            sevScore.push(counts[0])
            sevScore.push(counts[1])
            sevScore.push(counts[2])
            sevScore.push(counts[3])
            sevScore.push(counts[4])

            this.setState({
                severityScore:ss,
                aggSS: sevScore,
                systolicbloodPressure: sbp,
                diastolicbloodPressure: dbp,
                cholestrolLevel: cl,
                bloodSugarLevel: sl
            })
        }).catch((err) => {
            console.log(err);
          })
    }
    

    render() {
        return (
            <div className="home">
                <h1>RetinaScan</h1>
                <h1>Count by Severity Score</h1>
                <Bar
                    data = {{
                        labels: [0,1,2,3,4],
                        datasets: [
                          {
                            label:'Total Patients',
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            data: this.state.aggSS
                            //data: [21, 7, 12, 5, 5]
                          }
                        ]
                      }
                    }
                    width={40}
                    height={10}
                
                />

                <br></br>
                <h1>Cholesterol vs Severity Score</h1>
                <Scatter
                    data = {{
                        labels: this.state.severityScore,
                        datasets: [
                          {
                            label:'Cholesterol Level',
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: 'rgba(75,192,192,1)',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 5,
                            pointHitRadius: 10,
                            data: this.state.cholestrolLevel
                          }
                        ]
                      }
                    }
                    width={30}
                    height={10}
                                   
                
                
                />

                <br></br>
                <h1>Systolic Blood Pressure vs Severity Score</h1>
                <Scatter
                    data = {{
                        labels: this.state.severityScore,
                        datasets: [
                          {
                            label:'Systolic Blood Pressure',
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: 'rgba(75,192,192,1)',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 5,
                            pointHitRadius: 10,
                            data: this.state.systolicbloodPressure
                          }
                        ]
                      }
                    }
                    width={30}
                    height={10}
                
                />

                <br></br>
                <h1>Diastolic Blood Pressure vs Severity Score</h1>
                <Scatter
                    data = {{
                        labels: this.state.severityScore,
                        datasets: [
                          {
                            label:'Diastolic Blood Pressure',
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: 'rgba(75,192,192,1)',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 5,
                            pointHitRadius: 10,
                            data: this.state.diastolicbloodPressure
                          }
                        ]
                      }
                    }
                    width={30}
                    height={10}
                />
                <br></br>
                
            </div>
          );
        }
}
