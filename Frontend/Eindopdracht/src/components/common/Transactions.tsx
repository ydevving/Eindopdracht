
import { Container, Row, Col, Button, Modal, Table, } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { useEffect, useState } from'react';

export default function Transactions({show, onHide}: {show: boolean, onHide: () => void}) {
    
    const [transactions, setTransactions] = useState<Array<any>>([])
    
    useEffect(() => {
        fetch("http://localhost:8080/transaction/user/${userId}")
        .then((response) => {
            if (!response.ok) {
                throw new Error('failed to retrieve transactions');
            }
            return response.json();
        })
        .then((transactionData) => setTransactions(transactionData))
        .catch((error) => console.error('Error loading JSON', error))
        // console.log(transactionData)
    })
    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header>
                    <Modal.Title>mijn gehuurde producten</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Start datum</th>
                                <th>Eind datum</th>
                                <th>type</th>
                                <th>model</th>
                                <th>prijs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {transactionsArray.map()} */}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}