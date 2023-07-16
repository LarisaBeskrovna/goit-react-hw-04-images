import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ largeImage, onClick, onCloseModal }) => {
  const overlayClose = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const escapeClose = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', escapeClose);
    return () => {
      window.removeEventListener('keydown', escapeClose);
    };
  }, [onCloseModal]);

  return (
    <div className={styles.overlay} onClick={overlayClose}>
      <div className={styles.modal}>
        <img src={largeImage} alt="" onClick={onClick} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
export default Modal;
