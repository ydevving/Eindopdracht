import ItemColumns from './ItemColumns'
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';
import ItemCard from './ItemCard';
import { fuelTypeEnum, statusEnum, typeEnum } from '../../../utilities/types';
import type { Item, Transaction } from '../../../utilities/types';
import ItemInfoModalAdmin from '../../common/ItemInfoModalAdmin';
import { useState, createContext, useRef } from 'react';

export const AdminContext: React.Context<any> = createContext<any>(false);

export default function Admin() {

    const [itemModal, setItemModal] = useState<boolean>(false);
    const currentItem = useRef<Item | Transaction>(null);
    const category = useRef<string>('');

    return (
        <AdminContext value={[itemModal, setItemModal, currentItem, category]}>
            <Container style={{ marginTop: '40px', backgroundColor: '#FAF9F9', borderRadius: '6px' }} fluid>
                <Row>
                    <SearchBar />
                </Row>
                <Row xs='auto'>
                    <ItemColumns />
                </Row>
            </Container>
            {(currentItem.current) ? <ItemInfoModalAdmin _item={currentItem.current} _category={category.current} /> : null}
        </AdminContext>
    );
}