import React, { useState, useEffect } from 'react';
import axiosWithCreds from '../utils/axiosWithCreds';
import { useHistory } from 'react-router-dom';

const Users = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axiosWithCreds()
            .get('http://localhost:5000/api/users')
            .then((response) => setUsers(response.data.data))
            .catch((error) => console.error(error))
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/signin')
    }
    return (
        <div>
            <div onClick={handleLogout}>Logout</div>
            {users && users.map((user) => {
                return (             
                    <ul key={user.id}>
                        <li>Username: {user.username}</li>
                        <li>Password: {user.password}</li>
                        <li>Department: {user.department}</li>
                    </ul>
                )
            })}
        </div>
    )
}

export default Users;