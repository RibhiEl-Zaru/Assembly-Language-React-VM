import React from "react";
import Dropzone from 'react-dropzone';
import '../App.css';
import { ButtonGroup, ButtonToolbar, Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";
import Center from 'react-center';
import FileUploadButton from "./FileUploadButton.js"

// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider'

// To include the default styles
import 'react-rangeslider/lib/index.css'

export default class ControlConsole extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      seconds : this.props.timer,
    }

  }

  handleChange(e){

  }

  onIncrement = (value) =>{
    this.props.timerChange(value);
  }
  onPlay = (value)=> {
    this.props.playCode();
  }

  onStop(){

  }

  onStep(){

  }

  render(){
    return(
    <div>

    <Grid>


       <Row className="show-grid">
         <Center>
       <Col xs={3} md={3}  lg = {3}>
       <Center>
            <ButtonToolbar>
               <Button onClick = {this.onPlay.bind(this)} bsSize="medium" bsStyle="success">Play</Button>
               <Button onClick = {this.props.stopCode} bsSize="medium" bsStyle="primary">Stop</Button>
               <Button onClick = {this.props.stepCode} bsSize="medium" bsStyle="danger">Step</Button>
           </ButtonToolbar>
          </Center>
        </Col>
      </Center>
       </Row>
       <p>
       </p>
       <Row className="show-grid">
        <Center>
          <ButtonToolbar>
            <Button onClick = {this.props.compileCode} bsStyle="success" bsSize="medium">Compile</Button>
            <Button onClick = {this.props.compileCode} bsStyle="info" bsSize="medium">Reset</Button>
          </ButtonToolbar>
         </Center>
       </Row>

       <Row className="show-grid">
        <Center>
          <Col xs={2} md={2}>

            <Slider
                min = {1}
                max = {10}
                value={this.props.timer}
                orientation="horizontal"
                onChange={this.onIncrement}
             >
             </Slider>
         </Col>
         </Center>
        </Row>
        <Row className="show-grid">

        <Center>
          <FileUploadButton
            changeNoti = {this.props.changeNoti}
            fileArray = {this.props.fileArray}
            setFiles = {this.props.setFiles}
          />
        </Center>
        </Row>
     </Grid>
    </div>
    )
  }
}
