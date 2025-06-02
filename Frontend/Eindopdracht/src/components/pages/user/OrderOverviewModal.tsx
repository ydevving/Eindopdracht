
import { Modal, Button, Row, Col } from 'react-bootstrap';

export default function OrderOverviewModal({car}) {
    return (
        <Modal show={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Overview - {car.brand} {car.model}</Modal.Title>
            </Modal.Header>
        </Modal>
    );
}
