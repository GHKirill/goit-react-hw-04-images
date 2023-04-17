import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModalWindow, children }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  });

  const closeModal = event => {
    if (event.code !== 'Escape') return;
    closeModalWindow();
  };
  const handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      closeModalWindow();
    }
  };
  return createPortal(
    <div className={css.modalBackdrop} onClick={handleBackDropClick}>
      <div className={css.modalContent}>{children}</div>
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  closeModalWindow: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.closeModal);
//   }
//   closeModal = event => {
//     if (event.code !== 'Escape') return;
//     this.props.closeModalWindow();
//   };
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeModal);
//   }
//   handleBackDropClick = event => {
//     if (event.target === event.currentTarget) {
//       this.props.closeModalWindow();
//     }
//   };
//   render() {
//     return createPortal(
//       <div className={css.modalBackdrop} onClick={this.handleBackDropClick}>
//         <div className={css.modalContent}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.closeModal);
//   }
//   closeModal = event => {
//     if (event.code !== 'Escape') return;
//     this.props.closeModalWindow();
//   };
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeModal);
//   }
//   handleBackDropClick = event => {
//     if (event.target === event.currentTarget) {
//       this.props.closeModalWindow();
//     }
//   };
//   render() {
//     return createPortal(
//       <div className={css.modalBackdrop} onClick={this.handleBackDropClick}>
//         <div className={css.modalContent}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
