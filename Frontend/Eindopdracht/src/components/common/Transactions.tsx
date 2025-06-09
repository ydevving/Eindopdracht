
import { Container, Row, Col, Button, Modal, Table, } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import type { Transaction } from '../../utilities/types';
import { TransactionSchema } from '../../utilities/types';
import Session from '../../utilities/Session';

export default function Transactions({ show, onHide }: { show: boolean, onHide: () => void }) {

    const [transactions, setTransactions] = useState<Array<Transaction>>([]);

    useEffect(() => {
        if (transactions.length !== 0)
            return;

        Session.instance.onTokenAvailable((token) => {
            Session.instance.GET('/transaction/admin/royce_schut')
                .then((data) => { console.log(data); return data.json() })
                .then((transactionData) => {
                    console.log('Inside transactionData');
                    for (const t of transactionData) {
                        try {
                            t['rentedAt'] = new Date(t.rentedAt);
                            t['rentedUntil'] = new Date(t.rentedUntil);

                            const data = TransactionSchema.parse(t);
                        }
                        catch (error) {
                            console.error("Invalid transaction data!", error);
                        }
                    }

                    setTransactions(transactionData);
                    console.log(transactionData);
                })
                .catch((error) => console.error('Error loading JSON', error));
        })
    }, []);

    

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header>
                    <Modal.Title>Mijn Gehuurde Producten</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Start datum</th>
                                <th>Eind datum</th>
                                <th>Type</th>
                                <th>Naam</th>
                                <th>Prijs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => { 
                                let itemType = transaction.item.type.toString();
                                
                                return (
                                <tr>
                                    <td>{transaction.rentedAt.toLocaleDateString()}</td>
                                    <td>{transaction.rentedUntil.toLocaleDateString()}</td>
                                    <td>{`${itemType.toUpperCase().charAt(0)}${itemType.slice(1).toLowerCase()}`}</td>
                                    <td>{!transaction.item.car ? `${transaction.item.name}` : `${transaction.item.car.brand} ${transaction.item.name}`}</td>
                                    <td>{`€${transaction.item.price}`}</td>
                                </tr>
                            )})}
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