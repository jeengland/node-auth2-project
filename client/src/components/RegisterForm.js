import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
    const history = useHistory();
    const [state, setState] = useState({ username: '', password: '', department: '' });
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:5000/api/register', state)
            .then((response) => {
                setState({ username: '', password: '', department: '' });
                axios
                    .post('http://localhost:5000/api/login', {
                         username: state.username, password: state.password
                        })
                    .then((response) => {
                            localStorage.setItem('token', response.data.token);
                            history.push('/users');
                        })
                    .catch((error) => {
                            console.error(error);
                        })
                })
            .catch((error) => {
                console.error(error);    
                setState({ username: '', password: '', department: '' });        
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' name='username' value={state.username} onChange={handleChange}/>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' name='password' value={state.password} onChange={handleChange}/>
            <label htmlFor='department'>Department:</label>
            <input type='text' id='department' name='department' value={state.department} onChange={handleChange}/>
            <input type='submit'/>
        </form>
    )
}

export default RegisterForm;