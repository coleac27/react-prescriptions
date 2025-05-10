import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth, getToken } from '../contexts/authContext';

export default function MedlineRequest({medicationModalName, setMedication}) {
  const [medicationName, setMedicationName] = useState(medicationModalName ?? "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [token, setToken] = useState("");

  function submitHandler(e) {
    e.preventDefault();
  }

  useEffect(() => {
    async function fetchToken() {
      if (user) {
        try {
          const fetchedToken = await getToken();
          console.log("Token fetched:", fetchedToken);
          setToken(fetchedToken);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      }
    }
    fetchToken();
  }, [user]);

  useEffect(() => {
    if (!medicationName)return;
    if(!token) return;

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      'mainSearchCriteria.v.cs': '2.16.840.1.113883.6.88',
      'mainSearchCriteria.v.dn': medicationName,
      'informationRecipient.languageCode.c': 'en'
    });
    
    //const XMLData = `http://localhost:3001/api/medication?${params.toString()}`;
    const XMLData = `https://prescriptions-s-1ab18da7a595.herokuapp.com/api/medication?${params.toString()}`;
  
    //console.log('Request URL:', XMLData);

    axios.get(XMLData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((response) => {
      // console.log('Your xml response', response.data);
      setMedication(response.data);
    }).catch((error) => {  // Add error handling
        setError('Error fetching medication data');
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
    });
  }, [medicationName, token]);

  return (
    <div>
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
            </div>
          </form>
        </div>
      </div>      
    </div>
  )
}
