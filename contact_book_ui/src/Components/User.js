import axios from 'axios';
import React, { useEffect, useState } from 'react';

    
export function User(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get('/core/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          props.changeLogin(true);
          setUsername(response.data.username);
        })
        .catch(error => {
          console.log(error.response);
          localStorage.removeItem('token');
          setUsername('');
        });
      }, [props]
    );

    const handle_submit = (e) => {

        e.preventDefault();

        axios.post('/token-auth/', {
                username: username, 
                password: password
        }, {
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(response => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            setUsername(response.data.user.username);
            props.changeLogin(true);
            setError(false);
        })
        .catch(error => {
            try{
                console.log(error.response.data.non_field_errors[0]);
                if(error.response.data.non_field_errors[0] === "Unable to log in with provided credentials."){
                    handle_register();
                }
            }
            catch(e){
                console.log(e);
                console.log(error);
            }
        });

    };
    
    const handle_logout = () => {
        localStorage.removeItem('token');
        props.changeLogin(false);
    };
    
    const handle_register = () => {
        
        axios.post('/core/users/', {
                username: username, 
                password: password
        }, {
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(response => { 
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            setUsername(response.data.username);
            props.changeLogin(true);
            setError(false);
        })
        .catch(error => {
            console.log(error);
            setError(true);
            setErrorMessage(error.response.data);
        });

    }

    let htmlErrorMessages = [];
    if(error){
        for (var key in errorMessage) {
            console.log(errorMessage[key]);
            if (errorMessage.hasOwnProperty(key)) {
                htmlErrorMessages = [...htmlErrorMessages, <li key={key}>{key+': '+errorMessage[key]}</li>]
            }
        }
    }

    const login_form = (
        <form onSubmit={e => handle_submit(e)}>
            {error &&
            <div className="alert alert-danger" role="alert">
                {htmlErrorMessages}
            </div>
            }
            <div className="form-group">
                <label>Username</label>
                <input 
                value={username}
                onChange={e => setUsername(e.target.value)}
                name="username" 
                type="text" 
                className="form-control" 
                aria-describedby="emailHelp" 
                placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                value={password}
                onChange={e => setPassword(e.target.value)} 
                name="password" 
                type="password" 
                className="form-control" 
                placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );

    const logout = (
        <>
            <div className="mb-2">Hi, {username}</div>
            <button onClick={handle_logout} type="submit" className="btn btn-primary">Logout</button>
        </>
    );

    return (
        <div className="card mb-3">
            <div className="card-header">
                Register / Login
            </div>
            <div className="card-body">
                {props.login ? logout : login_form}
            </div>
        </div>
    );
}
