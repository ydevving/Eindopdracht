import ItemColumns from './ItemColumns'
import { Container, Row } from 'react-bootstrap';
import SearchBar from './SearchBar';

export default function Admin() {
    return (
        <Container style={{ marginTop: '40px', backgroundColor: '#FAF9F9', borderRadius: '6px' }} fluid>
            <Row>
                <SearchBar />
            </Row>
            <Row xs='auto'>
                <ItemColumns />
            </Row>
        </Container>
    )
}