import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            selectedFiles: null
        }
    }

    singleFileChangedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    singleFileUploadHandler = (event) => {
        const imageData = new FormData();
        if (this.state.selectedFile) {
            imageData.append("patientId", 1234);
            imageData.append('retinaImage', this.state.selectedFile, this.state.selectedFile.name);
            axios.post('http://localhost:5000/retinaImageUpload', imageData, {
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
                            if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                                this.displayAlert('Max size: 2MB', 'red');
                            } else {
                                console.log("Printing response data" + response.data);
                                // If not the given file type
                                this.displayAlert(response.data.error, 'red');
                            }
                        } else {
                            let fileName = response.data;
                            console.log('fileName', fileName);
                            this.displayAlert('File Uploaded', '#3089cf');
                        }
                    }
                }).catch((error) => {
                    this.displayAlert(error, 'red');
                });
        } else {
            this.displayAlert('Please upload file', 'red');
        }
    };

    displayAlert = (message, background = '#3089cf') => {
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

    render() {
        return (
            <div className="container">
                <div id="alert-container"></div>
                <div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
                    <div className="card-header">
                        <h3 style={{ color: '#555', marginLeft: '12px' }}>Single Image Upload</h3>
                        <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Please upload retina image</p>
                        <input type="file" webkitdirectory onChange={this.singleFileChangedHandler} />
                        <div className="mt-5">
                            <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload Retina Image</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageUpload;