import ItemColumns from './ItemColumns'
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';
import ItemCard from './ItemCard';
import { fuelTypeEnum, statusEnum, typeEnum } from '../../../utilities/types';
import type { Item, Transaction } from '../../../utilities/types';
import ItemInfoModalAdmin from '../../common/ItemInfoModalAdmin';
import { useState, createContext, useRef } from 'react';
import type { categoriesType } from '../../../utilities/types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export const AdminContext: React.Context<any> = createContext<any>(false);


export default function Admin() {

    const [itemModal, setItemModal]: [boolean, React.Dispatch<boolean>] = useState<boolean>(false);
    const currentItem: React.RefObject<Item | Transaction | null> = useRef<Item | Transaction | null>(null);
    const category: React.RefObject<string> = useRef<string>('');

    let categories: categoriesType = {
            available: useState<Item[]>([]),
            late: useState<Transaction[]>([]),
            damaged: useState<Transaction[]>([]),
            rentals: useState<Transaction[]>([])
    };

    const [error, setError]: [string, React.Dispatch<string>] = useState('');

    return (
        <AdminContext value={[itemModal, setItemModal, currentItem, category, categories, error, setError]}>
            {/* {(error !== '') ? (<ErrorAlert />) : null} */}
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