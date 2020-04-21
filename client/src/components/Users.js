import React, { useState, useEffect } from 'react';
import axiosWithCreds from '../utils/axiosWithCreds';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axiosWithCreds
            .get('http://localhost:5000/api/users')
            .then((response) => setUsers(response.data.data))
            .catch((error) => console.error(error))
    }, [])
    console.log(users);
    return (
        <div>
            {users && users.map((user) => {
                return (
                    <ul key={user.id}>
                        <li>Username: {user.username}</li>
                        <li>Password: {user.password}</li>
                    </ul>
                )
            })}
        </div>
    )
}

export default Users;