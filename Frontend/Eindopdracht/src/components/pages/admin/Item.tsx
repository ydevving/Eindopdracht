import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Item() {
  return (
    <Card onClick={() => {console.log("Clicked card!");}} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>BMW M4 Competition Cabrio</Card.Title>
        <Card.Text>
          Dikke vette cabrio heerlijk voor het vakantieleven, vakantieman.
        </Card.Text>
        <Button variant="primary"></Button>
      </Card.Body>
    </Card>
  );
}
