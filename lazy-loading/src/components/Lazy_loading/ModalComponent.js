import React from "react";
import styles from "./Modal.module.css";

function ModalComponent({ setIsOpen, item }) {
  return (
    <>
      <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Clicked Image</h5>
          </div>
          <div className={styles.modalContent}>
            <img
              src={item.urls.regular}
              alt={item.alt_description}
              className={styles.modalImg}
            ></img>
            {item.alt_description}
          </div>

          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalComponent;
