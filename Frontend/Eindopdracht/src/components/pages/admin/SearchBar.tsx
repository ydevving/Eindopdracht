import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react'
import CustomerInfo from './CustomerInfo';

export default function SearchBar() {
    const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>(''); 

    const handleClose = () => setShowCustomerModal(false);
    const handleShow = () => setShowCustomerModal(true);

    return (
        <Container>
            <Row className="justify-content-center" >
                <Col md={6}>
                    <div className="position-relative" style={{ marginLeft: '15%' }}>
                        <Form.Control
                            type="text"
                            placeholder="Zoek klant informatie op..."
                            className="search-input"
                            style={{ paddingRight: '2.5rem' }}
                            onKeyDown={() => { }}
                            onChange={(event) => {
                                if (event?.target) {
                                    setSearchText(event.target.value);
                                }
                            }}
                        />
                        <FaSearch
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#6c757d',
                                pointerEvents: 'none'
                            }}
                        />
                    </div>
                </Col>
                <Col md={{ span: 2 }} style={{marginBlock: 'auto'}}>
                    <Button onClick={handleShow} style={{
                        backgroundColor: '#3D4E6D',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.9rem',
                        paddingBlock: '0.4rem'
                    }}>Zoek Klant</Button>
                </Col>
            </Row>
            <CustomerInfo show={showCustomerModal} onHide={handleClose} username={searchText} ></CustomerInfo>
        </Container>
    );
};
