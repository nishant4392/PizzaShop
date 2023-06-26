import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers,deleteFromAllUser } from '../redux/actions/allUserAction';

const AllUsers = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.allUserManager);
    useEffect(() => {
        dispatch(getAllUsers("some data"));
    }, [dispatch])

    const deleteUser = (id) => {
        dispatch(deleteFromAllUser(id));
    }

    return (
        <div className='all-users'>
        <h3>All Users List</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.show ?
                            allUsers.users.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td className='all-user-delete' onClick={() => deleteUser(item._id)}><AiFillDelete /></td>
                                </tr>
                            )) :
                            console.log()
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default AllUsers
