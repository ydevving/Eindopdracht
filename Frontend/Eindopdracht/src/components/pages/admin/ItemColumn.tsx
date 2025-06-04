
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Item from "./Item";

export default function ItemColumn({ items, category }:
    {
        items: { name: string, license_plate: string }[],
        category: string
    }) {
    return (
        <Container style={{ marginTop: '40px', backgroundColor: '#FAF9F9', borderRadius: '6px' }} fluid>
            <Col style={{ color: 'black', padding: '18px' }}>
                <Row md={4}>
                    <h4 style={{ width: '100%', textAlign: 'center' }}>{category}</h4>
                </Row>

                <Container style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                    {
                        items.map((value, index) => {
                            return (<Row key={index} md={4}><Item style={{ marginBlock: '15px' }} name={value.name} description={value.license_plate} /></Row>);
                        })
                    }
                </Container>
            </Col>
        </Container>
    );
}
