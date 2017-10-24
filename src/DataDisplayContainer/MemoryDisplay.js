import React from "react";
import Center from 'react-center';
import DataRow from "./DataRow.js"

import './datatables.css';


export default class MemoryDisplay extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      memoryOps : this.props.memoryOps
    }
  }

   render() {
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
     console.log("MEM DISPLAY!", this.props.memoryOps);

       return (
         <div>

         <Center>
           <h2> Memory Display </h2>
         </Center>
            {memoryShown}
           {this.props.memoryOps.forEach(function (key){
             console.log("dfasd");
             <center>
             <DataRow
                 address={this.props.memoryOps[key]}
                 value={key}
                 width="200px"
               />
               </center>
           })}
         </div>
       )
   }

}
