import React from "react";
import {motion} from "framer-motion";
import {Alert} from "antd";

const CustomAlert = (props)=>{
  return(
    <motion.div
      initial={{opacity: 0, marginBottom: 0}}
      animate={{
        opacity: props.showMessage ? 1 : 0,
        marginBottom: props.showMessage ? 20 : 0
      }}>
      <Alert type="error" showIcon message={props.message} description={props.description} action={props.action}></Alert>
    </motion.div>
  )
}

export default CustomAlert
