import React, { useState, useEffect } from "react";
import { getUserToken } from "../Form/Login";
import { useDispatch } from "react-redux";
import { getUserByToken, getLands, updateLandPrice, updateLandForSale, updateLandGame } from "../../actions/actions";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import makeStyles from "../../components/Form/formStyles";

function Modal(props) {
  const [userToken, setUserToken] = useState(getUserToken());
  const [userLandRelationship, setUserLandRelationship] = useState("");
  const [isLandForSaleOption, setIsLandForSaleOption] = useState("");
  const [cashLeft, setCashLeft] = useState("");
  // const [price, setPrice] = useState("");
  const [postData, setPostData] = useState({
    id: props.landId,
    type: props.landType,
    owner: props.landOwner,
    price: props.landPrice,
    isForSale: props.landForSale,
    game: props.landGame,
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
      setCashLeft(user.cash);
    } else {
      setUserLandRelationship("Registered User");
      setCashLeft(user.cash);
    }
    
    setIsLandForSaleOption(props.landForSale == "No" ? "Yes" : "No");
  }, []);

  const handleSubmitPrice = (e) => {
    e.preventDefault();

    dispatch(updateLandPrice(postData));
  };

  const handleSubmitForSale = async (e) => {
    e.preventDefault();

    await setPostData({ ...postData, isForSale: postData.isForSale ? false : true });

    dispatch(updateLandForSale(postData)).then((res) => {
      if (res) {
          setIsLandForSaleOption(postData.isForSale ? "No" : "Yes");
      }
    });
  };

  const handleSubmitGame = (e) => {
    e.preventDefault();

    dispatch(updateLandGame(postData));
  };

  function cancelHandler() {
    user = {};
    props.onCancel();
  }

  if (!userLandRelationship || !isLandForSaleOption) return null;

  // if (user == undefined || user == null || user == 'undefined') { // Guest - Can only view and play the game
  if (userLandRelationship == "Guest") {
    return (
      <div className="modal">
        <h2>{userLandRelationship}</h2>
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
        <h2>{userLandRelationship}</h2>
        <h3>Cash Left: {cashLeft}</h3>
        <br />
        <p>ID: {props.landId}</p>
        <p>Type: {props.landType}</p>
        <p>Owner: {props.landOwner}</p>
        <p>Price: {props.landPrice}</p>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmitPrice}
        >
          <TextField
            name="price"
            variant="outlined"
            label="price"
            type="number"
            width="50%"
            onChange={(e) => {
              setPostData({ ...postData, price: e.target.value });
              // savePrice(e);
            }}
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            width="50%"
          >
            Change Price
          </Button>{" "}
        </form>
        <p>For Sale: {props.landForSale}</p>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmitForSale}
        >
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            width="50%"
          >
            Change For Sale to: {isLandForSaleOption}
          </Button>{" "}
        </form>
        <p>Game: {props.landGame}</p>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmitGame}
        >
          <TextField
            name="game"
            variant="outlined"
            label="game"
            fullWidth
            onChange={(e) => {
              setPostData({ ...postData, game: e.target.value });
            }}
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            width="50%"
          >
            Change Game
          </Button>{" "}
        </form>
        <button className="btn btn--alt" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    );
  } else {
    // Registered owner which does not own the land - Can buy land and play the game
    return (
      <div className="modal">
        <h2>{userLandRelationship}</h2>
        <h3>Cash Left: {cashLeft}</h3>
        <br />
        <p>ID: {props.landId}</p>
        <p>Type: {props.landType}</p>
        <p>Owner: {props.landOwner}</p>
        <p>Price: {props.landPrice}</p>
        <p>For Sale: {props.landForSale}</p>
        <p>Game: {props.landGame}</p>
        {props.landForSale == "Yes" && (
          <button className="btn btn--alt" onClick={cancelHandler}>
            Buy Land
          </button>
        )}
        <button className="btn btn--alt" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    );
  }
}

export default Modal;
