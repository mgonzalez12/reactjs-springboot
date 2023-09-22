import { useReducer, useState } from "react";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import { usersReducer } from "./reducers/usersReducer";
import { useUsers } from "./hooks/useUsers";


export const UsersApp = () => {

  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,

    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm

} = useUsers();

  return (
    <>
      <div className="container my-4">
        <h2>User App</h2>
        <div className="row">
          
            {!visibleForm || 
            <div className="col">
            <UserForm 
              handlerAddUser={handlerAddUser} 
              userSelected={userSelected}
              initialUserForm={initialUserForm} 
              handlerCloseForm={handlerCloseForm}
              />
              </div>
            }
          
          <div className="col">
            { visibleForm ||
            <button className="btn btn-primary my-2"
            onClick={handlerOpenForm}>
              Nuevo Usuario
            </button>
            }
            { users.length === 0 ?
            <div className="alert alert-warning">No hay usuario en el sistema</div>
              : <UsersList 
             users={users} 
             handlerUserSelectedForm={handlerUserSelectedForm}
             handlerRemoveUser={handlerRemoveUser}
             />
            }
          </div>

        </div>
      </div>
    </>
  );
}
