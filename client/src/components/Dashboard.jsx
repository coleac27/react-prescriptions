import { NavLink, Navigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import MedlineModal from './MedlineModal';

const Medication= (props) => (
  <tr className="">
    {/* <td className="">
      {props.medication._id}
    </td> */}
    <td className="" role="button" onClick={() => props.setIsModalOpen(true)}>
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
            isModalOpen={props.isModalOpen}
            onClose={() => props.setIsModalOpen(false)}
            medicationName={props.medication.medicationName}
          />
      </div>
    </td>
  </tr>
);


export default function Dashboard() {
  const [medications, setMedications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getMedications() {
      //const response = await fetch(`http://localhost:3001/medication/`);
      const response = await fetch(`https://prescriptions-s-1ab18da7a595.herokuapp.com/medication/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const medications = await response.json();
      setMedications(medications);
      //console.log(medications);
    }
    getMedications();
    return;
  }, [medications.length]);

  async function deleteMedication(id) {
    //await fetch(`http://localhost:3001/medication/${id}`, {
    await fetch(`https://prescriptions-s-1ab18da7a595.herokuapp.com/medication/${id}`, {
      method: "DELETE",
    });
    const newMedications = medications.filter((el) => el._id !== id);
    setMedications(newMedications);
  }

  // This method will map out the records on the table
  function medicationList() {
    //if(medications.length === 0)
    return medications.map((medication) => {
      return (
        <Medication
          medication={medication}
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen}
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
