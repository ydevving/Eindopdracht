import { Container, Row, Col, Button } from 'react-bootstrap'

export default function Navbar() {
    return (
        <Container style={{
            background: "#1E2A38",
            height: "15vh",
            color: "black",
            fontSize: "3vh"
        }}>
            <Row>
                <Col>
                    <Button variant="danger">My Rentals</Button>
                </Col>
                <Col>
                    <Button>Log Out</Button>
                </Col>
            </Row>
        </Container>
    )
}