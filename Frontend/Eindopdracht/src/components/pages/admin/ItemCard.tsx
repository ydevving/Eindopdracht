import type React from 'react';
import Card from 'react-bootstrap/Card';
import type { Item, Transaction } from '../../../entities/types';
import type { ReactElement } from 'react';

function isItem(variable: any): variable is Item {
    return (
        typeof variable === 'object' &&
        variable !== null &&
        typeof variable?.name === 'string'
    );
}

function isTransaction(variable: any): variable is Transaction {
    return (
        typeof variable === 'object' &&
        variable !== null &&
        typeof variable?.rentedAt === 'object'
    );
}

export default function ItemCard({ item, description, style }: { item: Item | Transaction, description?: ReactElement, style?: React.CSSProperties }) {

    console.log(isItem(item));
    console.log(isTransaction(item))

    return (<div>Testing</div>);

    // return (
    //     <Card className='d-flex flex-column gap-2' onClick={() => { console.log("Clicked card!"); }} style={{ width: '18rem', padding: '13px 20px', cursor: 'pointer', ...style }}>
    //         <Card.Img variant="top" src={(item.imgUrl) ? item.imgUrl : ''} />
    //         <Card.Body>
    //             <Card.Title>{item.name}</Card.Title>
    //             <Card.Text className='d-flex flex-column gap-2'>
    //                 {description}
    //             </Card.Text>
    //         </Card.Body>
    //     </Card>
    // );
}
