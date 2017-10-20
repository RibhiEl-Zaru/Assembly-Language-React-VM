import React from "react";


export default class DataRow extends React.Component {

  constructor(props){
    super(props);
    this.state={
      instruction : this.props.instruction,
      address : this.props.address,
      value : this.props.value,

    }

  }

  render(){
    console.log(this.state.instruction);
    console.log(this.state.address);
    console.log(this.state.value);
    return(
      <div>

      <h4>
        <label className="instruction">
          &nbsp; {this.state.instruction}  &nbsp; &nbsp; &nbsp;  {this.state.address} &nbsp; &nbsp; &nbsp; &nbsp;   {this.state.value}
        </label>
      </h4>

      </div>
    )
  }
}
