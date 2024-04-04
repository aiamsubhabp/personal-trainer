import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function ClientCard({ client, id, name, age, weight, goals, image, onDeleteItem, setClients }) {
    const [editMode, setEditMode] = useState(null);

    const formSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").max(20),
        age: Yup.number().required("Age is required").positive("Age must be a positive number").integer("Age must be an integer").max(120),
        weight: Yup.number().required("Weight is required").positive("Weight must be a positive number").integer("Weight must be an integer").max(999),
        goals: Yup.string().required("Goals are required").max(300),
    });

    const formik = useFormik({
        initialValues: {
            name: name || '',
            age: age || '',
            weight: weight || '',
            goals: goals || '',
            image: image || ''
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch(`/api/clients/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(response => {
                    if (response.status === 202) {
                        setClients(updatedClients => updatedClients.map(client => (client.id === id ? values : client)))
                        setEditMode(null);
                    } else {
                        console.error("Failed to update client");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });

    return (
        <li className="card">
            {editMode === id ?
                <form onSubmit={formik.handleSubmit}>
                    <div className="edit-container">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                        ) : null}

                        <label htmlFor="age">Age:</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.age}
                        />
                        {formik.touched.age && formik.errors.age ? (
                            <div className="error">{formik.errors.age}</div>
                        ) : null}

                        <label htmlFor="weight">Weight:</label>
                        <input
                            id="weight"
                            name="weight"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.weight}
                        />
                        {formik.touched.weight && formik.errors.weight ? (
                            <div className="error">{formik.errors.weight}</div>
                        ) : null}

                        <label htmlFor="goals">Goals:</label>
                        <textarea
                            id="goals"
                            name="goals"
                            onChange={formik.handleChange}
                            value={formik.values.goals}
                        />
                        {formik.touched.goals && formik.errors.goals ? (
                            <div className="error">{formik.errors.goals}</div>
                        ) : null}

                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditMode(null)}>Cancel</button>
                    </div>
                </form>
                :
                <>
                    <img src={image} />
                    <h4>Name: {name}</h4>
                    <h5>Age: {age}</h5>
                    <h5>Weight: {weight}</h5>
                    <h5>Goals: {goals}</h5>
                    <br></br>
                    <Link to = {`/clients/${client.id}`} >View Sessions</Link>
                    <div className="btn-group">
                        <button onClick={() => setEditMode(id)}>Edit</button>
                        <button onClick={() => onDeleteItem(id)}>Delete</button>
                    </div>
                </>
            }
        </li>
    );
}

export default ClientCard;




// BEFORE ADDING FORMIK VALIDATION TO THE PATCH

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function ClientCard({client, id, name, age, weight, goals, image, onDeleteItem, setClients}){
//     const [editMode, setEditMode] = useState(null)
//     const [editClient, setEditClient] = useState({
//         id: null,
//         name: '',
//         age: '',
//         weight: '',
//         goals: '',
//         image: ''
//       })

//     function handleEdit(client){
//         setEditClient(client)
//         setEditMode(client.id)
//     }

//     function handleSave(){
//       fetch(`/api/clients/${editClient.id}`, {
//         method: "PATCH",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(editClient)
//       })
//         .then(r => {
//           if (r.status === 202) {
//             setClients(updatedClients => updatedClients.map(client => (client.id === editClient.id ? editClient : client)))
//             setEditMode(null)
//           } else {
//             console.error("Failed to update client")
//           }
//         })
//     }

//     return(
//         <>  {editMode === id ? 
//             <div className="edit-container">
//                 <input 
//                     value={editClient.name}
//                     onChange={e => 
//                     setEditClient(prev => ({...prev, name: e.target.value}))}
//                 />
//                 <input 
//                     value={editClient.age}
//                     onChange={e => 
//                     setEditClient(prev => ({...prev, age: e.target.value}))}
//                 />
//                 <input 
//                     value={editClient.weight}
//                     onChange={e => 
//                     setEditClient(prev => ({...prev, weight: e.target.value}))}
//                 />
//                 <textarea 
//                     value={editClient.goals}
//                     onChange={e => 
//                     setEditClient(prev => ({...prev, weight: e.target.value}))}
//                 />
//                 <div>
//                   <button className="btn-group" onClick = {handleSave}>Save</button>
//                 </div>
                
//             </div> : 
//             <li className="card">
//                 <img src = {image} />
//                 <h4>Name: {name}</h4>
//                 <h5>Age: {age}</h5>
//                 <h5>Weight: {weight}</h5>
//                 <h5>Goals: {goals}</h5>
//                 <button onClick={() => handleEdit(client)}>Edit</button>
//                 <button onClick={() => onDeleteItem(id)}>Delete</button>
//             </li>
//           }
//         </>
//     )
// }


// export default ClientCard