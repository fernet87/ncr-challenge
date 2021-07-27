import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function AlertDialog({title, message, show, setShow, setConfirmation}) {
  const handleConfirmation = () => {
    setConfirmation(true);
    setShow(false);
  };

  const handleClose = () => {
    setConfirmation(false);
    setShow(false);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >No</Button>
          <Button variant="primary" onClick={handleConfirmation} >Si</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
