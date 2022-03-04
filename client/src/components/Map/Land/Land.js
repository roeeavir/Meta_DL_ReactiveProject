import React, { useState } from "react";
import makeStyles from "./landStyles";
import Backdrop from "../Backdrop.js";
import Modal from "../Modal.js";

const Land = ({ post }) => {
  const classes = makeStyles();
  const colors = { nland: "red", park: "green", road: "grey" };
  let currentColor = colors[post.type];
  const [modalIsOpen, setModalIsOpen] = useState();

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div className="land">
      <button
        id="landBtn"
        onClick={deleteHandler}
        style={{ backgroundColor: currentColor }}
      >
        {post.id}
      </button>
      {modalIsOpen && (
        <Modal
          landId={post.id}
          landType={post.type}
          landOwner={post.owner}
          landPrice={post.price}
          onCancel={closeModalHandler}
        />
      )}
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
};

export default Land;
