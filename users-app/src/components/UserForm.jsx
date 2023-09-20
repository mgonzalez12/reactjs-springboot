import React, { useEffect, useState } from 'react'

export const UserForm = ( { userSelected, handlerAddUser, initialUserForm }) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const {id, username, password, email } = userForm;

    useEffect( () => {
        setUserForm({
            ...userSelected,
            password: '',
        });
    }, [userSelected]);

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
        if(!username || (!password && id === 0) || !email) {
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
            { id > 0 ||
            <input className='form-control my-3 w-75'
            placeholder='password'
            type='password'
            name="password" 
            value={password}
            onChange={ onInputChange } /> }        
            
            <input type='hidden' name='id' value={id} />    
            <button
                className='btn btn-primary'>
                { id > 0 ? 'Editar' : 'Crear' }</button>
        </form>
    )
}
