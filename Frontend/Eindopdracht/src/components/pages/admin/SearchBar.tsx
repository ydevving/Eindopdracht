import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';


function searchUser(username: string) {
    // Add back-end integration

    // TODO: First Implement Session.ts, configure the login page so that the token gets stored in sessionstorage, and create wrapper
    // functions so that you can reuse the token easily and maybe tweak options
}


export default function SearchBar() {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="position-relative">
                        <Form.Control
                            type="text"
                            placeholder="Search user's info..."
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
