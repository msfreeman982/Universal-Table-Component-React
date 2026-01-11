import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const CLOSE_BTN_STYLES =
  "text-gray-500 hover:text-gray-600 leading-none";

const CONTENT_STYLES =
  "relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-auto";

const MODAL_HEADER_STYLES =
  "flex items-center justify-between p-4";

const MODAL_OVERLAY_STYLES =
  "fixed inset-0 z-50 flex items-center justify-center";

const MODAL_BACKDROP_STYLES =
  "absolute inset-0 bg-black bg-opacity-50";

export const Modal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className={MODAL_OVERLAY_STYLES}>
      <div
        className={MODAL_BACKDROP_STYLES}
        onClick={() => onClose?.()}
      />

      <div
        ref={modalRef}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title && "modal-title"}
        className={CONTENT_STYLES}
      >
        {title && (
          <div className={MODAL_HEADER_STYLES}>
            <h2 id="modal-title" className="text-lg font-semibold">{title}</h2>
            <button
              onClick={() => onClose?.()}
              className={CLOSE_BTN_STYLES}
              aria-label="Close"
            >
              x
            </button>
          </div>
        )}

        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};