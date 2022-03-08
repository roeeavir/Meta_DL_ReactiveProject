import React, { useState } from "react";
import makeStyles from "./landStyles";
import Backdrop from "../Backdrop.js";
import Modal from "../Modal.js";
import { getColors } from "../../Legend/Legend";

const Land = ({ post }) => {
  const classes = makeStyles();
  const colors = getColors;
  let currentColor = setLandColor();
  let hasGame = post.game != "N/A" ? true : false;
  const [modalIsOpen, setModalIsOpen] = useState();

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function setLandColor() {
    if (post.type === "nland") {
      if (post.isForSale){
        return "red";
      } else {
        return "pink";
      }
      return colors.nland;
    } else if (post.type === "park") {
      return "green"
    } else if (post.type === "road") {
      return "grey"
    }
  }

  return (
    <div className="land">
      <button
        id="landBtn"
        onClick={deleteHandler}
        style={{ backgroundColor: currentColor, border: hasGame ? "1px solid black" : "none" }}
      >
        {post.id}
      </button>
      {modalIsOpen && (
        <Modal
          landId={post.id}
          landType={post.type}
          landOwner={post.owner}
          landPrice={post.price}
          landForSale={post.isForSale ? "Yes" : "No"}
          landGame={post.game}
          onCancel={closeModalHandler}
        />
      )}
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
};

export default Land;
