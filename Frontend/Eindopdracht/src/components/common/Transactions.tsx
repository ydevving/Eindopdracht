
import { Container, Row, Col, Button, Modal, Table, } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { useEffect, useState } from'react';
import type { Transaction } from '../../entities/types';
import { TransactionSchema } from '../../entities/types';

export default function Transactions({show, onHide}: {show: boolean, onHide: () => void}) {
    
    const [transactions, setTransactions] = useState<Array<Transaction>>([])
    
    useEffect(() => {
        if (transactions.length == 0){
        fetch("http://localhost:8080/transaction/user/sterre_van+oort")
        .then((response) => {
            if (!response.ok) {
                throw new Error('failed to retrieve transactions');
            }
            return response.json();
        })
        .then((transactionData) => {

            for (let i = 0; i < transactionData.length; i++) {

                let t = transactionData[i];
                
                try {
                    transactionData[i]['rentedAt'] = new Date(t.rentedAt);
                    transactionData[i]['rentedUntil'] = new Date(t.rentedUntil); 

                    console.log(t);
                    const data = TransactionSchema.parse(t);
                    console.log(data.rentedAt);
                }
                catch(error) {
                    console.error("Invalid transaction data!", error)
                }
            }

            setTransactions(transactionData); 
            console.log(transactionData);
        })
        .catch((error) => console.error('Error loading JSON', error))
        
    }
    }, [])
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
                                <th>Type</th>
                                <th>Model</th>
                                <th>Prijs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction)=>(
                                <tr>
                                   <td>{transaction.rentedAt.toLocaleDateString()}</td>
                                   <td>{transaction.rentedUntil.toLocaleDateString()}</td>
                                   <td></td>
                                </tr>
                            ))}
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