
import { Modal, Button, Row, Col } from 'react-bootstrap';
import type { Item } from '../../../entities/types';

export default function OrderOverviewModal({item, seeOrder, setSeeOrder}: { item: Item, seeOrder: boolean, setSeeOrder: React.Dispatch<React.SetStateAction<boolean>> }) {

    if (!item.car)
        return (<><h4>Couldn't find a car object in item object</h4></>);


    return (
        <Modal show={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Overview - {item.car.brand} {item.name}</Modal.Title>
            </Modal.Header>
        </Modal>
    );
}
