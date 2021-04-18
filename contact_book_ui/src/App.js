import logo from './home-icon.jpg';
import './App.css';

import {Book} from './Components/Book';
import {Form} from './Components/Form';
import {User} from './Components/User';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const [login, setLogin] = useState(localStorage.getItem('token') ? true : false);
  const [book, setBook] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const changeLogin = (newLogin) => {
    setLogin(newLogin);
  }

  const addBook = (newContact) => {
    setBook([newContact, ...book]);
  }

  const deleteBook = (id) => {
    setBook(book.filter((contact) => contact.id !== id));
  }

  const editBook = (contact) => {
    for (var i in book) {
      if (book[i].id === contact.id) {
          book[i].name = contact.name;
          book[i].email = contact.email;
          book[i].phone = contact.phone;
          book[i].type = contact.type;
         break;
      }
    }
    //setBook(book);
  }

  const editContact = (contact) => {
    setSelectedContact(contact);
    setEditForm(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('/contacts/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log(response.data.results);
        setBook(response.data.results);
      })
      .catch(error => {
        console.log(error.response);
      });
    }
    fetchData();
    }, []
  );


  return (
    <>
      <div className="container-fluid">
        <header className="blog-header py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-12 text-center">
              <h1 className="blog-header-logo text-dark font-weight-bold">A Simple Contacts Book</h1>
              <img src={logo} width="200" alt="logo"/>
            </div>
          </div>
        </header>
        <div className="row mt-5">
          {!login &&
          <div className="col-4 offset-md-4">
            <User login={login} changeLogin={changeLogin}/>
          </div>
          }

          {login &&
          <>
          <div className="col-3">
            <User login={login} changeLogin={changeLogin} />
            <Form 
            addBook={addBook} 
            editForm={editForm} 
            setEditForm={setEditForm} 
            selectedContact={selectedContact}
            editBook={editBook} />
          </div>
          <div className="col-9">
            {book &&
            <Book contacts={book} deleteBook={deleteBook} editContact={editContact} />
            }
          </div>
          </>
          }
        </div>
      </div>
    </>
  );
}

export default App;
