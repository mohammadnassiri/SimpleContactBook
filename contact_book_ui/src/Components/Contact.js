import React from 'react';

    
export function Contact(props) {
    const contact = props.contact;
    let type = 'Home'
    switch(contact.type) {
        case 1:
          type='Mobile'
          break;
        case 2:
          type='Officce'
          break;
        default:
          type='Home'
      }
    return (
        <tr>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td>{type}</td>
            <td className="text-center">
                <button onClick={() => props.editContact(contact)} className="btn btn-secondary mr-2">Edit</button>
                <button onClick={() => props.deleteContact(contact.id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    );
}
