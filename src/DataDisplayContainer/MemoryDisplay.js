import React from "react";
import Center from 'react-center';
import DataRow from "./DataRow.js"

import './datatables.css';

let memory = [];

export default class MemoryDisplay extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      memoryOps : this.props.memoryOps
    }
  }

   updateInputMem(){
    this.props.updateInputMem(this.props.memoryOps);
   }
   render() {
     memory.size = 0;
     let  memoryShown;
     if (this.props.memoryOps.size <= 0){
       memoryShown=(

         <center>
            <h6>
              No Contents in Memory
            </h6>
         </center>

       )
     }
     memory.length = 0;
    // console.log("MEMORY 0", memory);
    console.log(this.props.memoryOps);
     {this.props.memoryOps.forEach(function(value, key){

        if(value.toString().length > 0){
          console.log(value);
        memory.push(<center>
              <label>
              <DataRow
                 address= {key}
                 value={value}
                 width="200px"
               />
              </label>

              </center>)
            }
      })}


    //  console.log("MEM DISPLAY!", this.props.memoryOps);
    //  console.log("MEMORY 1",memory);
       return (
         <div>

         <Center>
           <h2> Memory Display </h2>
         </Center>
         {memoryShown}
         <div>
         {memory}
         </div>
         </div>
       )
     }
}

/*
{this.props.memoryOps.map((key, value) => (

 <center>
  <DataRow
     address= {value}
     value={key}
     width="200px"
   />
   </center>
))}

*/
