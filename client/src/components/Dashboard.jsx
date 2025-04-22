import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
      <div className="container-fluid mb-5">
        <div className="row">
          <nav id="sidebardMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
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

          </nav>
          <main className="col-md-9 col-lg-10">
            <div className="border-bottom pb-3 my-3">
              <h1>Dashboard</h1>
            </div>
            <div>
              <table className= "table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Medication</th>
                    <th scope="col">Time of Day</th>
                    <th scope="col">Dosage</th>
                    <th scope="col">Pharmacy</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
