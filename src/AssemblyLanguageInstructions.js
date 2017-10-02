import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";
import { Label, Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import App from "./App.js";
import CodeDisplay from "./CodeDisplay.js";
import DataDisplay from "./DataDisplay.js";


var MethodEnum = {
  ADD: "ADD",
  ADDI: "ADDI",
  AND: "AND",
  ANDI: "ANDI",

  properties: {
    "ADD": {name: "ADD", value: 1, code: "R"},
    "ADDI": {name: "ADDI", value: 2, code: "I"},
    "AND": {name: "AND", value: 3, code: "R"},
    "ANDI": {name: "ANDI", value: 4, code: "I"}
  }
};




export default class AssemblyLanguageInstructions{
  constructor(){

  }

  getMethodType(methodName){
    let method = MethodEnum.properties[methodName.toUpperCase()];
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
    else if(methodName == "ADDI"){
      this.ADDI(reg1, immediate, regDest);
    }
    else if (methodName == "AND") {
      this.AND(reg1, reg2, regDest);
    }
    else if (methodName == "ANDI") {
      this.ANDI(reg1, immediate, regDest);
    }
    else{

    }

  }



  ADD(reg1, reg2, regDest){
        const x = reg1.value;
        const y = reg2.value;
        const newVal = x + y;
        regDest.value = newVal;
        console.log(newVal);
    }

  ADDI(reg1, immediate, regDest){
      const x = reg1.value;
      const newVal = x + immediate;
      regDest.value = newVal;
  }


  AND(reg1, reg2, regDest){

  }

  ANDI(reg1, immediate, regDest){

  }

  BEQ(reg1, reg2, dest){

  }

  BGEZ(reg1, reg2, dest){

  }


  BGTZ(reg1, reg2, dest){

  }

  BLTZAL(reg1, reg2, dest){

  }

  BNE(reg1, reg2, dest){

  }

  DIV(reg1, reg2, regDest){


  }

  DIV(reg1, reg2, immediate){


  }

  JUMP(dest){

  }

  JAL(){

  }

  JR(regDest){
    let addr = regDest.value;
  }

  LB(regDest, addr){
    /*
    A byte is loaded into a register from the specified address
    */

  }

  MULT(){

  }

  MULTU(){

  }

  STORE(value, regDest){
    regDest.value = value;
  }

  XOR(reg1, reg2, regDest){
    const x = reg1.value;
    const y = reg2.value;
    const newVal = x ^ y;
    regDest.value = newVal;


  }

  XORI(reg1, immediate, regDest){
    const x = reg1.value;
    const y = immediate;
    const newVal = x ^ y;
    regDest.value = newVal;
  }

  SUB(){

  }



  call(){
    console.log("Tested static call");
  }

}
