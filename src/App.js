import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';
// import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";
import { Label, Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import ReactTimeout from 'react-timeout'
import Center from 'react-center';
import CodeDisplay from "./CodeDisplay.js";
import AssemblyLanguageInstructions from "./AssemblyLanguageInstructions.js";
import DataDisplay from "./DataDisplay.js";
import FileUploadButton from "./CodeDisplayContents/FileUploadButton.js"
import Header from "./Header.js"

let successfulCompilationNoti = "Compilation Successful!";
let OP_REGS = [
  // May have to explicitly declare these as registers.
  { name: "R0", value: 0},
  { name: "R1", value: 0 },
  { name: "R2", value: 0 },
  { name: "R3", value: 0 },
];

let UTIL_REGS = [
  { name: "PC", value: "x0"  }, // Holds the address in RAM of the next instruction to be executed
  { name: "PSW", value: 0    }, //the PSW (or program status word) register holds information about the outcomes of comparisons, etc
  { name: "RA", value: 0     }, // the RA (or return address) register holds the address of the instruction to return to after a JSR.
  { name: "RZ", value: 0     }, // the Zero register holds the constant 0.

];

let MEMORY_OPS = [{instruction: "STR RO R1", address: "x04", value: 5}, {instruction: "STR RO R1", address: "x04", value: 5} ];

var InstrTypes = {
  NONE:      "X",
  REGISTER:  "R",
  IMMTRANSFER:  "TI",
  REGTRANSFER:  "TR",
  MEMORY:    "M",
  BREAK:     "B",
  EMPTY:     "E",
  COMPARE:    "C",



};


let compiledCode = [];
let instructions = [];
let execTime = 1000;
let armInstrs = new AssemblyLanguageInstructions(UTIL_REGS);

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      codeDisplayWidth: window.innerWidth/2,
      notification : "",
      code : "",
      operationRegs : OP_REGS,
      utilRegs : UTIL_REGS,
      memoryOps : MEMORY_OPS,
      currLine : 0,
      timer : 3,
    }

  }



    render() {
      return (
      <div className = "papaBear">
        <Header/>
              <Grid>
                <Row>
                  <Col md={8} sm={8} lg = {8}>
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
                  <Col md={4} sm={4} lg = {4}>
                    <DataDisplay
                        opRegs = {this.state.operationRegs}
                        utilRegs = {this.state.utilRegs}
                        memoryOps = {this.state.memoryOps}
                    />
                  </Col>
                </Row>
              </Grid>
      </div>

      );
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



  executeCode(){
    console.log("Instrs" , instructions);
    //executeInstruction(methodName, Rs, Rd, Rt, number, offset, disp)
    for (var i = 0; i < instructions.length; i ++){

      let z = i+1;

      let instruct = instructions[i];
      console.log(instruct);

      let instr = instruct[0];
      let rdInfo = instruct[1];
      let rsInfo = instruct[2];

      let rtInfo = instruct[3];
      let immediateInfo = instruct[4];
      let offsetInfo = instruct[5];
      let dispInfo = instruct[6];

      let rs = null;
      let rd = null;
      let rt = null;
      let number = null;
      let offset = null;
      let disp = null;

      var home = this;

      console.log(rdInfo);
      setTimeout((function(){
         if(rsInfo != null){
           rs = OP_REGS[parseInt(rsInfo.substr(-1))];
         }

         if(rdInfo != null){
           rd = OP_REGS[parseInt(rdInfo.substr(-1))];
         }

         if(rtInfo != null){
           rt = OP_REGS[parseInt(rtInfo.substr(-1))];
         }
         if(immediateInfo != null){
           number = parseInt(immediateInfo);
         }

         if(offsetInfo != null){
           offset = parseInt(offsetInfo);
         }
         if(dispInfo != null){
           disp = parseInt(dispInfo);
         }


         console.log(rd);
         armInstrs.executeInstruction(instr,  rd, rs,  rt, number, offset, disp);
         //Increment PC
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
        var home = this;
        setTimeout((function(){
          home.setNotification("")
        }), 3000);
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
        console.log("type" , opType);

        if(opType == InstrTypes.NONE){
            this.setNotification("Operation in line " + (i+1) + " is not found");
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;
        }
        else if (opType == InstrTypes.MEMORY) {

          let rd = "";
          let offset = "";
          let rs = "";

          let regExists = false;

          e = e.substring(e.indexOf(" ")+1, e.length);
          rd = e.substring(0, e.indexOf(" "));

          regExists = this.testForRegisterPresence(rd);

          if(!regExists /*The Value Register does not exist*/){

            this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;
          }

          e = e.substring(e.indexOf(" ")+1, e.length);
          offset = e.substring(0, e.indexOf(" "));


          e = e.substring(e.indexOf(" ")+1, e.length);
          rs = e.substring(0, e.indexOf(" "));

          regExists = this.testForRegisterPresence(rs);

          if(!regExists /*The Source Register does not exist*/){
            this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;
          }


          e = e.substring(e.indexOf(" ")+1, e.length);
          // Trim out all the spaces and new lines.
          e = e.trim();

          instructions.push([op, rd, rs,  null, null , offset, null]);

        }
        else if(opType == InstrTypes.IMMTRANSFER){
          /**
            Process a TI instruction
          */
          console.log("TI");

          let rd = "";
          let number = "";

          let regExists = false;


          e = e.substring(e.indexOf(" ")+1, e.length);
          rd = e.substring(0, e.indexOf(" "));

          console.log("dfsadf");
          regExists = this.testForRegisterPresence(rd);
          if(!regExists /*The Value Register does not exist*/){

            this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;

          }
                    console.log("broke");

          e = e.substring(e.indexOf(" ")+1, e.length);
          number = e.substring(0, e.indexOf(" "));

          e = e.substring(e.indexOf(" ")+1, e.length);
          // Trim out all the spaces and new lines.
          e = e.trim();
console.log("dslfkhjsadlj");
          instructions.push([op, rd, null, null,  number , null, null]);
          console.log(instructions);

        }
        else if(opType == InstrTypes.REGTRANSFER){

          /**
            Process a TI instruction
          */

          let rd = "";
          let rs = "";

          let regExists = false;


          e = e.substring(e.indexOf(" ")+1, e.length);
          rd = e.substring(0, e.indexOf(" "));

          regExists = this.testForRegisterPresence(rd);
          if(!regExists /*The Value Register does not exist*/){

            this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;

          }
          e = e.substring(e.indexOf(" ")+1, e.length);
          rs = e.substring(0, e.indexOf(" "));

          regExists = this.testForRegisterPresence(rs);

          if(!regExists /*The Source Register does not exist*/){
            this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;
          }

          e = e.substring(e.indexOf(" ")+1, e.length);
          // Trim out all the spaces and new lines.
          e = e.trim();

          instructions.push([op, rs, rd, null, null , null, null]);

      }
      else if (opType == InstrTypes.REGISTER) {

        let rd = "";
        let rs = "";
        let rt = "";

        let regExists = false;


        e = e.substring(e.indexOf(" ")+1, e.length);
        rd = e.substring(0, e.indexOf(" "));

        regExists = this.testForRegisterPresence(rd);
        if(!regExists /*The Value Register does not exist*/){

          this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;

        }
        e = e.substring(e.indexOf(" ")+1, e.length);
        rs = e.substring(0, e.indexOf(" "));

        regExists = this.testForRegisterPresence(rs);

        if(!regExists /*The Source Register does not exist*/){
          this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;
        }

        e = e.substring(e.indexOf(" ")+1, e.length);
        rt = e.substring(0, e.indexOf(" "));

        regExists = this.testForRegisterPresence(rt);

        if(!regExists /*The Source Register does not exist*/){
          this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;
        }

        e = e.substring(e.indexOf(" ")+1, e.length);
        // Trim out all the spaces and new lines.
        e = e.trim();

        instructions.push([op, rd, rs, rt, null , null, null]);

      }
      else if (opType == InstrTypes.BREAK) {
            /**
              Process a Jump instruction
            */

            let disp = "";

            e = e.substring(e.indexOf(" ")+1, e.length);
            disp = e.substring(0, e.indexOf(" "));

            e = e.substring(e.indexOf(" ")+1, e.length);
            e = e.trim();

            instructions.push([op, null, null, null, null , null, disp]);


      }
      else if (opType == InstrTypes.EMPTY){

        e = e.substring(e.indexOf(" ")+1, e.length);
        e = e.trim();

        instructions.push([op, null, null, null, null , null, null]);

      }

      else if (opType == InstrTypes.COMPARE){
        let rs = "";
        let rt = "";

        let regExists = false;


        e = e.substring(e.indexOf(" ")+1, e.length);
        rs = e.substring(0, e.indexOf(" "));

        regExists = this.testForRegisterPresence(rs);
        if(!regExists /*The Value Register does not exist*/){

          this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;

        }
        e = e.substring(e.indexOf(" ")+1, e.length);
        rt = e.substring(0, e.indexOf(" "));

        regExists = this.testForRegisterPresence(rt);

        if(!regExists /*The Source Register does not exist*/){
          this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;
        }

        e = e.substring(e.indexOf(" ")+1, e.length);
        // Trim out all the spaces and new lines.
        e = e.trim();

        instructions.push([op, null, rs, rt, null , null, null]);
      }
    }

    this.setNotification(successfulCompilationNoti);
    var home = this;
    setTimeout((function(){
      home.setNotification("");
    }), 3000);

  }

  resetRegisters(){
      for (var i = 0; i < OP_REGS.length; i++){
        armInstrs.LI(UTIL_REGS[i], 0);
      }

      for (var i = 1; i < UTIL_REGS.length; i++){
        armInstrs.LI(UTIL_REGS[i], 0);
      }
  }

  testForRegisterPresence(reg){
    console.log(reg);
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

/*

<div>
  <Header/>
        <Grid>
          <Row>
            <Col md={8} sm={8} lg = {8}>
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
            <Col md={4} sm={4} lg = {4}>
              <DataDisplay
                  opRegs = {this.state.operationRegs}
                  utilRegs = {this.state.utilRegs}
                  memoryOps = {this.state.memoryOps}
              />
            </Col>
          </Row>
        </Grid>
<div>

*/

export default App;
