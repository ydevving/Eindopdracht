
import { Container, Row, Col } from "react-bootstrap";
import ItemCard from "./ItemCard";
import type { Transaction, Item, Car } from "../../../utilities/types";
import { isItem, isTransaction, isCar } from "../../../utilities/types";

export default function ItemColumn({ items, category }:
    {
        items: Item[] | Transaction[],
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
                        items.map((value: Item | Transaction, index: number) => {


                            let _item = isItem(value) ? value : value.item;
                            let _transaction = isTransaction(value) ? value : null;
                            let _car = isCar(_item.car) ? _item.car : null;

                            // if (!_car)
                            // return <p>This is not a car, a regular item still needs to be implemented</p>;

                            const licensePlate = (_car) ? (
                                <div className="license-plate">
                                        <span className="plate-content">{_car.licenseplate}</span>
                                </div>
                             ) : null;

                            console.log(_item.car);
                            console.log((_car) ? 'present' : 'no presento!');

                            const info = (
                                <>
                                    <div>
                                        {licensePlate}
                                        {/* {_transaction && (<p>{`Rented until ${_transaction.rentedUntil.toLocaleDateString()}`}</p>)} */}
                                    </div>
                                </>
                            );

                            console.log('20 deep?? in this bih')

                            return (<Row key={index} md={4}>
                                <ItemCard style={{ marginBlock: '15px' }} item={_item} description={info} />
                            </Row>);
                        })
                    }
                </Container>
            </Col>
        </Container>
    );
}
