
import { Container, Row, Col } from "react-bootstrap";
import ItemCard from "./ItemCard";
import type { Transaction } from "../../../entities/types";

export default function ItemColumn({ transactions, category }:
    {
        transactions: Transaction[],
        category: string
    }) {

    let sendItems = null;

    

    return (
        <Container style={{ marginTop: '40px', backgroundColor: '#FAF9F9', borderRadius: '6px' }} fluid>
            <Col style={{ color: 'black', padding: '18px' }}>
                <Row md={4}>
                    <h4 style={{ width: '100%', textAlign: 'center' }}>{category}</h4>
                </Row>

                <Container style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                    {
                        transactions.map((value, index) => {

                            let licensePlate = (value.item.car?.licenseplate) ? (
                                <div className="license-plate">
                                        <span className="plate-content">{value.item.car.licenseplate}</span>
                                </div>
                             ) : null;

                            const info = (
                                <>
                                    {licensePlate}
                                    <p>{`Rented until ${value.rentedUntil.toLocaleDateString()}`}</p>
                                </>
                            );
                            return (<Row key={index} md={4}>
                                        <ItemCard style={{ marginBlock: '15px' }} item={value.item} description={info} />
                                    </Row>);
                        })
                    }
                </Container>
            </Col>
        </Container>
    );
}
