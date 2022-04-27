import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import '../Less/app.less';

interface IImportPageProps { }

const ImportPage: React.FunctionComponent<IImportPageProps> = (props) => {
    const [selectedFile, setSelectedFile] = React.useState(null);

    // On file select (from the pop up)
    const onFileChange = (event: any): void => {
        // Update the state
        setSelectedFile(event.target.files[0])
    };

    // File content to be displayed after
    // file upload is complete
    const fileData = () => {

        if (selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {selectedFile?.name ?? ''}</p>


                    <p>File Type: {selectedFile.type}</p>


                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    // On file upload (click the upload button)
    const onFileUpload = (): void => {

        // Create an object of formData
        const formData = new FormData();

        // // Update the formData object
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        // Details of the uploaded file
        console.log(selectedFile);

        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);
    };
    return (
        <div>
            <div>
                <div>
                    <input type="file" onChange={onFileChange} />
                    <div>
                        <button onClick={onFileUpload}>Upload!</button>
                    </div>
                </div>
                {fileData()}
            </div>
        </div>
    );
}

export default ImportPage;
