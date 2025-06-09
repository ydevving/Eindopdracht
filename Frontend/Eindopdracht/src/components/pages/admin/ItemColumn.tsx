
import { Container, Row, Col } from "react-bootstrap";
import ItemCard from "./ItemCard";
import type { Transaction, Item, Car } from "../../../utilities/types";
import { isItem, isTransaction, isCar } from "../../../utilities/types";
import LicensePlate from "../../common/LicensePlate";
import type { ReactElement } from "react";

export default function ItemColumn({ items, category }:
    {
        items: (Item | Transaction)[],
        category: string
    }) {


    return (
        <Container style={{ marginTop: '40px', backgroundColor: '#FAF9F9', borderRadius: '6px' }} fluid>
            <Col style={{ color: 'black', padding: '18px' }}>
                <Row md={4}>
                    <h3 style={{ width: '100%', textAlign: 'center' }}>{category}</h3>
                </Row>

                <Container style={{ maxHeight: '70vh', overflowY: 'auto', marginInline: '8px' }}>
                    {
                        items.map((value: Item | Transaction, index: number) => {


                            let _item = isItem(value) ? value : value.item;
                            let _transaction = isTransaction(value) ? value : null;
                            let _car = isCar(_item.car) ? _item.car : null;

                            const licensePlate = (_car) ? (<LicensePlate licensePlate={_car.licenseplate} />) : null;

                            const _description: (ReactElement | null)[] = [(licensePlate), (_transaction && (<b>{`Rented until ${_transaction.rentedUntil.toLocaleDateString()}`}</b>))];
                            const isNullArray: boolean = _description.every((v) => v === null);

                            return (<Row key={index} md={4}>
                                <ItemCard style={{ marginBlock: '15px' }} item={value} description={(!isNullArray) ? _description : undefined} />
                            </Row>);
                        })
                    }
                </Container>
            </Col>
        </Container>
    );
}
