import React from "react";
import Dropzone from 'react-dropzone';
import '../App.css';
import { ButtonGroup, ButtonToolbar, Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";
import Center from 'react-center';

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
  onPlay(){

  }

  onStop(){

  }

  onStep(){

  }

  render(){
    return(

      <div>
        Seconds between calls:
          <Slider
              min = {1}
              max = {10}
              value={this.props.timer}
              orientation="horizontal"
              onChange={this.onIncrement}
           />
           <p>
           <ButtonToolbar>
                   <Button onClick = {this.props.playCode} bsSize="small" bsStyle="success">Play</Button>
                   <Button onClick = {this.props.stopCode} bsSize="small" bsStyle="primary">Stop</Button>
                   <Button onClick = {this.props.stepCode} bsSize="small" bsStyle="danger">Step</Button>
           </ButtonToolbar>
           </p>
           <p>
             <Center>
               <Button onClick = {this.props.compileCode} bsStyle="success" bsSize="medium">Compile Code</Button>
             </Center>
           </p>
    </div>
    )
  }
}

/*


<Slider

<ButtonToolbar>
        <Button onClick = {this.props.playCode} bsSize="small" bsStyle="success">Play</Button>
        <Button onClick = {this.props.stopCode} bsSize="small" bsStyle="primary">Stop</Button>
        <Button onClick = {this.props.stepCode} bsSize="small" bsStyle="danger">Step</Button>
</ButtonToolbar>
</p>
<p>
  <Center>
    <Button onClick = {this.props.compileCode} bsStyle="success" bsSize="medium">Compile Code</Button>
  </Center>
</p>
*/

/*
<div>
<Grid>
<Row className="show-grid">
<Col xs={6} md={4}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
<Col xs={6} md={4}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
<Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
</Row>

<Row className="show-grid">
<Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
<Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
<Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
</Row>

<Row className="show-grid">
<Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
</Row>

<Row className="show-grid">
<Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
<Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
</Row>
</Grid>*/
