import axios from 'axios';
import React, { useState } from 'react';
import {Contact} from './Contact'

    
export function Book(props) {

    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const deleteContact = (id) => {
        axios.delete('/contacts/' + id + '/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log(response.data);
            setSuccess(true);
            setSuccessMessage("The contact deleted successfully.");
            props.deleteBook(id);
        })
        .catch(error => {
            console.log(error.response.data);
            setError(true);
            setErrorMessage(error.response.data);
        });
    }

    const editContact = (contact) => {
        props.editContact(contact);
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
    
    return(
        
        <div className="card book-card">
            <div className="card-header">
                Book
            </div>
            {error &&
            <div className="alert alert-danger alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                {htmlErrorMessages}
            </div>
            }
            {success &&
            <div className="alert alert-success alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                {successMessage}
            </div>
            }
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">type</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {props.contacts.map((contact, index) =>
                    <Contact deleteContact={deleteContact} editContact={editContact} contact={contact} key={index}/>
                )}
            </tbody>
        </table>
        </div>
    );
}
