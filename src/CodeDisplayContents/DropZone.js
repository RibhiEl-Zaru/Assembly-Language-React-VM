import React from "react";
import Dropzone from 'react-dropzone';

let filesToSend = [];

const dropzoneStyle = {
    width  : "100%",
    height : "20%",
    border : "1px solid black"
};
export default class DropZone extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      filesToBeSent: this.props.fileArray,
    }
  }


  onDrop(acceptedFiles, rejectedFiles){
      filesToSend = []; // Done because at the moment we really only want 1 file.
      if(acceptedFiles[0] !== undefined){
        filesToSend.push(acceptedFiles[0]);
        this.setState({filesToBeSent : filesToSend});
        this.props.setFiles(filesToSend);
        this.props.changeNoti("File successfully uploaded");
      }else{
        this.props.changeNoti("File of that type cannot be uploaded.");
      }

    }

  render(){
    return(
     <div className="dropZone">
      <Dropzone
          accept = "text/plain"
          style={dropzoneStyle}
          onDrop={(files) => this.onDrop(files)}>
                <div>Drop .txt files here, or click to select .txt file to upload.</div>
      </Dropzone>
     </div>

    )
  }
}
