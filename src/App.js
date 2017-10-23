import React, { Component } from 'react';
// import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";
import { Grid, Row, Col } from "react-bootstrap";
import CodeDisplay from "./CodeDisplay.js";
import AssemblyLanguageInstructions from "./AssemblyLanguageInstructions.js";
import DataDisplay from "./DataDisplay.js";
import Header from "./Header.js"

let successfulCompilationNoti="Compilation Successful!";
let OP_REGS=[
  // May have to explicitly declare these as registers.
  { name: "R0", value: 0},
  { name: "R1", value: 0 },
  { name: "R2", value: 0 },
  { name: "R3", value: 0 },
];

let UTIL_REGS=[
  { name: "PC", value: "x0"  }, // Holds the address in RAM of the next instruction to be executed
  { name: "PSW", value: 0    }, //the PSW (or program status word) register holds information about the outcomes of comparisons, etc
  { name: "RA", value: "x0"     }, // the RA (or return address) register holds the address of the instruction to return to after a JSR.
  { name: "RZ", value: 0     }, // the Zero register holds the constant 0.

];

let MEMORY_OPS=[];
let MEMORY=new Map();

var InstrTypes={
  NONE:      "X",
  REGISTER:  "R",
  IMMTRANSFER:  "TI",
  REGTRANSFER:  "TR",
  MEMORY:    "M",
  BREAK:     "B",
  EMPTY:     "E",
  COMPARE:    "C",



};


let compiledCode=[];
let instructions=[];
let armInstrs=new AssemblyLanguageInstructions({utilRegs: UTIL_REGS, memory: MEMORY, memOps: MEMORY_OPS});

class App extends React.Component {
  constructor(){
    super();
    this.state={
      codeDisplayWidth: window.innerWidth/2,
      notification : "",
      notificationColor : null,
      code : "",
      operationRegs : OP_REGS,
      utilRegs : UTIL_REGS,
      memoryOps : MEMORY_OPS,
      memory    : MEMORY,
      inputMem   : new Map(),
      currLine : 0,
      pause     : false,
      timer : 3,
      secondsElapsed : 0,
    }

  }



    render() {
      return (
      <div className="papaBear">
        <div >
          <Header/>
        </div>
              <Grid>
                <Row>
                  <Col md={8} sm={8} lg={8}>
                    <CodeDisplay width={this.state.codeDisplayWidth +"px"}
                                 timer={this.state.timer}
                                 timerChange={this.setTimer.bind(this)}
                                 compileCode={this.compileCode.bind(this)}
                                 testRun={this.playCode.bind(this)}
                                 changeCode={this.handleChange.bind(this)}
                                 changeNoti={this.setNotification.bind(this)}
                                 playCode={this.playCode.bind(this)}
                                 stopCode={this.setPause.bind(this)}
                                 stepCode={this.step.bind(this)}
                                 code={this.state.code}
                                 notification={this.state.notification}
                                 notiColor={this.state.notificationColor}
                                />
                  </Col>
                  <Col md={4} sm={4} lg={4}>
                    <DataDisplay
                        opRegs={this.state.operationRegs}
                        utilRegs={this.state.utilRegs}
                        memoryOps={this.state.memoryOps}
                        updateDataArray={this.updateMemory.bind(this)}  //Method that gets passed into the updateDataArray so the compiler knows what is input.
                    />
                  </Col>
                </Row>
              </Grid>
      </div>

      );
    }


  updateMemory(loc, val){
    this.state.inputMem.set(loc, val);;
    console.log(this.state.inputMem);
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

  step(e){
    this.setPause(e);
    this.executeLineOfCode();
  }
  setPause(pause){

    clearInterval(this.incrementer);
  }

  playCode(){

    var home=this;
    if(home.state.secondsElapsed === 0){
      this.executeLineOfCode();
    }
    this.incrementer=setInterval(function(){
      if (home.state.secondsElapsed === home.state.timer -1){
        home.executeLineOfCode();
      }

      home.setState({
        secondsElapsed: (home.state.secondsElapsed + 1) % home.state.timer

      });
    }, 1000);

  }

  executeLineOfCode(){
        let PCVal=parseInt(UTIL_REGS[0].value.substring(1));
        console.log("PCVAl is " , PCVal);
        let loc=PCVal /4;

        if (loc >= instructions.length) {
          console.log("Time to break out!");
          this.setPause();
        }
        else{

        const instruct=instructions[loc];
        console.log(instruct);
        UTIL_REGS[0].value="x" + (PCVal + 4);


        let instr=instruct[0];
        let rdInfo=instruct[1];
        let rsInfo=instruct[2];

        let rtInfo=instruct[3];
        let immediateInfo=instruct[4];
        let offsetInfo=instruct[5];
        let dispInfo=instruct[6];

        let rs=null;
        let rd=null;
        let rt=null;
        let number=null;
        let offset=null;
        let disp=null;

        if(rsInfo !== null){
                if (rsInfo.substr(-1) === "Z"){
                  rs=UTIL_REGS[3];
                }else{
                  rs=OP_REGS[parseInt(rsInfo.substr(-1))];
                }

             }
            //IF RD is ZeroRegister! WE have to notify the user that that is ILLEGAL
            if(rdInfo !== null){
                 rd=OP_REGS[parseInt(rdInfo.substr(-1))];
             }

           if(rtInfo !== null){

             if (rtInfo.substr(-1) === "Z"){
               rt=UTIL_REGS[3];
             }else{
               rt=OP_REGS[parseInt(rtInfo.substr(-1))];
             }
           }
           if(immediateInfo !== null){
             number=parseInt(immediateInfo);
           }

           if(offsetInfo !== null){
             offset=parseInt(offsetInfo)*4; //Multiply by 4 to keep it in terms of words
           }
           if(dispInfo !== null){
             disp=parseInt(dispInfo);
           }


           armInstrs.executeInstruction(instr,  rd, rs,  rt, number, offset, disp);
           //Increment PC
           this.setState({
               utilRegs : UTIL_REGS,
               memoryOps : MEMORY_OPS,
               operationRegs : OP_REGS
             });
    }



  }

  compileCode(){
      this.reset();
      this.setState({operationRegs : OP_REGS});
      let success=true;
      const home = this;

      instructions=[]; // Reset instructions.

      let rawCode=this.state.code.replace(/(\r\n|\n|\r)/gm,"");

      console.log(rawCode);

      if(!rawCode.includes(";")){
        this.setNotification("Make sure you end your lines with ;");
        success=false;
        setTimeout((function(){
          home.setNotification("")
        }), 3000);
      }
      compiledCode=rawCode.split(";");
      compiledCode.splice(-1, 1); //For some reason there is always an extra space character at the end. This deals with that.

      console.log(compiledCode);
      for (var i=0; i < compiledCode.length ; i ++){

        let e=compiledCode[i];
        e = e + " ";
        let op="";


        op=e.substring(0, e.indexOf(" "));

        //Get the Operation and determine if it's an R, I or J instruction.
        let opType=armInstrs.getMethodType(op);

        if(opType === InstrTypes.NONE){
            success=false;
            this.setNotification("Operation in line " + (i+1) + " is not found");
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;
        }
        else if (opType === InstrTypes.MEMORY) {

          let rd="";
          let offset="";
          let rs="";

          let regExists=false;
          e=e.replace(/\s+/g, '');
          e=e.toUpperCase();

          if(!e.includes(",")){
            success=false;
            this.setNotification("Forgot to include comma in instruction " + (i+1));
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;
          }

          rd=e.substring(e.indexOf("R"), e.indexOf(","));

          regExists=this.testForRegisterPresence(rd, false);

          if(!regExists /*The Value Register does not exist*/){

            if(rd.substr(-1) === "Z"){
              this.setNotification("Cannot use RZ as a Destination Register");
            }else{
              this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
            }
            success=false;
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;
          }



          e=e.substring(e.indexOf(",")+1, e.length);


          offset=e.substring(0, e.indexOf("("));

          e=e.substring(e.indexOf("(")+1, e.length);
          rs=e.substring(0, e.indexOf(")"));


          regExists=this.testForRegisterPresence(rs, true);

          if(!regExists /*The Source Register does not exist*/){
            this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
            success=false;
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;
          }


          e=e.substring(e.indexOf(" ")+1, e.length);
          // Trim out all the spaces and new lines.
          e=e.trim();

          instructions.push([op, rd, rs,  null, null , offset, null]);

        }
        else if(opType === InstrTypes.IMMTRANSFER){
          /**
            Process a TI instruction
          */

          let rd="";
          let number="";

          let regExists=false;


          e=e.substring(e.indexOf(" ")+1, e.length);
          rd=e.substring(0, e.indexOf(","));
          rd = rd.trim();


          regExists=this.testForRegisterPresence(rd, false);

          if(!regExists /*The Value Register does not exist*/){

            if(rd.substr(-1) === "Z"){
              this.setNotification("Cannot use RZ as a Destination Register");
            }else{
              this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
            }

            success=false;
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;

          }


          e=e.substring(e.indexOf(" ")+1, e.length);
          number=e.substring(0, e.indexOf(" "));

          e=e.substring(e.indexOf(" ")+1, e.length);
          // Trim out all the spaces and new lines.
          e=e.trim();
          instructions.push([op, rd, null, null,  number , null, null]);


        }
        else if(opType === InstrTypes.REGTRANSFER){

          /**
            Process a TI instruction
          */

          let rd="";
          let rs="";

          let regExists=false;


          e=e.substring(e.indexOf(" ")+1, e.length);
          rd=e.substring(0, e.indexOf(","));
          rd = rd.trim();

          regExists=this.testForRegisterPresence(rd);
          if(!regExists /*The Value Register does not exist*/){
            success=false;
            this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;

          }
          e=e.substring(e.indexOf(" ")+1, e.length);
          rs=e.substring(0, e.indexOf(" "));
          rs = rs.trim();

          regExists=this.testForRegisterPresence(rs, true);

          if(!regExists /*The Source Register does not exist*/){
            success=false;
            this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
            setTimeout((function(){
              home.setNotification("")
            }), 3000);
            break;
          }

          e=e.substring(e.indexOf(" ")+1, e.length);
          // Trim out all the spaces and new lines.
          e=e.trim();

          instructions.push([op, rd, rs, null, null , null, null]);

      }
      else if (opType === InstrTypes.REGISTER) {

        let rd="";
        let rs="";
        let rt="";

        let regExists=false;


        e=e.substring(e.indexOf(" ")+1, e.length);
        rd=e.substring(0, e.indexOf(",")).trim();



        regExists=this.testForRegisterPresence(rd, false);
        if(!regExists /*The Value Register does not exist*/){

          if(rd.substr(-1) === "Z"){
            this.setNotification("Cannot use RZ as a Destination Register");
          }else{
            this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
          }
          success=false;

          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;

        }
        e=e.substring(e.indexOf(",")+1, e.length);

        rs=e.substring(0, e.indexOf(","));
        rs = rs.trim();
        regExists=this.testForRegisterPresence(rs, true);

        if(!regExists /*The Source Register does not exist*/){
          this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
          success=false;
          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;
        }

        e=e.substring(e.indexOf(",")+1, e.length);
        rt=e.substring(0, e.length);
        rt = rt.trim();

        regExists=this.testForRegisterPresence(rt, true);

        if(!regExists /*The Source Register does not exist*/){
          this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
          success=false;
          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;
        }

        e=e.substring(e.indexOf(" ")+1, e.length);
        // Trim out all the spaces and new lines.
        e=e.trim();

        instructions.push([op, rd, rs, rt, null , null, null]);

      }
      else if (opType === InstrTypes.BREAK) {
            /**
              Process a Jump instruction
            */

            let disp="";

            e=e.substring(e.indexOf(" ")+1, e.length);
            console.log(e);
            disp = e.trim();
            console.log(disp);

            e=e.substring(e.indexOf(" ")+1, e.length);
            e=e.trim();

            instructions.push([op, null, null, null, null , null, disp]);


      }
      else if (opType === InstrTypes.EMPTY){

        e=e.substring(e.indexOf(" ")+1, e.length);
        e=e.trim();

        instructions.push([op, null, null, null, null , null, null]);

      }

      else if (opType === InstrTypes.COMPARE){
        let rs="";
        let rt="";

        let regExists=false;


        e=e.substring(e.indexOf(" ")+1, e.length);
        rs=e.substring(0, e.indexOf(",")).trim();

        regExists=this.testForRegisterPresence(rs, true);

        if(!regExists /*The Value Register does not exist*/){
          this.setNotification("Dest Register in instruction " + (i+1) + " does not exist");
          success=false;
          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;

        }
        e=e.substring(e.indexOf(",")+1, e.length);
        console.log(e);
        rt=e.trim();

        regExists=this.testForRegisterPresence(rt, true);

        if(!regExists /*The Source Register does not exist*/){
          this.setNotification("Source Register in instruction " + (i+1) + " does not exist");
          success=false;
          setTimeout((function(){
            home.setNotification("")
          }), 3000);
          break;
        }

        e=e.substring(e.indexOf(" ")+1, e.length);
        // Trim out all the spaces and new lines.
        e=e.trim();

        instructions.push([op, null, rs, rt, null , null, null]);
      }
    }

    console.log("instructions are" , instructions);
    if (success){ /*  If there are no*/
      home.setNotification(successfulCompilationNoti);
    }
    setTimeout((function(){
      home.setNotification("");
    }), 3000);

  }

  reset(){
      this.resetRegisters();
      this.resetMemory();
      this.resetCounter();
  }

  resetCounter(){
      this.setState({
        secondsElapsed: 0
      });
      clearInterval(this.incrementer);
  }

  resetRegisters(){
    /*
    Iterate through registers and reset to their initial values.
    */
      for (var i=0; i < OP_REGS.length; i++){
        armInstrs.LI(OP_REGS[i], 0);
      }
      for (var j=0; j < UTIL_REGS.length; j++){
        if (j === 0 || j === 2){
          UTIL_REGS[j].value="x0";
        }else{
          armInstrs.LI(UTIL_REGS[j], 0);
        }
      }
      this.setState({operationRegs : OP_REGS, utilRegs : UTIL_REGS});

  }

  resetMemory(){
    MEMORY.clear();
    MEMORY_OPS.length=0; // This is a means of clearing the memory_Ops while maintaining the pointer.
    for (let [k, v] of this.state.inputMem) {
      /*    Read what was held in the inputArray, and put that in the MEMORY*/
      MEMORY.set(k, v);
    }
    this.setState({MEMORY, MEMORY_OPS})
  }

  testForRegisterPresence(reg, isDest){
    console.log("Testing presence of this register:  ", reg);
    if (reg.length > 2){
      return false;
    }

    if(reg.substr(0,1) !== "R"){
      return false;
    }
    if (reg.substr(-1) === "Z"){
      return (true && isDest);
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
