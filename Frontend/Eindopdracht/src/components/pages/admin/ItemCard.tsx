import type React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import type { Item, Transaction, Car } from '../../../utilities/types';
import { isItem, isTransaction, isCar } from "../../../utilities/types";
import type { ReactElement } from 'react';
import placeholderImage from '../../../assets/placeholderImage.webp';

export default function ItemCard({ item, description, style }: { item: (Item | Transaction), description?: ReactElement, style?: React.CSSProperties }) {

    const _item: Item = isItem(item) ? item : item.item;
    const _transaction: Transaction | null = isTransaction(item) ? item : null;
    const _car: Car | null = isCar(_item.car) ? _item.car : null;

    const subTitle = (_car) ? _car.brand : _item.type;

    // return (<div>Testing</div>);

    return (
        <>
            <style type="text/css">{".list-group-flush > div { padding-left: 0; }"}</style>
            <Card className='d-flex flex-column gap-2' onClick={() => { console.log("Clicked card!"); }} style={{ width: '18rem', padding: '13px 20px', cursor: 'pointer', ...style }}>
                <Card.Img style={{borderRadius: "var(--bs-card-inner-border-radius)"}} src={(_item.imgUrl) ? _item.imgUrl : placeholderImage} />
                <Card.Body>
                    <Card.Title>{_item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{subTitle}</Card.Subtitle>
                    <ListGroup className="list-group-flush" style={{marginTop: '15px'}}>
                        <ListGroup.Item>{description}</ListGroup.Item>
                        {(_transaction) ? (<ListGroup.Item><strong>Gehuurd tot {'2020'}</strong></ListGroup.Item>) : null}
                    </ListGroup>

                </Card.Body>
            </Card>
        </>);
}
