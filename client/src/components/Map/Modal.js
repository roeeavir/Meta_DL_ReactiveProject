import React,{ useState , useEffect} from "react";
import {getUserToken} from '../Form/Login'
import { useDispatch } from 'react-redux';
import { getUserByToken } from "../../actions/actions";



function Modal(props) {
  const [userToken, setUserToken] = useState(getUserToken());
  const dispatch = useDispatch()


  useEffect(() => {
    setUserToken(getUserToken());
    dispatch(getUserByToken(userToken)).then((loginRes) => {
      if (loginRes) {
        console.log("Token: ", loginRes);
      }
    })
  }, [])


  function cancelHandler(){
      props.onCancel();
  }

  return (
    <div className='modal'>
      <p>ID: {props.landId}</p>
      <p>Type: {props.landType}</p>
      <p>Owner: {props.landOwner}</p>
      <p>Price: {props.landPrice}</p>
      <p>For Sale: {props.landForSale}</p>
      <p>Game: {props.landGame}</p>
      <button className='btn btn--alt' onClick={cancelHandler}>
        Cancel
      </button>
    </div>
  );
  }
  
  export default Modal;