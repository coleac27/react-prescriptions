import { Navigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth, getToken } from '../contexts/authContext';
import MedlineModal from './MedlineModal';

const Medication= (props) => (
  <tr className="">
    {/* <td className="">
      {props.medication._id}
    </td> */}
    <td className="" role="button" onClick={() => props.openModal(props.medication._id)}>
      {props.medication.medicationName}
    </td>
    <td className="">
      {props.medication.timeOfDay}
    </td>
    <td className="">
      {props.medication.dosage}
    </td>
    <td className="">
      {props.medication.pharmacy}
    </td>
    <td className="">
      {props.medication.notes}
    </td>
    <td className="">
      <div className="flex">
        <Link
          className="btn btn-outline-primary ms-auto px-4 rounded-pill"
          to={`/dashboard/edit/${props.medication._id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-outline-primary ms-auto px-4 rounded-pill"
          color="red"
          onClick={() => {
            props.deleteMedication(props.medication._id);
          }}
        >
          Delete
        </button>
          <MedlineModal 
            isModalOpen={props.activeModalId === props.medication._id}
            onClose={() => props.closeModal()}
            medicationName={props.medication.medicationName}
          />
      </div>
    </td>
  </tr>
);


export default function Dashboard() {
  const [medications, setMedications] = useState([]);
  const [activeModalId, setActiveModalId] = useState(null); 
  const { user, refreshToken } = useAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    async function updateToken() {
      if (user) {
        try {
          const currentToken = await getToken();
          setToken(currentToken);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
    }
    updateToken();
  }, [user]);

  // Function to handle API calls with token refresh if needed
  async function makeAuthenticatedRequest(url, options) {
    try {
      // First attempt with current token
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          "Authorization": `Bearer ${token}`
        }
      });
      
      // If unauthorized, try refreshing token and retry once
      if (response.status === 401) {
        console.log("Token expired, refreshing...");
        await refreshToken();
        const newToken = await getToken();
        setToken(newToken);
        
        // Retry with new token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            "Authorization": `Bearer ${newToken}`
          }
        });
      }
      
      return response;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }

  useEffect(() => {
    async function getMedications() {
      if (!token) return;

      try {
        const response = await makeAuthenticatedRequest(
        // `http://localhost:3001/medication/`, {
        `https://prescriptions-s-1ab18da7a595.herokuapp.com/medication/`, {
            method: "GET"}
          );
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const medications = await response.json();
        setMedications(medications);
        //console.log(medications);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    }
    getMedications();
  }, [token]);

  async function deleteMedication(id) {
    await makeAuthenticatedRequest(
    // `http://localhost:3001/medication/${id}`, {
    `https://prescriptions-s-1ab18da7a595.herokuapp.com/medication/${id}`, {
      method: "DELETE"}
    );
    const newMedications = medications.filter((el) => el._id !== id);
    setMedications(newMedications);
  }

  // Open modal for a specific medication
  const openModal = (id) => {
    setActiveModalId(id);
  };

  // Close any open modal
  const closeModal = () => {
    setActiveModalId(null);
  };

  // This method will map out the records on the table
  function medicationList() {
    //if(medications.length === 0)
    return medications.map((medication) => {
      return (
        <Medication
          medication={medication}
          activeModalId={activeModalId}
          openModal={openModal}
          closeModal={closeModal}
          deleteMedication={() => deleteMedication(medication._id)}
          key={medication._id}
        />
      );
    });
  }

  const { userLoggedIn } = useAuth();

  return (
    <div>
      {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}
      <div className="container-fluid mb-5">
        <div className="row">
          <main className="col-md-12">
            <div className="row align-items-center border-bottom pb-3 my-3">
              <div className="col-md-6">
                <h1>Dashboard</h1>
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <Link className="btn btn-outline-primary ms-auto px-4 rounded-pill" to="/dashboard/create">
                  Add New Medication
                </Link>
              </div>
            </div>
            <div>
              <table className= "table table-striped table-hover">
                <thead>
                <tr className="">
                    {/* <th className="">#</th> */}
                    <th className="">Medication <br /><span className="fw-light">Click for details!</span></th>
                    <th className="">Time of Day</th>
                    <th className="">Dosage</th>
                    <th className="">Pharmacy</th>
                    <th className="">Notes</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="">
                  {medicationList()}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}