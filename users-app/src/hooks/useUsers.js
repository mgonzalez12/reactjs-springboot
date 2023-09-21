import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";

const initialUsers = [
    {
      id: 1,
      username: 'pepe',
      password: '12345',
      email: 'pepe@correo.com'
    },
  ];
  
  const initialUserForm = {
    id: 0,
    username:'',
    password:'',
    email:''
  }

export const useUsers = () => {

    const [users, dispatch]  = useReducer(usersReducer,initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const handlerAddUser = (user) => {
        // console.log(user)
        let type = (user.id === 0)? 'addUser' : 'updateUser';
    
        dispatch({
          type: type,
          payload: user,
        })

        Swal.fire(
            (user.id === 0) ?'Usuario Creado' : 'Usuario Actualizado',
            (user.id === 0) ?'El usuario ha sido creado con exito' : 'El usuario ha sido actualizado con exito',
            'success'
          );
        setVisibleForm(false);
        setUserSelected(initialUserForm);  
      }
    
      const handlerRemoveUser = (id) => {
        //console.log(id);
       

        Swal.fire({
            title: 'Estas Seguro que desea eliminar?',
            text: "Cuidado el usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'removeUser',
                    payload:id
                  })
              Swal.fire(
                'Usuario Eliminado!',
                'El usuario se ha eliminado con exito',
                'success'
              )
            }
          })
      }
    
      const handlerUserSelectedForm = (user) => {
         //console.log(user);
         setVisibleForm(true);
        setUserSelected({ ...user })
      }

    return {
        users,
        userSelected,
        initialUserForm,
        setVisibleForm,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm

    }
} 