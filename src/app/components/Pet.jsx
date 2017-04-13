import React from "react";
import {render} from "react-dom";

export const Pet=(props)=>{
      return (<div className="col-xs-6">
      <h4>{props.gender} <a data-gender={props.gender}></a></h4>
      <ul data-gender={props.gender} className="list">
        {props.cats.map((cat, index) => <li key={index}><span></span>{cat}</li>)}
      </ul>
    </div>
     );
 
}

