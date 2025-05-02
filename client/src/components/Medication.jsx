import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Medication() {

  const [form, setForm] = useState({
    medicationName: "",
    timeOfDay: "",
    timeOfDayOther: "",
    dosage: "",
    pharmacy: "",
    notes: ""
  });

  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        //`http://localhost:3001/medication/${params.id.toString()}`
        `https://prescriptions-s-1ab18da7a595.herokuapp.com/medication/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const medication = await response.json();
      if (!medication) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      // Determine if it's a custom time or predefined option
      const isCustomTime = !["Morning", "Midday", "Dinnertime", "Bedtime"].includes(medication.timeOfDay);

      setForm({
        medicationName: medication.medicationName,
        timeOfDay: isCustomTime ? "Other" : medication.timeOfDay,
        timeOfDayOther: isCustomTime ? medication.timeOfDay : "",
        dosage: medication.dosage,
        pharmacy: medication.pharmacy,
        notes: medication.notes
      });
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const medication = { 
      ...form,
      timeOfDay: form.timeOfDay === "Other" ? form.timeOfDayOther : form.timeOfDay};
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /medication.
        //response = await fetch("http://localhost:3001/medication", {
          response = await fetch("https://prescriptions-s-1ab18da7a595.herokuapp.com/medication", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medication),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        //response = await fetch(`http://localhost:3001/medication/${params.id}`, {
          response = await fetch(`https://prescriptions-s-1ab18da7a595.herokuapp.com/medication/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medication),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({   
        medicationName: "",
        timeOfDay: "",
        timeOfDayOther: "",
        dosage: "",
        pharmacy: "",
        notes: "" });
      navigate("/dashboard");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-weight-bold p-4">Create/Update Medication Record</h3>
      <div className="card mx-auto">
        <div className="card-body">
          <form
            onSubmit={onSubmit}
            className="border rounded-3 overflow-hidden p-4"
          >
            <div className="row g-4 border-bottom pb-3 border-slate-900">
              <div className= "col-md-6">
                <h2 className="font-weight-bold text-dark">
                  Medication Info
                </h2>
              </div>
              <div className="col-md-6">
                <div className="container mx-auto">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="w-100 col-sm-4 my-4">
                        <label
                          htmlFor="medicationName"
                          className="d-block small fw-medium lh-1 text-slate-900"
                        >
                          Medication
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="medicationName"
                            id="medicationName"
                            className="form-control"
                            value={form.medicationName}
                            onChange={(e) => updateForm({ medicationName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="w-100 col-sm-4 my-4">
                        <label
                          className="d-block small fw-medium lh-1 text-slate-900"
                        >
                          Time of Day
                        </label>
                      </div>
                      <div className="mt-4">
                        <fieldset>
                          <legend className="visually-hidden">Time of Day Options</legend>
                          <div className="mb-4">
                            <div className="form-check form-check-inline">
                              <label
                                htmlFor="morning"
                                className="mx-3 small fw-medium lh-1 text-slate-900 p-2"
                              >
                                <input
                                  id="morning"
                                  name="timeOfDayOptions"
                                  type="radio"
                                  value="Morning"
                                  className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                  checked={form.timeOfDay === "Morning"}
                                  onChange={(e) => updateForm({ timeOfDay: e.target.value })}
                                />
                                Morning
                              </label>
                              <label
                                htmlFor="midday"
                                className="mx-3 small fw-medium lh-1 text-slate-900 p-2"
                              >
                                <input
                                  id="midday"
                                  name="timeOfDayOptions"
                                  type="radio"
                                  value="Midday"
                                  className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                  checked={form.timeOfDay === "Midday"}
                                  onChange={(e) => updateForm({ timeOfDay: e.target.value })}
                                />
                                Midday
                              </label>
                              <label
                                htmlFor="dinnertime"
                                className="mx-3 small fw-medium lh-1 text-slate-900 p-2"
                              >
                                <input
                                  id="dinnertime"
                                  name="timeOfDayOptions"
                                  type="radio"
                                  value="Dinnertime"
                                  className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                  checked={form.timeOfDay === "Dinnertime"}
                                  onChange={(e) => updateForm({ timeOfDay: e.target.value })}
                                />
                                Dinnertime
                              </label>
                              <label
                                htmlFor="bedtime"
                                className="mx-3 small fw-medium lh-1 text-slate-900 p-2"
                              >
                              <input
                                id="bedtime"
                                name="timeOfDayOptions"
                                type="radio"
                                value="Bedtime"
                                className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                checked={form.timeOfDay === "Bedtime"}
                                onChange={(e) => updateForm({ timeOfDay: e.target.value })}
                              />                              
                                Bedtime
                              </label>
                              <label
                                htmlFor="other"
                                className="mx-3 small fw-medium lh-1 text-slate-900 p-2"
                              >
                                <input
                                  id="other"
                                  name="timeOfDayOptions"
                                  type="radio"
                                  value="Other"
                                  className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                  checked={form.timeOfDay === "Other"}
                                  onChange={(e) => updateForm({ timeOfDay: e.target.value })}
                                />
                                Other
                              </label>
                            </div>
                            <div className="w-100 col-sm-4 my-4">
                              {form.timeOfDay === "Other" && <>
                              <label
                                htmlFor="timeOfDay"
                                className="d-block small fw-medium lh-1 text-slate-900"
                              >
                                Other
                              </label>
                              <div className="mt-2">
                                <div className="d-flex rounded shadow-sm border border-light" style={{boxshadow: "0 0 0 1px rgba(113, 128, 150, 0.5)"}}>
                                  <input
                                    type="text"
                                    name="timeOfDay"
                                    id="timeOfDay"
                                    className="form-control"
                                    value={form.timeOfDayOther || "" }
                                    onChange={(e) => updateForm({ timeOfDayOther: e.target.value })}
                                  />
                                </div>
                              </div>
                              </>
                              }
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div className="w-100 col-sm-4 my-4">
                        <label
                          htmlFor="dosage"
                          className="d-block small fw-medium lh-1 text-slate-900"
                        >
                          Dosage
                        </label>
                        <div className="mt-2">
                          <div className="d-flex rounded shadow-sm border border-light" style={{boxshadow: "0 0 0 1px rgba(113, 128, 150, 0.5)"}}>
                            <input
                              type="text"
                              name="dosage"
                              id="dosage"
                              className="form-control"
                              value={form.dosage}
                              onChange={(e) => updateForm({ dosage: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-100 col-sm-4 my-4">
                        <label
                          htmlFor="Pharmacy"
                          className="d-block small fw-medium lh-1 text-slate-900"
                        >
                          Pharmacy
                        </label>
                        <div className="mt-2">
                          <div className="d-flex rounded shadow-sm border border-light" style={{boxshadow: "0 0 0 1px rgba(113, 128, 150, 0.5)"}}>
                            <input
                              type="text"
                              name="pharmacy"
                              id="pharmacy"
                              className="form-control"
                              value={form.pharmacy}
                              onChange={(e) => updateForm({ pharmacy: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-100 col-sm-4 my-4">
                        <label
                          htmlFor="Notes"
                          className="d-block small fw-medium lh-1 text-slate-900"
                        >
                          Notes
                        </label>
                        <div className="mt-2">
                          <div className="d-flex rounded shadow-sm border border-light" style={{boxshadow: "0 0 0 1px rgba(113, 128, 150, 0.5)"}}>
                            <input
                              type="text"
                              name="notes"
                              id="notes"
                              className="form-control"
                              value={form.notes}
                              onChange={(e) => updateForm({ notes: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="Save Medication Record"
              className="d-inline-flex align-items-center justify-content-center text-md fw-medium border border-secondary bg-light hover:bg-slate-100 hover:text-accent h-9 rounded px-3 mt-4 transition-opacity" tabIndex="0" role="button" aria-disabled="false"
            />
          </form>
        </div>
      </div>
    </>
  );
}