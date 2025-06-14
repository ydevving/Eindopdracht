import type React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import type { Item, Transaction, Car } from '../../../utilities/types';
import { isItem, isTransaction, isCar, enumToString } from "../../../utilities/types";
import { useContext, type ReactElement } from 'react';
import placeholderImage from '../../../assets/placeholderImage.webp';
import { GlobalContext } from '../../../App';
import ItemInfoModal from '../../common/ItemInfoModal';
import { AdminContext } from './Admin';

export default function ItemCard({ item, description, _category, style }:
    { item: (Item | Transaction), description?: (ReactElement | null)[], _category: string, style?: React.CSSProperties }
) {

    const _item: Item = isItem(item) ? item : item.item;
    const _transaction: Transaction | null = isTransaction(item) ? item : null;
    const _car: Car | null = isCar(_item.car) ? _item.car : null;

    const subTitle = (_car) ? _car.brand : enumToString(_item.type);

    const [itemModal, setItemModal, itemDisplay, category] = useContext(AdminContext);

    return (
        <>
            <style type="text/css">{".list-group-flush > div { padding-left: 0; }"}</style>
            <Card
                className='d-flex flex-column gap-2'
                onClick={() => { itemDisplay.current = item; category.current = _category; setItemModal(true); }}
                style={{ width: '18rem', padding: '13px 20px', cursor: 'pointer', ...style }}
            >
                <Card.Img style={{ borderRadius: "var(--bs-card-inner-border-radius)" }} src={(_item.imgUrl) ? _item.imgUrl : placeholderImage} />
                <Card.Body>
                    <Card.Title>{_item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{subTitle}</Card.Subtitle>
                    {
                        description &&
                        <ListGroup className="list-group-flush" style={{ marginTop: '15px' }}>
                            {(description && description.map((value, index) => (<ListGroup.Item key={index}>{value}</ListGroup.Item>)))}
                        </ListGroup>
                    }
                </Card.Body>
            </Card>
        </>);
}
