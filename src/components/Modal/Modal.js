import styles from './Modal.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  escapeClose = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  overlayClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  componentDidMount = () => {
    window.addEventListener('keydown', this.escapeClose);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.escapeClose);
  };

  render() {
    return (
      <div className={styles.overlay} onClick={this.overlayClose}>
        <div className={styles.modal}>
          <img
            src={this.props.largeImage}
            alt=""
            onClick={this.props.onClick}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
