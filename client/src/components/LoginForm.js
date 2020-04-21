import React, { useState } from 'react';
import axiosWithCreds from '../utils/axiosWithCreds';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const history = useHistory();
    const [state, setState] = useState({ username: '', password: '' });
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axiosWithCreds
            .post('http://localhost:5000/api/login', state)
            .then((response) => {
                console.log(response);
                setState({ username: '', password: '' });
                history.push('/users');
            })
            .catch((error) => {
                console.error(error);
                setState({ username: '', password: '' });
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' name='username' value={state.username} onChange={handleChange}/>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' name='password' value={state.password} onChange={handleChange}/>
            <input type='submit' />
        </form>
    )
}

export default LoginForm;