import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";
import { Label, Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import ReactTimeout from 'react-timeout'

import CodeDisplay from "./CodeDisplay.js";
import AssemblyLanguageInstructions from "./AssemblyLanguageInstructions.js";
import DataDisplay from "./DataDisplay.js";
import FileUploadButton from "./CodeDisplayContents/FileUploadButton.js"

let successfulCompilationNoti = "Compilation Successful!";
let OP_REGS = [
  // May have to explicitly declare these as registers.
  { name: "R0", value: 1 },
  { name: "R1", value: 2 },
  { name: "R2", value: 3 },
  { name: "R3", value: 5 },
];

let UTIL_REGS = [
  { name: "PC", value: "x0" },
  { name: "PSW", value: 0 },
  { name: "IR", value: 0 },

];

var InstrTypes = {
  NONE: "X",
  REGISTER: "R",
  IMMEDIATE: "I",
  JUMP: "J",

};


let compiledCode = [];
let instructions = [];
let execTime = 1000;
let armInstrs = new AssemblyLanguageInstructions();

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      codeDisplayWidth: window.innerWidth/2,
      notification : "",
      code : "",
      operationRegs : OP_REGS,
      utilRegs : UTIL_REGS,
      currLine : 0,
      timer : 3,
    }

  }

  myTimer( e){


  }


  updateDimensions(){
    this.setState({width : (window.innerWidth/2)})
  }


  componentDidMount(){
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  handleChange(e){
      this.setState({code: e});
  }


  setNotification(notification){
      this.setState({notification});
  }

  setTimer(timer){
    this.setState({timer});
  }

  render() {
    return (
      <div>
              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    CS101 Honors Web App
                  </Navbar.Brand>
                </Navbar.Header>
              </Navbar>
              <Grid>
                <Row>
                  <Col md={6} sm={6} lg = {6}>
                    <CodeDisplay width = {this.state.codeDisplayWidth +"px"}
                                 timer = {this.state.timer}
                                 timerChange = {this.setTimer.bind(this)}
                                 compileCode = {this.compileCode.bind(this)}
                                 changeCode = {this.handleChange.bind(this)}
                                 changeNoti = {this.setNotification.bind(this)}
                                 playCode = {this.executeCode.bind(this)}
                                 code = {this.state.code}
                                 notification = {this.state.notification}
                                />
                  </Col>
                  <Col md={6} sm={6} lg = {6}>
                    <DataDisplay
                        opRegs = {this.state.operationRegs}
                        utilRegs = {this.state.utilRegs}
                    />
                  </Col>
                </Row>
              </Grid>
      </div>
    );
  }


  executeCode(){
    for (var i = 0; i < instructions.length; i ++){

      let z = i+1;

      let instruct = instructions[i];

      let instr = instruct[0];
      let reg1Info = instruct[1];
      let reg2Info = instruct[2];
      let regDestInfo = instruct[3];
      let immediateInfo = instruct[4];
      let addressInfo = instruct[5]

      let reg1 = null;
      let reg2 = null;
      let regDest = null;
      let immediate = null;
      let address = null;

      var home = this;

      setTimeout((function(){
         if(reg1Info != null){
           reg1 = OP_REGS[parseInt(reg1Info.substr(-1))];
         }

         if(reg2Info != null){
           reg2 = OP_REGS[parseInt(reg2Info.substr(-1))];
         }

         if(regDestInfo != null){
           regDest = OP_REGS[parseInt(regDestInfo.substr(-1))];
         }
         if(immediateInfo != null){
           immediate = parseInt(immediateInfo);
         }

         if(addressInfo != null){
           address = parseInt(address);
         }

         // console.log("Reg1:",reg1); console.log("Reg2:",reg2); console.log("RegDest:",regDest); console.log("Immeidate:",immediate);

         armInstrs.executeInstruction(instr, reg1, reg2, regDest, immediate, address);
         armInstrs.STORE(z, UTIL_REGS[2])
         home.setState({operationRegs : OP_REGS,  currLine : z-1});


    }), execTime * this.state.timer * z);



    }
  }

compileCode(){
      this.resetRegisters()
      this.setState({operationRegs : OP_REGS});

      instructions = []; // Reset instructions.

      let rawCode = this.state.code.replace(/(\r\n|\n|\r)/gm,"");

      if(!rawCode.includes(";")){
        this.setNotification("Make sure you end your lines with ;");
      }
      compiledCode = rawCode.split(";");
      compiledCode.splice(-1, 1); //For some reason there is always an extra space character at the end. This deals with that.

      for (var i = 0; i < compiledCode.length ; i ++){

        let e = compiledCode[i];
        e = e + " ";
        let op = "";


        op = e.substring(0, e.indexOf(" "));

        //Get the Operation and determine if it's an R, I or J instruction.
        let opType = armInstrs.getMethodType(op);
        console.log(opType);
        if(opType == InstrTypes.NONE){
            this.setNotification("Operation in line " + (i+1) + " is not found");
            break;
        }
        if(opType == InstrTypes.IMMEDIATE){
          /**
            Process an I instruction
          */

          let rs = "";
          let rd = "";
          let im = "";

          let regExists = false;

          e = e.substring(e.indexOf(" ")+1, e.length);
          rs = e.substring(0, e.indexOf(" "));

          regExists = this.testForRegisterPresence(rs);

          if(!regExists /*The Source Register does not exist*/){
            this.setNotification("Source Register in line " + (i+1) + " does not exist");
            break;
          }

          e = e.substring(e.indexOf(" ")+1, e.length);
          rd = e.substring(0, e.indexOf(" "));

          regExists = this.testForRegisterPresence(rd);
          if(!regExists /*The Value Register does not exist*/){

            this.setNotification("Dest Register in line " + (i+1) + " does not exist");
            break;

          }

          e = e.substring(e.indexOf(" ")+1, e.length);
          im = e.substring(0, e.indexOf(" "));

          e = e.substring(e.indexOf(" ")+1, e.length);
          // Trim out all the spaces and new lines.
          e = e.trim();
        //    console.log("Op : " + op + " rs " + rs + " rt : " + rt + " rd : " + rd);

          instructions.push([op, rs, null, rd , im, null]);
          this.setNotification(successfulCompilationNoti);
        }
        else if(opType == InstrTypes.REGISTER){

            /**
              Process an R instruction
            */

            let rs = "";
            let rt = "";
            let rd = "";

            let regExists = false;

            e = e.substring(e.indexOf(" ")+1, e.length);
            rs = e.substring(0, e.indexOf(" "));

            regExists = this.testForRegisterPresence(rs);

            if(!regExists /*The Source Register does not exist*/){
              this.setNotification("Source Register in line " + (i+1) + " does not exist");
              break;
            }

            e = e.substring(e.indexOf(" ")+1, e.length);
            rt = e.substring(0, e.indexOf(" "));

            regExists = this.testForRegisterPresence(rt);
            if(!regExists /*The Value Register does not exist*/){

              this.setNotification("Value Register in line " + (i+1) + " does not exist");
              break;

            }
            e = e.substring(e.indexOf(" ")+1, e.length);
            rd = e.substring(0, e.indexOf(" "));

            regExists = this.testForRegisterPresence(rd);
            if(!regExists /*The Value Register does not exist*/){

              this.setNotification("Destination Register in line " + (i+1) + " does not exist");
              break;

            }

            e = e.substring(e.indexOf(" ")+1, e.length);
            // Trim out all the spaces and new lines.
            e = e.trim();
        //    console.log("Op : " + op + " rs " + rs + " rt : " + rt + " rd : " + rd);

            instructions.push([op, rs, rt, rd, null, null]);

            this.setNotification(successfulCompilationNoti);

      }
      else if (opType == InstrTypes.JUMP) {
            /**
              Process a Jump instruction
            */

            let address = "";

            e = e.substring(e.indexOf(" ")+1, e.length);
            address = e.substring(0, e.indexOf(" "));

            e = e.substring(e.indexOf(" ")+1, e.length);
            // Trim out all the spaces and new lines.
            e = e.trim();
        //    console.log("Op : " + op + " rs " + rs + " rt : " + rt + " rd : " + rd);

            instructions.push([op, null, null, null, null, address]);

            this.setNotification(successfulCompilationNoti);
      }


    }


  }

  resetRegisters(){
      for (var i = 0; i < OP_REGS.length; i++){
        armInstrs.STORE(0, OP_REGS[i]);
      }

      for (var i = 1; i < UTIL_REGS.length; i++){
        armInstrs.STORE(0, UTIL_REGS[i]);
      }
  }

  testForRegisterPresence(reg){

    if (reg.length > 2){
      return false;
    }

    if(reg.substr(0,1) != "R"){
      return false;
    }

    let loc = 0;

    try {
      loc = parseInt(reg.substr(-1))
    }
    catch(err) {
      return false;
    }
    if ( loc < OP_REGS.length & loc >= 0){
      return true;
    }
  }

}



export default App;
