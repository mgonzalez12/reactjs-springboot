import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";
import { UserModelForm } from "../components/UserModelForm";
import { useAuth } from "../auth/hooks/useAuth";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/layout/Paginator";

export const UsersPage = () => {

  const { page } = useParams();

  const {
    users,
    visibleForm,
    isLoading,
    paginator,
    handlerOpenForm,
    getUsers,
  
  } = useUsers();

  const {login } = useAuth();

  useEffect( () => {
    getUsers(page);
  }, [,page])

  if (isLoading) {
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  } 
  return (
    <>

      {!visibleForm ||
        <UserModelForm/>
      }
      <div className="container my-4">
        <h2>User App</h2>
        <div className="row">
          <div className="col">
            {(visibleForm || !login.isAdmin )||
              <button className="btn btn-primary my-2"
                onClick={handlerOpenForm}>
                Nuevo Usuario
              </button>
            }
            {users.length === 0 ?
              <div className="alert alert-warning">No hay usuario en el sistema</div>
              : <>
                <UsersList />
                <Paginator url="/users/page" paginator={paginator} />
                </> 
              
            }
          </div>

        </div>
      </div>
    </>
  );
}
