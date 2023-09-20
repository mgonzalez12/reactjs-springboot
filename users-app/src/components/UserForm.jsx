import React, { useState } from 'react'

const initialUserForm = {
    username:'',
    password:'',
    email:''
}

export const UserForm = ( { handlerAddUser }) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const {username, password, email } = userForm;

    const onInputChange = ({ target }) => {
       //console.log(target.value);
       const { name, value} = target;
       setUserForm({
         ...userForm,
         [name]: value,
       })
    }

    const onSubmit = ( event ) => {
        event.preventDefault();
        if(!username || !password || !email) {
            alert('Los campos no pueden ser vacios');
            return;
        }
       //console.log(userForm);

        // guardar el user form en el listado de usuario
        handlerAddUser(userForm);

        //reinicia el formulario
        setUserForm(initialUserForm);
    }
    return (
        <form onSubmit={ onSubmit }>
            <input className='form-control my-3 w-75'
                placeholder='Username'
                name="username" 
                value={username}
                onChange={ onInputChange } />
                <input className='form-control my-3 w-75'
                    placeholder='email'
                    name="email" 
                    value={email}
                    onChange={ onInputChange } />
            <input className='form-control my-3 w-75'
                placeholder='password'
                type='password'
                name="password" 
                value={password}
                onChange={ onInputChange } />
            <button
                className='btn btn-primary'>
                crear</button>
        </form>
    )
}
