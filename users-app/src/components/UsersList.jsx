import React, { useContext } from 'react'
import { UserRow } from './UserRow'
import { UserContext } from '../context/UserContext'
import { AuthContext } from '../auth/context/AuthContext';

export const UsersList = () => {
    const { users } = useContext(UserContext);
    const {login } = useContext(AuthContext);

    return (
        <>
            <p>Listado de usuarios</p>
            <table className='table table-hover table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>email</th>

                        {!login.isAdmin ||
                        <>
                        <th>update</th>
                        <th>update Route</th>
                        <th>remove</th>
                        </>
                         }
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({id, username, email}) => (
                           <UserRow  
                                key={id}
                                id={id}
                                username={username}
                                email={email}
                              />

                        )

                        )
                    }
                </tbody>
            </table>
        </>
    )
}
