import React from 'react';
import Table from 'react-bootstrap/Table';

const Contact = () => {
    return (
        <div className='contact'>
            <div className="contact-up">
                <div className="contact-left">
                    <h1>Our New Pizza Shop</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima odio reiciendis deserunt? Animi dolorem atque, enim voluptate mollitia debitis minima iure ex numquam quas quaerat veniam molestias deleniti deserunt voluptatem qui nostrum, adipisci veritatis blanditiis? Minus repellat perspiciatis, illo optio earum voluptatibus, architecto in voluptates veritatis fugit eaque soluta, nesciunt est porro sint consequatur quisquam nihil cum possimus. Maiores eius laborum, quas id cum, dicta consectetur incidunt praesentium earum assumenda nostrum voluptas quidem tempore, laboriosam suscipit vel atque nemo voluptate placeat harum! Numquam, magnam! Qui debitis officiis quia. Voluptate, facilis ea. Laborum mollitia rem ratione, incidunt neque porro voluptatibus natus, quaerat recusandae quas numquam architecto deleniti cumque. Explicabo, nobis voluptas cumque ea, eius iusto tenetur voluptatibus porro sit dolore accusamus dolorem voluptatum, repellendus consectetur fuga a ad optio alias distinctio esse eum. Velit sapiente necessitatibus debitis nam autem non facere facilis vel, numquam inventore dignissimos eaque, sint nulla saepe aut voluptates iure laudantium recusandae at doloribus fugiat voluptatem totam. Maxime hic dolor cupiditate voluptatum enim itaque deserunt? Iusto harum officiis dolorem vel quia aliquid ipsam corrupti! Aperiam aliquam eum, quisquam cumque reprehenderit consequuntur libero pariatur, fugiat numquam fugit repellat ipsam alias hic? Possimus odio dolores quasi distinctio ut sapiente nulla.</p>
                </div>
                <div className="contact-right">Photo</div>
            </div>
            <div className="contact-middle">
                <h3>CONTACT DETAILS</h3>
            </div>
            <div className="contact-down">
                <Table className='contact-table' striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Contact