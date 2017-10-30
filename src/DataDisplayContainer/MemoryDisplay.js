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
  //   console.log("MEMDISP" , this.props.memoryOps);
  //   console.log(this.props.memoryOps.size);
     if (this.props.memoryOps.size <= 0){
       memoryShown=(

         <center>
            <h5>
              No Contents in Memory
            </h5>
         </center>

       )
     }
     memory.length = 0;
    // console.log("MEMORY 0", memory);
    let index = 0;
     {this.props.memoryOps.forEach(function(value, key){

        if(value.toString().length > 0){
      //    console.log(value);
          if(index % 2 == 0){
              memory.push(
                    <center>
                    <DataRow
                       address= {key}
                       value={value}
                       width="200px"
                     />
                    </center>)
                  }
        else{
          memory.push(
                <DataRow
                   address= {key}
                   value={value}
                   width="200px"
                 />
               )
              }
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
