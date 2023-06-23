import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromAllPizzaList, getAllPizzaListAction } from '../redux/actions/pizzaListAction';
import { getPizzaToOperateOn } from '../redux/actions/pizzaOpAction';

const AllPizza = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const pizzas = useSelector((state) => state.getAllPizzaListManager);

  useEffect(() => {
    dispatch(getAllPizzaListAction());
  }, [])

  const updatingPizza = (item) => {
    dispatch(getPizzaToOperateOn(item));
    navigate("update-pizza/");
  }
  const deletingPizza=(item)=>{
    dispatch(deleteFromAllPizzaList(item._id));
  }

  return (
    <div className='all-pizzas'>
      <h1>All Pizzas List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Pizza Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Types</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {
            pizzas.show ?
              pizzas.pizzas.map((item, index) => (
                <tr key={index}>
                  <td ><div className='all-pizza-td'>{index + 1}</div></td>
                  <td><div className='all-pizza-td'>{item._id}</div></td>
                  <td><div className='all-pizza-td'>{item.name}</div></td>
                  <td><div className='all-pizza-td'>{item.category}</div></td>
                  <td>
                    <div>{item.sizes[0].name} <span className='all-pizza-span'>{item.sizes[0].price}</span></div>
                    <div>{item.sizes[1].name} <span className='all-pizza-span'>{item.sizes[1].price}</span></div>
                    <div>{item.sizes[2].name} <span className='all-pizza-span'>{item.sizes[2].price}</span></div>
                  </td>
                  <td>
                    <div><div className='all-pizza-td-op' onClick={() => updatingPizza(item)}><GrUpdate /></div></div>
                    <div><div className='all-pizza-td-op' onClick={() => deletingPizza(item)}><AiFillDelete /></div></div>
                  </td>
                </tr>
              )) :
              console.log()
          }
        </tbody>
      </Table>
    </div>
  )
}

export default AllPizza
