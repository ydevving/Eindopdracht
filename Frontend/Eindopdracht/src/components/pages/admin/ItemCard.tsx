import type React from 'react';
import Card from 'react-bootstrap/Card';
import type { Item } from '../../../entities/types';
import type { ReactElement } from 'react';

export default function Item({ item, description, style }: { item: Item, description: ReactElement, style?: React.CSSProperties }) {
    return (
        <Card className='d-flex flex-column gap-2' onClick={() => { console.log("Clicked card!"); }} style={{ width: '18rem', padding: '13px 20px', cursor: 'pointer', ...style }}>
            <Card.Img variant="top" src={(item.imgUrl) ? item.imgUrl : ''} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text className='d-flex flex-column gap-2'>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
