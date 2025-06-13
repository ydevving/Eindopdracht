import ItemColumns from './ItemColumns'
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';
import ItemCard from './ItemCard';
import { fuelTypeEnum, statusEnum, typeEnum } from '../../../utilities/types';

export default function Admin() {
    return (
        <Container style={{ marginTop: '40px', backgroundColor: '#FAF9F9', borderRadius: '6px' }} fluid>
            <Row> 
                <SearchBar />    
            </Row>
            <Row xs='auto'>
                <ItemColumns />
                {/* <ItemCard item={transaction[0]}  /> */}
            </Row>
        </Container>
    )
}