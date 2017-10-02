import React from "react";
import AceEditor from 'react-ace';
import { Label, Navbar, NavItem, Nav, Grid, Row, Col , Button} from "react-bootstrap";

export default class CodeEditor extends React.Component {

  constructor(props){
    super(props);

  }

  onEditorChange(e){
    this.props.changeCode(e);
  }

  render(){
    return(
      <div>
      <AceEditor
         mode="python"
         theme="solarized_dark"
         onChange={this.onEditorChange.bind(this)}
         width = {this.props.width}
         name="UNIQUE_ID_OF_DIV"
         editorProps={{$blockScrolling: true}}
        />

         <Button onClick = {this.props.compileCode} bsStyle="success" bsSize="large">Compile Code</Button>
         {this.props.notification}
      </div>
    )
  }
}
