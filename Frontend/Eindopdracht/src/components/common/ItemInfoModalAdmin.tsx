import React, { useContext, useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaCarSide, FaCogs, FaUsers, FaSuitcase } from 'react-icons/fa';
import type { Item, Transaction } from '../../utilities/types';
import { isItem, isTransaction, isCar, enumToString } from '../../utilities/types';
import OrderOverviewModal from './OrderOverviewModal';
import Form from 'react-bootstrap/Form';
import { GlobalContext } from '../../App';
import { AdminContext } from '../pages/admin/Admin';
import placeholderImage from '../../assets/placeholderImage.webp';
import Session from '../../utilities/Session';

function deleteItem(item: Item) {
}

export default function ItemInfoModalAdmin({ _item, _category, onHide }: { _item: any, _category: string, onHide?: () => void }) {

    const availability = [new Date(2025, 6, 1), new Date(2025, 6, 2), new Date(2025, 6, 3), new Date(2025, 6, 4)];
    const endDate = [new Date(2025, 6, 1), new Date(2025, 6, 3), new Date(2025, 6, 5), new Date(2025, 6, 8)];
    const [selected, setSelected] = useState(Number);

    const [itemModal, setItemModal, itemDisplay] = useContext(AdminContext);

    const [seeOrder, setSeeOrder]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

    _category = _category.toLowerCase();

    let item = isItem(_item) ? _item : _item?.item;
    const itemHasCar = isCar(item?.car);

    function assignSelected(index: number) {
        setSelected(index)
    }

    if (seeOrder)
        return (<OrderOverviewModal availability={availability[selected]} endDate={endDate[selected]} selected={selected} item={item} seeOrder={seeOrder} setSeeOrder={setSeeOrder} />);

    const onHideCB = (typeof onHide === 'function') ? onHide : (() => setItemModal(false));

    const adminPanel = (
        <>
            <Button variant={'outline-primary'}>Markeer Als Opgelost</Button>
        </>
    );

    const itemInfoPanel = (
        <>
            <div className=' item-info-admin mt-4 text-start'>
                <span>Type: <p>{enumToString(item.type)}</p></span>
                <span>Storage Space: <p>{(item.storageSpace) ? item.storageSpace : 0}</p></span>
            </div>
        </>
    );

    const carInfoPanel = (itemHasCar) && (
        <div className='mt-4 text-start'>
            <p><FaCarSide /> {enumToString(item.type)}</p>
            <p><FaCogs /> {(item.car.isAutomatic) ? 'Automatisch' : 'Handmatig'}</p>
            <p><FaUsers /> {item.car.seats} Zitplaatsen</p>
            <p><FaSuitcase /> {item.storageSpace} Liters</p>
        </div>
    );

    let buttonLayout = undefined;

    switch (_category) {
        case 'beschikbaar':
            buttonLayout = (
                <>
                    <Button variant={'danger'} onClick={() => { deleteItem(item); }}>Verwijder Item</Button>
                </>
            );
            break;
        case 'laat':
            buttonLayout = (
                <>
                    <Button variant={'primary'} onClick={() => { }}>Markeer Als Ingeleverd</Button>
                </>
            );
            break;
        case 'beschadigd':
            buttonLayout = (
                <>
                    <Button variant={'primary'} onClick={() => { }}>Markeer Als Gerepareerd</Button>
                </>
            );
            break;
        case 'verhuurd':
            buttonLayout = (
                <>
                    <Button variant={'primary'} onClick={() => { }}>Markeer Als Ingeleverd</Button>
                </>
            );
            break;
        default:
            console.error('_category variable received in ItemInfoModalAdmin.tsx not recognized!');
            break;
    }

    return (
        <Modal show={itemModal} onHide={() => { setItemModal(false); }} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>{(isCar(item?.car)) ? `${item.car.brand} ${item.name}` : `${item.name}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    minHeight: '78vh',
                    maxWidth: '40vw',
                    overflowY: 'auto'
                }}
            >
                <Row>
                    {/* Left: Image and specs */}
                    <Col md={6} className='text-center'>
                        <img
                            src={(item.imgUrl) ? item.imgUrl : placeholderImage}
                            alt={`${item.name}`}
                            style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
                        />
                        {(itemHasCar) ? carInfoPanel : itemInfoPanel}
                    </Col>

                    {/* Right: Price and booking */}
                    <Col md={6}>
                        {adminPanel}
                    </Col>
                </Row>

                {/* Description section */}
                <hr />
                <div className='mt-4'>
                    <h5>Beschrijving</h5>
                    <p>{item.description}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
};
