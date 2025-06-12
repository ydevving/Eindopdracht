import { Button, CardText, Image, ListGroup, Card } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap';
import { FaCarSide, FaCogs, FaUsers, FaSuitcase, FaTrailer } from 'react-icons/fa';
import type { Item, Transaction, Car } from '../../../utilities/types'
import {useContext, type ReactElement} from 'react';
import { GlobalContext } from '../../../App';

export default function ItemButton({ item }: { item: Item }
) 
{
    const [itemModal, setItemModal, itemDisplay] = useContext(GlobalContext)

    if (item.car !== null) {
        return (
            <>
                {item != undefined ? <>
                    <Card className="secondary h-100" onClick={() => {itemDisplay.current = item; setItemModal(true); console.log(itemDisplay.current)}}>
                        <Card.Img src={item.imgUrl} />
                        <Card.Body>
                            <Card.Title> {item.car.brand + " " + item.name}</Card.Title>
                            <Card.Subtitle className="mb-3"> €{item.price},-/dag</Card.Subtitle>
                            <CardText className="d-flex align-items-center"><FaCarSide className="me-2"/>{item.type}</CardText>
                            <CardText className="d-flex align-items-center"><FaUsers className="me-2"/>{item.car.seats}</CardText>
                            <CardText className="d-flex align-items-center"><FaCogs className="me-2"/>{item.car.isAutomatic ? "Automaat" : "Handgeschakeld"}</CardText>
                            <CardText className="d-flex align-items-center"><FaSuitcase className="me-2"/>{item.storageSpace} {"L"}</CardText>
                        </Card.Body>
                    </Card>
                </> : <></>}
            </>
        )
    }
    if (item.car === null) {
        return (
            <>{
                item != undefined ? <>
                <Card className="secondary h-100" onClick={() => {itemDisplay.current = item; setItemModal(true); console.log(itemDisplay.current)}}>
                    <Card.Img src={item.imgUrl} />
                    <Card.Body>
                        <Card.Title>{item.type}: {item.name}</Card.Title>
                        <Card.Subtitle className="mb-3">€{item.price},-dag</Card.Subtitle>
                        <CardText className='d-flex align-items-center'> <FaSuitcase className='me-2' />{"  "}{item.storageSpace} {"type" in item && item.type.includes("Bike") ? "bicycle(s)" : "L"}</CardText>
                    </Card.Body>
                </Card>
            </> : <></>}
            </>
        )
    }
}