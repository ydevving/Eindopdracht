
import { Modal, Button, Row, Col } from 'react-bootstrap';
import type { Item } from '../../../entities/types';
import { useEffect, useState } from 'react'
import Session from '../../../Session';

export default function OrderOverviewModal({ item, seeOrder, setSeeOrder }: { item: Item, seeOrder: boolean, setSeeOrder: React.Dispatch<React.SetStateAction<boolean>> }) {
    let [user, setUser] = useState([''])

    console.log(Session.instance.getToken())

    useEffect(() => {
        Session.instance.GET(`/user/info`)
        .then((data: Response) => data.json())
        .then((json: { email: string, city: string, address: string }) => {
            const email = json['email'];
            const city = json['city'];
            const address = json['address'];

            console.log(email, city, address);
        })
        .catch();
    }
    );


    if (!item.car)
        return (<><h4>Couldn't find a car object in item object</h4></>);

    // {item.car.brand} {item.name}

    return (
        <Modal show={seeOrder} onHide={() => setSeeOrder(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Overzicht</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    maxHeight: '80vh',
                    overflowY: 'auto'
                }}
            >
                <h4>Check jouw bestelling</h4>
                <p className="my-0" > {item.car.brand}</p>
                <p className="my-0">{item.name}</p>
                <p className="my-0">gebruikersnaam </p>
                <p className="my-0">voornaam </p>
                <p className="my-0">achternaam</p>
                <p className="my-0">{item.status}</p>
                <p className="my-0">{item.price}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => setSeeOrder(false)}>Cancel Order</Button>
                <Button variant="succes" onClick={() => setSeeOrder(false)}>Confirm Order</Button>
            </Modal.Footer>
        </Modal>
    );
}
