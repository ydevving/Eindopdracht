
import { Modal, Button, Row, Col } from 'react-bootstrap';
import type { Item } from '../../../entities/types';

export default function OrderOverviewModal({item, seeOrder, setSeeOrder}: { item: Item, seeOrder: boolean, setSeeOrder: React.Dispatch<React.SetStateAction<boolean>> }) {

    if (!item.car)
        return (<><h4>Couldn't find a car object in item object</h4></>);

    // {item.car.brand} {item.name}

    return (
        <Modal show={true} onHide={() => setSeeOrder(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Overview</Modal.Title>
            </Modal.Header>
            <Modal.Body
            style={{
            maxHeight: '80vh',
            overflowY: 'auto'
            }}
            >
                <h4>What is up</h4>
            </Modal.Body>
        </Modal>
    );
}
