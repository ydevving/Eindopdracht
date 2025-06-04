import type React from 'react';
import Card from 'react-bootstrap/Card';

export default function Item({name, description, style}: {name: string, description: string, style?: React.CSSProperties}) {
  return (
    <Card onClick={() => {console.log("Clicked card!");}} style={{ width: '18rem', padding: '13px 20px', cursor: 'pointer' ,...style }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
