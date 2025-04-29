import { NavLink, Navigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';

const Medication= (props) => (
  <tr className="">
    <td className="">
      {props.medication._id}
    </td>
    <td className="">
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
      </div>
    </td>
  </tr>
);


export default function Dashboard() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    async function getMedications() {
      const response = await fetch(`http://localhost:3001/medication/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const medications = await response.json();
      setMedications(medications);
      console.log(medications);
    }
    getMedications();
    return;
  }, [medications.length]);

  async function deleteMedication(id) {
    await fetch(`http://localhost:3001/medication/${id}`, {
      method: "DELETE",
    });
    const newMedications = medications.filter((el) => el._id !== id);
    setMedications(newMedications);
  }

  // This method will map out the records on the table
  function medicationList() {
    //if(medications.length === 0)
    console.log("Hi", medications)
    return medications.map((medication) => {
      return (
        <Medication
          medication={medication}
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
          {/* <nav id="sidebardMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/dashboard">
                    <i className="fa fa-home me-2"></i>Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard/add">
                    <i className="fa fa-plus me-2"></i>Add
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard/edit">
                    <i className="fa fa-edit me-2"></i>Edit
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard/delete">
                    <i className="fa fa-trash me-2"></i>Delete
                  </NavLink>
                </li>
              </ul>
            </div>

          </nav> */}
          <main className="col-md-12">
            <div className="row align-items-center border-bottom pb-3 my-3">
              <div className="col-md-6">
                <h1>Dashboard</h1>
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <Link className="btn btn-outline-primary ms-auto px-4 rounded-pill" to="/dashboard/create">
                  Create Employee
                </Link>
              </div>
            </div>
            <div>
              <table className= "table table-striped table-hover">
                <thead>
                <tr className="">
                    <th className="">#</th>
                    <th className="">Medication</th>
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
