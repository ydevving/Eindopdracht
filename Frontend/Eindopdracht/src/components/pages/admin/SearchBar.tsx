import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';


function searchUser(username: string) {

}


export default function SearchBar() {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="position-relative">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                            style={{ paddingRight: '2.5rem' }}
                            onKeyDown={() => { }}
                        />
                        <FaSearch
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#6c757d',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
