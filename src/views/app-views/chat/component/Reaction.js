import React, {useEffect, useState} from "react";
import {Modal} from "antd";

const Reaction = (props) => {


  const style = props.isSender ? {
    right: '75%',
  } : {
    left: '75%',
  }
  return (
    <>
      {props.reactions && props.reactions?.length > 0 &&
      <div
        className={`reaction-container d-flex ${props.isSender ? 'flex-row' : 'flex-row-reverse'} align-items-center`}
        style={{
          height: 'fit-content',
          width: 'fit-content',
          backgroundColor: '#fff',
          alignSelf: 'flex-end',
          position: 'absolute',
          borderRadius: 100,
          padding: '1px 2px',
          bottom: -16,
          ...style
        }}
        onClick={props.showModal}
      >
        {props.reactions.slice(0, 3).map((item) => item.reaction).map((item, index) => (
          <h5 key={index} className={'mb-0'}>{item}</h5>))}
        <h6 className={'mb-0 mr-1 ml-1'}>{`${props.reactions.length > 3 ? '+' : ""} ${props.reactions.length}`}</h6>

      </div>
      }
    </>
  )
}

export default Reaction
