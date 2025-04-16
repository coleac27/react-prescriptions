import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Medline from './Medline';

export default function Resources() {
  const [medication, setMedication] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    console.log("medicationName in handler");
    console.log(medicationName);
  }

  useEffect(() => {
    if (!medicationName){return;}
    console.log('medicationName', medicationName);

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      'mainSearchCriteria.v.cs': '2.16.840.1.113883.6.88',
      'mainSearchCriteria.v.dn': medicationName,
      'informationRecipient.languageCode.c': 'en'
    });
    
    const XMLData = `http://localhost:3001/api/medication?${params.toString()}`;
  
    console.log('Request URL:', XMLData); // Add this to debug

    axios.get(XMLData, {
      // headers: {  // Fix: Use headers property
      //   "Content-Type": "application/xml; charset=utf-8",
      //   "Access-Control-Allow-Origin": "*"
      // }
    })
    .then((response) => {
      console.log('Your xml response', response.data);
      //const medicineJSON = xmlToJSON();
      setMedication(response.data);
    }).catch((error) => {  // Add error handling
        setError('Error fetching medication data');
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
    });
  }, [medicationName]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  // if (!medication) return <div>No medication data available</div>;

  return (
    <div>
      <section id="resources">
        <div className="container my-5 py-5">
          <div className="row">
            <h3 className="fs-5 mb-0">Resources</h3>
          </div>
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="card p-3">
                <div className="card-body text-center">
                  <i className= "fa fa-medkit fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Medline Plus</h5>
                  <p className="card-text">Learn about your prescription drugs and over-the-counter medicines. Includes side effects, dosage, special precautions, and more.</p>
                  <form onSubmit={submitHandler}>
                    <div className="row mt-5 mb-3">
                      <div className="col-md-8">
                        <input type="text" className="form-control" id="medicationName" value= {medicationName} placeholder="Medication Name" onChange={(e) => setMedicationName(e.target.value)}/>
                      </div>
                      {/* <div className="col-md-4 text-start">
                      <button type="submit" className="btn btn-outline-primary">Search</button>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>              
            </div>
            <div className="col-md-6">
              <Medline medication={medication}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
