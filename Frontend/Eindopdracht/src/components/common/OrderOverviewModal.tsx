import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import type { Item } from '../../utilities/types';
import { useEffect, useRef, useState } from 'react'
import Session from '../../utilities/Session';


export default function OrderOverviewModal({ availability, endDate, selected, item, seeOrder, setSeeOrder }: { availability: Date, endDate: Date, selected: number, item: Item, seeOrder: boolean, setSeeOrder: React.Dispatch<React.SetStateAction<boolean>> }) {
    let [userInfo, setUserInfo] = useState({ name: '', email: '', city: '', address: '' });

    const rentPrice = item.price * (selected + 1);


    useEffect(() => {

        const doRequest = async () => {
            Session.instance.GET(`/user/info/royce_schut`)
                .then((data: Response) => data.json())
                .then((json: { username: string, email: string, city: string, address: string }) => {
                    setUserInfo({
                        name: json['username'],
                        email: json['email'],
                        city: json['city'],
                        address: json['address']
                    });

                    console.log(userInfo.name, userInfo.email, userInfo.city, userInfo.address);
                });
        };

        if (Session.instance.isTokenPresent())
            doRequest();

        Session.instance.onTokenAvailable(doRequest);
    }, []);


    if (!item.car)
        return (<><h4 style={{color: 'red'}}>Couldn't find a car object in item object</h4></>);

    return (
        <Modal show={seeOrder} onHide={() => setSeeOrder(false)} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title><h2>Check jouw bestelling</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    minHeight: '70vh',
                    maxWidth: '40vw',
                    overflowY: 'auto'
                }}
            >
                <Container>
                    <Row>
                        <Col md={5}>
                            <h4 className="mb-1 text-weight-bold">Jouw Gegevens</h4>
                            <p className="my-0">{userInfo.name}</p>
                            <p className="my-0">{userInfo.city}</p>
                            <p className="my-0">{userInfo.address}</p>
                            <p className="my-0">{userInfo.email} </p>
                        </Col>
                        <Col md={{ span: 4, offset: 3 }}>
                            <h4 className="mb-1 text-weight-bold">Bestelling Gegevens</h4>
                            <p className="my-0">{item.car.brand}</p>
                            <p className="my-0">{item.name}</p>
                            <p className="my-0">{item.status}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={5}>
                            <h4 className="mt-5 mb-1 text-weight-bold">Huur Gegevens</h4>
                            <p className="my-0">Begin van Huur: {availability.toLocaleDateString()}</p>
                            <p className="my-0">Eind van Huur: {endDate.toLocaleDateString()}</p>
                            <p className="my-0">Totale Prijs van Huur: €{rentPrice}</p>
                        </Col>

                        <Col md={{ span: 4, offset: 3 }}>
                            <h4 className="mt-5 mb-1 text-weight-bold">Voorwaardes:</h4>
                            <p className="my-0">Huur Auto/Voorwerp zelf ophalen en Terugbrengen</p>
                            <p className="my-0 text-danger">Boete is van spraken wanneer Verhuurde Voorwerp niet optijd is Teruggebracht</p>
                        </Col>
                    </Row>

                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <Row >
                        <Col>
                            <Button className="px-5 errorCancel" onClick={() => setSeeOrder(false)}>Cancel Order</Button>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Button className="px-5 succesConfirm" onClick={() => setSeeOrder(false)}>Confirm Order</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}
