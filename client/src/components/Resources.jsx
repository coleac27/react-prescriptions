import React, { useState } from 'react'
import MedlineResponse from './MedlineResponse';
import MedlineRequest from './MedlineRequest';

export default function Resources() {
  const [medication, setMedication] = useState('');

  return (
    <div>
      <section id="resources">
        <div className="container my-5 py-5">
          <div className="row">
            <h3 className="fs-5 mb-0">Resources</h3>
          </div>
          <div className="row mt-5">
            <div className="col-md-6">
              <MedlineRequest
                medicationModalName={null}  
                setMedication={setMedication}
              />          
            </div>
            <div className="col-md-6">
              <MedlineResponse medication={medication}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
