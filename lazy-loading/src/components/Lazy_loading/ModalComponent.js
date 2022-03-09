import React from "react";
import styles from "./Modal.module.css";

const maskProp = (maskTransparency) => {
  return {
    background: `rgba(0, 0, 0, ${maskTransparency})`,
  };
};

const modelProp = (width, height) => {
  return {
    width: width,
    height: height,
  };
};

function ModalComponent(props) {
  const {
    onModalClose,
    item,
    maskTransparency,
    width,
    height,
    isMaskVisible,
  } = props;
  return (
    <>
      {isMaskVisible && (
        <div
          className={styles.mask}
          style={maskProp(maskTransparency, isMaskVisible)}
          onClick={() => onModalClose(false)}
        ></div>
      )}
      <div className={styles.modal} style={modelProp(width, height)}>
        <span className={styles.close} onClick={() => onModalClose(false)}>
          X
        </span>
        <div className={styles.modalImage}>
          <img src={item.urls.regular} alt={item.alt_description}></img>
        </div>
        <div className={styles.modalContent}>
          <h2>Uploaded By : {item.user.name}</h2>
          <p>{item.description}</p>
        </div>
      </div>
    </>
  );
}

export default ModalComponent;
