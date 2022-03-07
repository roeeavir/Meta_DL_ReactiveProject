import React,{ useState , useEffect} from "react";
import {getUserToken} from '../Form/Login'
import { useDispatch } from 'react-redux';
import { getUserByToken, getLands } from "../../actions/actions";



function Modal(props) {
  const [userToken, setUserToken] = useState(getUserToken());
  const dispatch = useDispatch()


  useEffect(async () => {
    setUserToken(getUserToken());
    let user = await dispatch(getUserByToken(userToken))
    console.log("User : ", user)
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