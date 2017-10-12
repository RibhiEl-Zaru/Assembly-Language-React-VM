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
  MOV: "MOV"  // MOV Rd, Rs: copies the contents of register Rs into register Rd.


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




  methods: {

    "LOD": {name: "LOD", code: "M"},
    "LI": {name: "LI", code: "M"},
    "STO": {name: "STO", code: "M"},
    "MOV": {name: "MOV", code: "R"},
    "ADD": {name: "ADD", code: "R"},
    "SUB": {name: "SUB", code: "R"},
    "MUL": {name: "MUL", code: "R"},
    "CMP": {name: "CMP", code: "M"},
    "JSR": {name: "JSR", code: "M"},
    "R": {name: "R", code: "M"},
    "BLT": {name: "BLT", code: "BLT"},
    "BEQ": {name: "BEQ", code: "M"},
    "JMP": {name: "JMP", code: "M"},
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

  executeInstruction(methodName, reg1, reg2, regDest, immediate, address){
    methodName = methodName.toUpperCase();
    if(methodName == "ADD"){
      console.log("ADD");
      this.ADD(reg1, reg2, regDest);
    }
    else if (methodName == " ") {

    }

  }

  /*

    LOD: "LOD", // LOD Rd, offset(Rs): let base be the contents of register Rs. Then this loads RAM[base + offset] into register Rd.
    LI: "Li", // Li Rd, number: loads number into register Rd.
    STO: "STO", // STO Rs, offset(Rd): let base be the contents of register Rd, stores the contents of register Rs into location base + offset in the memory.
    MOV: "MOV"  // MOV Rd, Rs: copies the contents of register Rs into register Rd.


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
  */

  STORE(value, regDest){
    regDest.value = value;
  }


  SUB(){

  }



  call(){
    console.log("Tested static call");
  }

}
