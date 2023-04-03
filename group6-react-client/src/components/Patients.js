// Patients.js

import React, {useEffect} from 'react';
import { gql, useQuery } from "@apollo/client";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

const GET_PATIENTS = gql`
{
    patients{
        fullName
        email
    }
}
`;

const Patients = () => {
    let navigate = useNavigate();

    const { loading, error, data, refetch } = useQuery(GET_PATIENTS);

    useEffect(() => {       
        refetch();
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (

        <div className='App'>
            <h2>Patients</h2>
            {data.patients.length === 0 ?
                <p>No patients found</p> :
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.patients.map((patient, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{patient.fullName}</td>
                                    <td>{patient.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    );
}

export default Patients