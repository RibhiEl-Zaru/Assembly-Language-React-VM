import React from "react";


export default class DataRow extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>

      <h4>
        <label className="instruction">
        {this.props.address} &nbsp; &nbsp; &nbsp; &nbsp;   {this.props.value}
        </label>
      </h4>

      </div>
    )
  }
}
