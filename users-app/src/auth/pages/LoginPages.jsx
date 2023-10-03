import {  useState } from 'react'
import Swal from 'sweetalert2';

import { useAuth } from '../hooks/useAuth';

const initialLoginForm = {
    username:'',
    password:'',
} 

export const LoginPages = () => {

    const { handlerLogin } = useAuth();
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password} = loginForm;

    const onInputChange = ({ target}) => {
        const {name, value} = target;
        setLoginForm({
            ...loginForm,
            [ name ]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!username || !password){
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
        }

        // aca implementamos el login
        handlerLogin( {username, password });
        

        setLoginForm(initialLoginForm);
    }

    return (
        <>
            <div className="modal" style={ {display: 'block'}} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Iniciar Sesion</h5>
                            <p>Usuario: admin</p>
                            <p>Clave: 12345</p>
                        </div>
                        <form onSubmit={ onSubmit }>
                            <div className="modal-body">
                                <input className='form-control my-3 w-75'
                                placeholder='username'
                                name="username" 
                                value={username}
                                onChange={ onInputChange }/>

                            <input className='form-control my-3 w-75'
                                placeholder='password'
                                name="password" 
                                type='password'
                                value={password}
                                onChange={ onInputChange }/>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
