import React from "react";
import styles from "./Modal.module.css";

function ModalComponent({ setIsOpen, item }) {
  return (
    <>
      <div className={styles.modal}>
        <span className={styles.close} onClick={() => setIsOpen(false)}>
          X
        </span>
        <div className={styles.modalContent}>
          <img
            src={item.urls.regular}
            alt={item.alt_description}
            className={styles.modalImage}
          ></img>
          <h2>Uploaded By : {item.user.name}</h2>
          <p>{item.description}</p>
        </div>
      </div>
    </>
  );
}

export default ModalComponent;
