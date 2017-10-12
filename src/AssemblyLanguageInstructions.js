import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";
import { Label, Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import App from "./App.js";
import CodeDisplay from "./CodeDisplay.js";
import DataDisplay from "./DataDisplay.js";

/*


The Simple Virtual Machine

This part of the problem set involves working with Simple Virtual Machine, henceforth known as SVM. SVM is simple because it only has the very basics of the full von Neumann architecture, it has neither a stack nor a heap. It is virtual because we'll actually implement it in (OCaml) software.
SVM has 8 registers and 16 instructions.

Registers

Register PC is the program counter,
Register PSW is the program status word,
Register RA is the return address register,
Register Zero holds the constant 0,
Registers RO through R3 are general purpose registers.
SVM Instructions

SVM has 16 instructions. In the descriptions below, Rd, Rs and Rt refer to one of the general purpose registers, with Rd denoting a destination of an operation and Rs and Rt denoting source registers. We'll use the symbol RAM to refer to the random access memory, the symbol addr to refer to a non-negative integer address in memory and the notation RAM[addr] to refer to the contents of location addr in the memory. We'll use the symbol disp to refer to an integer displacement that may (or may not) be added to the PC register to alter the flow of control.
All instructions leave the RA and PSW register alone unless specified otherwise.

LOD Rd, offset(Rs): let base be the contents of register Rs. Then this loads RAM[base + offset] into register Rd.
Li Rd, number: loads number into register Rd.
STO Rs, offset(Rd): let base be the contents of register Rd, stores the contents of register Rs into location base + offset in the memory.
MOV Rd, Rs: copies the contents of register Rs into register Rd.
ADD Rd, Rs, Rt: adds the contents of registers Rs and Rt and stores the sum in register Rd.
SUB Rd, Rs, Rt: subtracts the contents of register Rt from Rs and stores the difference in register Rd.
MUL Rd, Rs, Rt: multiplies the contents of register Rt from Rs and stores the product in register Rd.
DIV Rd, Rs, Rt: divides the contents of register Rs by Rt and stores the integer quotient in register Rd.
CMP Rs, Rt: sets PSW = Rs - Rt. Note that if Rs > Rt, then PSW will be positive, if Rs == Rt, then PSW will be 0 and if Rs < Rt, then PSW will be negative.
JSR disp: sets RA = PC and then PC = PC + disp.
R: sets PC = RA.
BLT disp: if PSW is negative, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW >= 0, this instruction does nothing.
BEQ disp: if PSW == 0, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW != 0, this instruction does nothing.
BGT disp: if PSW, is positive, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW <= 0, this instruction does nothing.
JMP disp: causes the new value of PC to be the sum PC + disp.
HLT: causes the svm machine to print the contents of registers PC, PSW, RA, R0, R1, R2 and R3. It then stops, returning ().



*/
var MethodEnum = {

  LOD: "LOD", // LOD Rd, offset(Rs): let base be the contents of register Rs. Then this loads RAM[base + offset] into register Rd.
  LI: "Li", // Li Rd, number: loads number into register Rd.
  STO: "STO", // STO Rs, offset(Rd): let base be the contents of register Rd, stores the contents of register Rs into location base + offset in the memory.
  MOV: "MOV",  // MOV Rd, Rs: copies the contents of register Rs into register Rd.


  ADD: "ADD",  //ADD Rd, Rs, Rt: adds the contents of registers Rs and Rt and stores the sum in register Rd.
  SUB: "SUB",  //SUB Rd, Rs, Rt: subtracts the contents of register Rt from Rs and stores the difference in register Rd.
  MUL: "MUL",  // MUL Rd, Rs, Rt: multiplies the contents of register Rt from Rs and stores the product in register Rd.
  DIV: "DIV", // DIV Rd, Rs, Rt: divides the contents of register Rs by Rt and stores the integer quotient in register Rd.
  CMP: "CMP",
  JSR: "JS", // JSR disp: sets RA = PC and then PC = PC + disp.
  R  : "R", // R: sets PC = RA.
  BLT: "BLT", // BLT disp: if PSW is negative, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW >= 0, this instruction does nothing.
  BEQ: "BEQ", // BEQ disp: if PSW == 0, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW != 0, this instruction does nothing.
  BGT: "BGT", // BGT disp: if PSW, is positive, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW <= 0, this instruction does nothing.
  JMP: "JMP", // JMP disp: causes the new value of PC to be the sum PC + disp.
  HLT: "HLT", // causes the svm machine to print the contents of registers PC, PSW, RA, R0, R1, R2 and R3. It then stops, returning ().




  methods: {

    /*
    The following Operations are Memory based operations.

    Input: Rd, Offset, Rs
    */
    "LOD": {name: "LOD", code: "M"},
    "STO": {name: "STO", code: "M"},

    /*
    The following are Transfer based operations.

    Input: varies for the two
    */
    "LI":  {name: "LI",  code: "T"},
    "MOV": {name: "MOV", code: "T"},

    "ADD": {name: "ADD", code: "R"},
    "SUB": {name: "SUB", code: "R"},
    "MUL": {name: "MUL", code: "R"},
    "DIV": {name: "DIV", code: "R"},

    "BLT": {name: "BLT", code: "B"},
    "BEQ": {name: "BEQ", code: "B"},
    "BGT": {name: "BGT", code: "B"},
    "JMP": {name: "JMP", code: "B"},
    "JSR": {name: "JSR", code: "B"},

    "R"  : {name: "R",   code: "E"},
    "HLT": {name: "HLT", code: "E"},
    "CMP": {name: "CMP", code: "E"},

  }
};




export default class AssemblyLanguageInstructions{
  constructor(){

  }

  getMethodType(methodName){
    let method = MethodEnum.methods[methodName.toUpperCase()];
    if (method == undefined) {
      return "X";
    }
    else{
      return method.code;
    }

  }

  executeInstruction(methodName, Rs, Rd, Rt, number, offset, disp){
    methodName = methodName.toUpperCase();
    if(methodName == "LOD"){
      this.LOD(Rd, offset, Rs);
    }
    else if (methodName == "LI") {

      this.LOD(Rd, number);

    }
    else if (methodName == "STO") {

      this.STO(Rs, offset, Rd);

    }
    else if (methodName == "MOV") {

      this.MOV(Rd,Rs);

    }
    else if (methodName == "ADD") {

      this.ADD(Rd, Rs, Rt);

    }
    else if (methodName == "SUB") {

      this.SUB(Rd, Rs, Rt);

    }
    else if (methodName == "MUL") {

      this.MUL(Rd, Rs, Rt);

    }
    else if (methodName == "DIV") {

      this.DIV(Rd, Rs, Rt);

    }
    else if (methodName == "CMP") {

      this.CMP(Rs, Rt);

    }
    else if (methodName == "JSR") {

      this.JSR(disp);

    }
    else if (methodName == "R") {

      this.R();

    }
    else if (methodName == "BLT") {

      this.BLT(disp);

    }
    else if (methodName == "BGT") {

      this.BGT(disp);

    }
    else if (methodName == "BEQ") {

      this.BEQ(disp);

    }
    else if (methodName == "JMP") {

      this.JMP(disp);

    }



  }



  LOD(Rd, offset, Rs){ // LOD Rd, offset(Rs): let base be the contents of register Rs. Then this loads RAM[base + offset] into register Rd.
    const base = Rs.value;

    const dest = base + offset

    const val = 0; // Val is RAM[base + offset]
    Rs.value = val;

  }
  LI(Rd, number){ // Li Rd, number: loads number into register Rd.
    Rd.value = number;
  }

  STORE(Rd, offset, Rs){ // STO Rs, offset(Rd): let base be the contents of register Rd, stores the contents of register Rs into location base + offset in the memory.
    const  base = Rd.value;
    const dest = base + offset;
    const val = Rs.value;

    const mem = val; // Mem = location base + offset in memory
  }

  MOV(Rd, Rs){   // MOV Rd, Rs: copies the contents of register Rs into register Rd.
    Rd.value = Rs.value;
  }


  ADD(Rd, Rs, Rt){ //ADD Rd, Rs, Rt: adds the contents of registers Rs and Rt and stores the sum in register Rd.
          const x = Rs.value;
          const y = Rt.value;
          const newVal = x + y;
          Rd.value = newVal;
          console.log(newVal);
    }


  SUB(Rd, Rs, Rt){    //SUB Rd, Rs, Rt: subtracts the contents of register Rt from Rs and stores the difference in register Rd.

    const x = Rs.value;
    const y = Rt.value;
    const newVal = x - y;
    Rd.value = newVal;
    console.log(newVal);
  }

  MUL(Rd, Rs, Rt){    // MUL Rd, Rs, Rt: multiplies the contents of register Rt from Rs and stores the product in register Rd.

    const x = Rs.value;
    const y = Rt.value;
    const newVal = x * y;
    Rd.value = newVal;
    console.log(newVal);
  }

  DIV(Rd, Rs, Rt){    // DIV Rd, Rs, Rt: divides the contents of register Rs by Rt and stores the integer quotient in register Rd.

    const x = Rs.value;
    const y = Rt.value;
    const newVal = x / y;
    Rd.value = newVal;
    console.log(newVal);
  }

  CMP(RS, RT){ // CMP Rs, Rt: sets PSW = Rs - Rt. Note that if Rs > Rt, then PSW will be positive, if Rs == Rt, then PSW will be 0 and if Rs < Rt, then PSW will be negative.
    //Get PSW

    const val = RS.value - RT.value;

    // PSW.value = val;
  }

  JSR(disp){  // JSR disp: sets RA = PC and then PC = PC + disp.

  }

  R(){ // R: sets PC = RA.

  }

  BLT(disp){ // BLT disp: if PSW is negative, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW >= 0, this instruction does nothing.
    //Get PSW

  }



  BEQ(disp){ // BEQ disp: if PSW == 0, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW != 0, this instruction does nothing.
      //Get PSW

  }

  BGT(disp){ // BGT disp: if PSW, is positive, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW <= 0, this instruction does nothing.
      //Get PSW

  }
  JMP(disp){  // JMP disp: causes the new value of PC to be the sum PC + disp.

  }


  call(){
    console.log("Tested static call");
  }

}
