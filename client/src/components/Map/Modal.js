import React,{ useState } from "react";
function Modal(props) {

    function cancelHandler(){
        props.onCancel();
    }


    return (
      <div className='modal'>
        <p>ID:{props.landId}</p>
        <p>Type:{props.landType}</p>
        <p>Owner:{props.landOwner}</p>
        <p>Price:{props.landPrice}</p>
        <button className='btn btn--alt' onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    );
  }
  
  export default Modal;