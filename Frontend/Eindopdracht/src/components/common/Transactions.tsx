
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
                .then((data) => { return data.json(); })
                .then((transactionData: Array<Transaction>) => {
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
                    transactionData.sort((a, b) => b.rentedAt.valueOf() - a.rentedAt.valueOf());
                    setTransactions(transactionData);

                })
                .catch((error) => console.error('Error loading JSON', error));
        })
    }, []);

    function checkTransactionDate(startDate: Date, endDate: Date): boolean {
        const currentDate = new Date();
        if (currentDate <= endDate && currentDate >= startDate) {
            return true
        }
        else {
            return false
        }
    }

    function calculateAmountOfDays(startDate: Date, endDate: Date): number {
        const oneDay = 24 * 60 * 60 * 1000;
        return (Math.ceil(Math.abs((startDate.valueOf() - endDate.valueOf()) / oneDay)) + 1);
    }

    function calculateTotalPrice(startDate: Date, endDate: Date, price: number): number {
        return (calculateAmountOfDays(startDate, endDate) * price);
    }


    return (
        <>
            <Modal show={show} onHide={onHide} size='lg' >
                <Modal.Header closeButton>
                    <Modal.Title>Mijn Gehuurde Producten</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Table responsive='lg'>
                        <thead >
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
                                    <tr key={transaction.id}>
                                        <td className='align-middle'>{transaction.rentedAt.toLocaleDateString()}</td>
                                        <td className='align-middle'>{transaction.rentedUntil.toLocaleDateString()}</td>
                                        <td className='align-middle'>{`${itemType.toUpperCase().charAt(0)}${itemType.slice(1).toLowerCase()}`}</td>
                                        <td className='align-middle'>{!transaction.item.car ? 
                                        `${transaction.item.name}` : `${transaction.item.car.brand} ${transaction.item.name}`}</td>
                                        <td className='align-middle'>{`€${calculateTotalPrice(transaction.rentedAt, transaction.rentedUntil, transaction.item.price)}`}</td>
                                        <td style={{ border: '0' }} className='align-middle'>{checkTransactionDate(transaction.rentedAt, transaction.rentedUntil) ? 
                                            <Button variant='danger' className='ms-3'>schade melden</Button> : <></>}</td>
                                    </tr>
                                )
                            })}
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