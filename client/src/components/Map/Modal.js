import React, { useState, useEffect } from "react";
import { getUserToken } from "../Form/Login";
import { useDispatch } from "react-redux";
import { getUserByToken, getLands, updateLand } from "../../actions/actions";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import makeStyles from "../../components/Form/formStyles";

function Modal(props) {
  const [userToken, setUserToken] = useState(getUserToken());
  const [userLandRelationship, setUserLandRelationship] = useState("");
  const [price, setPrice] = useState("");
  const [postData, setPostData] = useState({
    id: props.landId,
    type: props.landType,
    owner: props.landOwner,
    price: "",
    isForSale: false,
    game: "",
  });
  const dispatch = useDispatch();
  const classes = makeStyles();
  var user = {};

  useEffect(async () => {
    setUserToken(getUserToken());
    user = await dispatch(getUserByToken(userToken));
    console.log("User : ", user);
    if (user == undefined) {
      setUserLandRelationship("Guest");
    } else if (user.userName == props.landOwner) {
      setUserLandRelationship("Land Owner");
    } else {
      setUserLandRelationship("Registered User");
    }
  }, []);

  const savePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateLand(postData));
  };

  function cancelHandler() {
    user = {};
    props.onCancel();
  }

  if (!userLandRelationship) return null;

  // if (user == undefined || user == null || user == 'undefined') { // Guest - Can only view and play the game
  if (userLandRelationship == "Guest") {
    return (
      <div className="modal">
        <h3>{userLandRelationship}</h3>
        <br />
        <p>ID: {props.landId}</p>
        <p>Type: {props.landType}</p>
        <p>Owner: {props.landOwner}</p>
        <p>Price: {props.landPrice}</p>
        <p>For Sale: {props.landForSale}</p>
        <p>Game: {props.landGame}</p>
        <button className="btn btn--alt" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    );
  } else if (userLandRelationship == "Land Owner") {
    // Land owner - Controlls the land API
    return (
      <div className="modal">
        <h3>{userLandRelationship}</h3>
        <br />
        <p>ID: {props.landId}</p>
        <p>Type: {props.landType}</p>
        <p>Owner: {props.landOwner}</p>
        <p>Price: {props.landPrice}</p>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <TextField
            name="price"
            variant="outlined"
            label="price"
            fullWidth
            onChange={(e) => {
              setPostData({ ...postData, price: e.target.value });
              savePrice(e);
            }}
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fullWidth
          >
            Change Price
          </Button>{" "}
        </form>
        <p>For Sale: {props.landForSale}</p>
        <p>Game: {props.landGame}</p>
        <button className="btn btn--alt" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    );
  } else {
    // Registered owner which does not own the land - Can buy land and play the game
    return (
      <div className="modal">
        <h3>{userLandRelationship}</h3>
        <br />
        <p>ID: {props.landId}</p>
        <p>Type: {props.landType}</p>
        <p>Owner: {props.landOwner}</p>
        <p>Price: {props.landPrice}</p>
        <p>For Sale: {props.landForSale}</p>
        <p>Game: {props.landGame}</p>
        <button className="btn btn--alt" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    );
  }
}

export default Modal;
