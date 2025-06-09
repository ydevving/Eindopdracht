import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import Transactions from './Transactions';

export default function NavbarComponent() {
    const navigate = useNavigate()
    const [showTransactionsModal, setShowTransactionsModal] = useState<boolean>(false)

    const handleClose = () => setShowTransactionsModal(false);
    const handleShow = () => setShowTransactionsModal(true);
    return (
        <>
            <Navbar expand="lg" style={{
                backgroundColor: '#FBF7F4',
                padding: '1rem 2rem',
                borderBottom: '2px solid #E1E4E8',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}>
                <Container>
                    <Navbar.Brand style={{
                        color: '#1C2833',
                        fontWeight: '600',
                        fontSize: '1.3rem',
                        letterSpacing: '0.5px',
                    }} href="/" >Logisticus</Navbar.Brand>
                    <Nav>
                        <Button onClick={handleShow} style={{
                            margin: '0.5rem',
                            backgroundColor: '#3D4E6D',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '0.4rem 1rem',
                            fontSize: '0.9rem',
                            borderRadius: '6px',
                        }}>Mijn Transacties</Button>
                        <Button onClick={() => navigate("/login")} variant ='outline-danger' style={{
                            margin: '0.5rem',
                            padding: '0.4rem 1rem',
                            fontSize: '0.9rem',
                            borderRadius: '6px',
                        }}>Uitloggen</Button>
                    </Nav>
                </Container>
            </Navbar>
            <Transactions show={showTransactionsModal} onHide={handleClose}></Transactions>
        </>
    )
}