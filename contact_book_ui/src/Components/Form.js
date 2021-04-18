import axios from 'axios';
import React, { useEffect, useState } from 'react';

    
export function Form(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState(0);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [editId, setEditID] = useState(null);

    
    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setType(0);
        setEditID('');
    }
    
    useEffect(()=>{
        if(props.editForm){
            const contact = props.selectedContact;
            console.log(contact);
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setType(contact.type);
            setEditID(contact.id);
        }
    }, [props.selectedContact, props.editForm]);

    const handle_submit = (e) => {

        e.preventDefault();
        
        let currentBook = null;

        axios.get('/books/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            console.log(response.data);
            const results = response.data.results;
            currentBook = "/books/" + results[results.length -1].id + "/";
            console.log("Current Book: " + currentBook);
            const data = {
                book: currentBook,
                name: name,
                email: email,
                phone: phone,
                type: type, 
            }
            sendData(data);
          })
          .catch(error => {
            console.log(error.response);
            createBook(e);
          });
        
        let retry = 0;

        const createBook = (e) => {
            try {
                const user_id = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user_id;
                const currentUser = "/users/" + user_id + "/";
                axios.post('/books/', {owner: currentUser}, {
                        headers: {
                            Authorization: `JWT ${localStorage.getItem('token')}`,
                        }
                })
                .then(response => {
                    console.log(response.data);
                    if(retry === 0){
                        handle_submit(e);
                    }
                    retry += 1;
                })
                .catch(error => {
                    console.log(error.response.data);
                    setError(true);
                    setErrorMessage(error.response.data);
                    retry += 1;
                });
            } catch (e) {
                return null;
            }
        }

        const sendData = (data) => {
            if(props.editForm){
                axios.put('/contacts/' + editId + '/', data, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }
                })
                .then(response => {
                    console.log(response.data);
                    props.editBook(response.data);
                    setError(false);
                    props.setEditForm(false);
                    clearForm();
                })
                .catch(error => {
                    console.log(error.response);
                    setError(true);
                    setErrorMessage(error.response);
                });
            }else{
                axios.post('/contacts/', data, {
                        headers: {
                            Authorization: `JWT ${localStorage.getItem('token')}`,
                        }
                })
                .then(response => {
                    console.log(response.data);
                    props.addBook(response.data);
                    setError(false);
                })
                .catch(error => {
                    console.log(error.response);
                    setError(true);
                    setErrorMessage(error.response);
                });
            }
        }

    };

    let htmlErrorMessages = [];
    if(error){
        for (var key in errorMessage) {
            console.log(errorMessage[key]);
            if (errorMessage.hasOwnProperty(key)) {
                htmlErrorMessages = [...htmlErrorMessages, <li key={key}>{key+': '+errorMessage[key]}</li>]
            }
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                Add Contact
            </div>
            <div className="card-body">
                <form onSubmit={e => handle_submit(e)}>
                    {error &&
                    <div className="alert alert-danger" role="alert">
                        {htmlErrorMessages}
                    </div>
                    }
                    <div className="form-group">
                        <label htmlFor="exampleInputName1">Full Name</label>
                        <input 
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        name="name" 
                        type="text" 
                        className="form-control" 
                        id="exampleInputName1" 
                        aria-describedby="emailHelp" 
                        placeholder="Full name ..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        name="email" 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Email ..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPhone1">Phone Number</label>
                        <input 
                        value={phone}
                        onChange={e => setPhone(e.target.value)} 
                        name="phone" 
                        type="tel" 
                        className="form-control" 
                        id="exampleInputPhone1" 
                        placeholder="Phone number ..." />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input 
                            checked={type === 0 ? 'checked' : ''}
                            onChange={e => setType(parseInt(e.target.value))} 
                            className="form-check-input" 
                            type="radio" 
                            name="home" 
                            id="inlineRadio1" 
                            value="0"/>
                            <label className="form-check-label" htmlFor="inlineRadio1">Home</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input 
                            checked={type === 1 ? 'checked' : ''}
                            onChange={e => setType(parseInt(e.target.value))} 
                            className="form-check-input" 
                            type="radio" 
                            name="mobile" 
                            id="inlineRadio2" 
                            value="1" />
                            <label className="form-check-label" htmlFor="inlineRadio2">Mobile</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input 
                            checked={type === 2 ? 'checked' : ''}
                            onChange={e => setType(parseInt(e.target.value))} 
                            className="form-check-input" 
                            type="radio" 
                            name="office" 
                            id="inlineRadio3" 
                            value="2" />
                            <label className="form-check-label" htmlFor="inlineRadio3">Office</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}
