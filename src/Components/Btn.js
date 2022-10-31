import React from 'react';

const Btn = (props) => {
  return (
    <div className={'cursor-pointer text-2xl p-3 m-1 shadow-lg rounded-lg text-center ' + props.color} onClick={()=> props.click(props.title)}>

      {props.title}

    </div>
  )
}

export default Btn
