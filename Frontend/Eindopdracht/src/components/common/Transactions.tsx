
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Outlet } from 'react-router';

export default function Transactions({show, onHide}: {show: boolean, onHide: () => void}) {
    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header>
                    <Modal.Title>mijn gehuurde producten</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>test TEST</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}