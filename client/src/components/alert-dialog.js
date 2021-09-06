import { createRef, useCallback, useEffect } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';

export default function AlertDialog({title, message, show, setShow, setConfirmation}) {
  const modalRef = createRef();

  const getModal = useCallback(() => {
    return bootstrap.Modal.getOrCreateInstance(modalRef.current);
  }, [modalRef]);

  const handleConfirmation = () => {
    setConfirmation(true);
    setShow(false);
    getModal().hide();
  };

  const handleClose = () => {
    setConfirmation(false);
    setShow(false);
    getModal().hide();
  };

  useEffect(() => {
    if (show) {
      getModal().show();
    }
  }, [show, getModal]);

  return (
    <div>
      <div className="modal fade" id="modal" ref={modalRef} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleClose} ></button>
            </div>
            <div className="modal-body">
              {message}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose} >No</button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmation} >Si</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
