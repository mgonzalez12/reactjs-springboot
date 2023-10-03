import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';

export const UserForm = ( { userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors } = useContext(UserContext);
    const [userForm, setUserForm] = useState(initialUserForm);

    const {id, username, password, email, admin } = userForm;
    const [checked, setChecked] = useState(userForm.admin);

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
    const onCheckboxChange = () => { 
         setChecked(!checked);
         setUserForm({
          ...userForm,
            admin:checked,
         })
    }

    const onSubmit = ( event ) => {
        event.preventDefault();
        // guardar el user form en el listado de usuario
        handlerAddUser(userForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }
    return (
        <form onSubmit={ onSubmit }>
            <input className='form-control my-3 w-75'
                placeholder='Username'
                name="username" 
                value={username}
                onChange={ onInputChange } />
            <p className='text-danger' >{errors?.username}</p> 

            <input className='form-control my-3 w-75'
                    placeholder='email'
                    name="email" 
                    value={email}
                    onChange={ onInputChange } />
            <p className='text-danger' >{errors?.email}</p>    

            <div className="my-3 form-check">
                <input type="checkbox"  name='admin' checked={admin} className='form-check-input'
                onChange={ onCheckboxChange } />
                <label className="form-check-label"> Admin </label>
            </div>
            { id > 0 ||
            <input className='form-control my-3 w-75'
            placeholder='password'
            type='password'
            name="password" 
            value={password}
            onChange={ onInputChange } /> }
            <p className='text-danger' >{errors?.password}</p>         
            
            <input type='hidden' name='id' value={id} />    
            <button
                className='btn btn-primary'>
                { id > 0 ? 'Editar' : 'Crear' }</button>

            {!handlerCloseForm ||     
            <button className="btn btn-outline-danger mx-2" type='button'
             onClick={ () => onCloseForm()}>
              Cerrar
            </button>    
            }
        </form>
    )
}
