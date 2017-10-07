import React from "react";
import AceEditor from 'react-ace';
import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";
import Center from 'react-center';
import DropZone from "./CodeDisplayContents/DropZone.js"
import ControlConsole from "./CodeDisplayContents/ControlConsole.js"

import FileUploadButton from "./CodeDisplayContents/FileUploadButton.js"
//import ReactFileReader from 'react-file-reader';
//import CodeEditor from "./CodeDisplayContainer/CodeEditor.js";

export default class CodeDisplay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fileArray: [],
    }
  }

  onEditorChange(e){
    this.props.changeCode(e);
  }


  render(){
    return(
      <div id = "parent">

        <div id = "editor">

          <AceEditor
             mode="python"
             fontSize= "16pt"
             theme="solarized_dark"
             onChange={this.onEditorChange.bind(this)}
             width = {this.props.width/2}
             value = {this.props.code}
             name="UNIQUE_ID_OF_DIV"
             editorProps={{$blockScrolling: true}}
            />

      </div>

      <div id = "notification" >
           <Center> {this.props.notification}  </Center>
      </div>

      <div id = "ControlConsole">
          <Center>

              <ControlConsole
                    compileCode = {this.props.compileCode}
                    changeNoti = {this.props.changeNoti}
                    fileArray = {this.state.fileArray}
                    playCode = {this.props.playCode}
                    timer = {this.props.timer}
                    setFiles = {this.onFileDrop.bind(this)}
                    timerChange = {this.props.timerChange}
                    />
          </Center>
      </div>
      </div>
    )
  }



    onFileDrop(fileArray){
      this.setState({fileArray});

      fileArray.forEach(file => {
        const reader = new FileReader();

        reader.onload = () => {
          const fileAsBinaryString = reader.result;

          this.props.changeCode( fileAsBinaryString);
        }
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);
      })

      const reader = new FileReader();
    }
}
