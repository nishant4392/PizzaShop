import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const OrderCard = (props) => {
    const order = props.order;
    const [show, setShow] = useState(false);
    return (
        <div className='order-card'>
            <Card style={{ width: '30rem' }}>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Order No : {order._id}</ListGroup.Item>
                    <ListGroup.Item>Name : {order.userName}</ListGroup.Item>
                    <ListGroup.Item>Total Amount : {order.sumPaid}</ListGroup.Item>
                    <ListGroup.Item>Delivered On : {order.orderedOn}</ListGroup.Item>
                </ListGroup>
                <Card.Body className='order-card-view-button'>
                    <Button variant="primary" onClick={() => setShow(true)}>
                        View Order List
                    </Button>
                </Card.Body>
            </Card>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Order List
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        order.cart.map((item, index) => (
                            <div>
                            <h7 className="order-card-modal">
                                {item.varient} {item.name} x {item.quantity} = {item.totalPrice}
                            </h7>
                            </div>
                        ))
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default OrderCard
