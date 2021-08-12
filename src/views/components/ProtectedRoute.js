import React from "react";
import {Redirect, Route} from "react-router-dom";
import {AUTH_PREFIX_PATH} from "../../configs/AppConfig";

const ProtectedRoute = (props)=>{
  return(
    <Route path={props.path}>
      {props.isAuthenticated? (props.children): (<Redirect to={AUTH_PREFIX_PATH}/>)}
    </Route>
  )
}

export default ProtectedRoute
