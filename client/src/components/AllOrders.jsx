import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai'
import { deleteFromAllOrdersList, getAllOrdersListAction } from '../redux/actions/allOrdersAction';

const AllOrders = () => {
    const dispatch=useDispatch();
    const allOrders=useSelector((state)=>state.AllOrdersManager);
    useEffect(()=>{
        dispatch(getAllOrdersListAction("some data"));
        console.log(allOrders.orders)
    },[])

    const deletingOrder=(userId)=>{
        dispatch(deleteFromAllOrdersList(userId));
    }

  return (
    <div className='all-users'>
    <h3>All Orders List</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Order Id</th>
                    <th>Date & Time</th>
                    <th>Email</th>
                    <th>Payment Id</th>
                    <th>Amount</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {
                    allOrders.show ?
                        allOrders.orders.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item._id}</td>
                                <td>{item.orderedOn}</td>
                                <td>{item.userEmail}</td>
                                <td>{item.paymentId}</td>
                                <td>{item.sumPaid}</td>
                                <td className='all-user-delete' onClick={()=>deletingOrder(item._id)}><AiFillDelete /></td>
                            </tr>
                        )) :
                        console.log()
                }
            </tbody>
        </Table>
    </div>
  )
}

export default AllOrders
