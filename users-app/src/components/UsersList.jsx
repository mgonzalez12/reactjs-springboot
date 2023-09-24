import React from 'react'
import { UserRow } from './UserRow'

export const UsersList = ({ handlerUserSelectedForm, handlerRemoveUser, users = [] }) => {
    return (
        <>
            <p>Listado de usuarios</p>
            <table className='table table-hover table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>email</th>
                        <th>update</th>
                        <th>update Route</th>
                        <th>remove</th>
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
                                handlerUserSelectedForm={handlerUserSelectedForm}
                                handlerRemoveUser={handlerRemoveUser}/>

                        )

                        )
                    }
                </tbody>
            </table>
        </>
    )
}
