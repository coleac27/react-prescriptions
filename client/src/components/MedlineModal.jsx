import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import MedlineResponse from './MedlineResponse';
import MedlineRequest from './MedlineRequest';

export default function MedlineModal({isModalOpen, onClose, medicationName}) {
  const [medication, setMedication] = useState('');

  if(!isModalOpen) return null;
  return (
    <div>
      <Modal show={isModalOpen} onHide={onClose} centered size="lg">
        <Modal.Header closeButton/>
        <Modal.Body>
              <MedlineRequest 
                medicationModalName={medicationName}
                setMedication={setMedication}/>
            <div className="mt-4 bg-light">
              <MedlineResponse medication={medication}/>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}


