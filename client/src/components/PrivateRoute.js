import React, { Component, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axiosWithCreds from '../utils/axiosWithCreds';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [authed, setAuthed] = useState(undefined);
    useEffect(() => {
        axiosWithCreds
                .get('http://localhost:5000/api/authStatus')
                .then((response) => {
                    setAuthed(true);
                    console.log(response.data)
                })
                .catch((error) => {
                    setAuthed(false);
                    console.error(error);
                })
    }, [])
    return(
        <Route
            {...rest}
            render={(props) => {
                if (authed === undefined) {
                    return null;
                } else if (authed === true) {
                    return <Component {...props} />
                } else if (authed === false) {
                    return <Redirect to='/' />
                }
            }}
        ></Route>
    )
}

export default PrivateRoute;