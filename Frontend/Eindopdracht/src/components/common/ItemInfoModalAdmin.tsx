import React, { useContext, useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaCarSide, FaCogs, FaUsers, FaSuitcase } from 'react-icons/fa';
import type { categoriesType, Item, Transaction } from '../../utilities/types';
import { isItem, isTransaction, isCar, enumToString } from '../../utilities/types';
import OrderOverviewModal from './OrderOverviewModal';
import { GlobalContext } from '../../App';
import { AdminContext } from '../pages/admin/Admin';
import placeholderImage from '../../assets/placeholderImage.webp';
import Session from '../../utilities/Session';
import Alert from 'react-bootstrap/Alert';


function ErrorAlert() {
    return (
    <Alert show={true} variant={'danger'}>
        <Alert.Heading>
            Error Occurred!
        </Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => true} variant="outline-success">
            Close me
          </Button>
        </div>
    </Alert>
    );
}


function bringItem(
    item: Item | Transaction, 
    categories: categoriesType
    // currentItem: React.RefObject<Item | Transaction | null>, 
    // setItemModal: React.Dispatch<boolean>
): void {

    const doRequest = async () => {
        const status: any = await Session.instance.GET(`/item/${item.id}`)
            .then((data: Response) => data.json())
            .then((json) => {
                return json['status'];
            })
            .catch((error) => { console.error("Something went wrong:", error); return error; });

        if (status !== "RENTED") {
            return false;
        }

        await Session.instance.GET(`/item/admin/fixed/${item.id}`)
            .then((data: Response) => {
                if (data.ok) {
                    return data.json();
                } else if (data.status === 400) { // Bad Request
                    console.error("Bad Request");
                    return;
                }
                else if (data.status === 404) { // Not Found
                    console.error("Could not find item");
                    return;
                }
            })
            .then((json) => {
                if (json['status'] === 'AVAILABLE') {

                    let keys: string[] = Object.keys(categories);
                    let i: number = 0;
                    let found: boolean = false;

                    while (i < keys.length && !found) {
                        let key: string = keys[i];
                        let value: [Item[] | Transaction[], React.Dispatch<Item[]> | React.Dispatch<Transaction[]>] = categories[key as keyof typeof categories];

                        for (let j = 0; j < value[0].length; j++) {
                            let selected = value[0][j];

                            if (selected.id === item.id) {

                                if (!isItem(selected)) {
                                    console.error("Entity must be a transaction to change the status");
                                    return;
                                }

                                const setTransactionArray = value[1] as React.Dispatch<Transaction[]>;
                                const transactionArray = value[0] as Transaction[];

                                let newArray: Transaction[] = transactionArray.filter((value) => value.id !== item.id);
                                setTransactionArray(newArray);

                                // currentItem.current = null;
                                // setItemModal(false);
                            }
                        }
                    }
                }
            })
            .catch((error) => { console.error("Something went wrong:", error) });
    };

    doRequest();
}

function deleteItem(item: Item, categories: categoriesType, currentItem: React.RefObject<Item | Transaction | null>, setItemModal: React.Dispatch<boolean>): void {
    Session.instance.DELETE(`/item/${item.id}`)
        .then((response: Response) => {
            if (response.ok) {
                console.log('OK');

                let keys: string[] = Object.keys(categories);
                let i: number = 0;
                let found: boolean = false;

                while (i < keys.length && !found) {
                    let key: string = keys[i];
                    let value: [Item[] | Transaction[], React.Dispatch<Item[]> | React.Dispatch<Transaction[]>] = categories[key as keyof typeof categories];

                    for (let j = 0; j < value[0].length; j++) {
                        let selected = value[0][j];

                        if (selected.id === item.id) {

                            if (isTransaction(selected)) {
                                console.error("You can't delete a transaction!");
                                return;
                            }

                            const setItemArray = value[1] as React.Dispatch<Item[]>;
                            const itemArray = value[0] as Item[];

                            let newArray: Item[] = itemArray.filter((value) => value.id !== item.id);
                            setItemArray(newArray);

                            currentItem.current = null;
                            setItemModal(false);

                            found = true;
                            break;
                        }
                    }

                    i++;
                }

                Object.entries(categories).forEach(([key, value]: [key: string, value: [Item[] | Transaction[], React.Dispatch<Item[]> | React.Dispatch<Transaction[]>]]) => {
                    console.log(key, value);
                });
            }
            else if (response.status === 404)
                console.log('Not Found!')
            else
                console.error('Something went wrong:', response.body);
        });
}

export default function ItemInfoModalAdmin({ _item, _category, onHide }: { _item: any, _category: string, onHide?: () => void }) {

    const availability = [new Date(2025, 6, 1), new Date(2025, 6, 2), new Date(2025, 6, 3), new Date(2025, 6, 4)];
    const endDate = [new Date(2025, 6, 1), new Date(2025, 6, 3), new Date(2025, 6, 5), new Date(2025, 6, 8)];
    const [selected, setSelected] = useState(Number);

    const [itemModal, setItemModal, currentItem, category, categories, error, setError] = useContext(AdminContext);

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

    const itemInfoPanel = (
        <div className=' item-info-admin mt-4 text-start'>
            <span>Type: <p>{enumToString(item.type)}</p></span>
            <span>Storage Space: <p>{(item.storageSpace) ? item.storageSpace : 0}</p></span>
        </div>
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
                    <Button variant={'danger'} onClick={() => { deleteItem(item, categories, currentItem, setItemModal); }}>Verwijder Item</Button>
                </>
            );
            break;
        case 'laat':
            buttonLayout = (
                <>
                    <Button variant={'primary'} onClick={() => { bringItem(item, categories); }}>Markeer Als Ingeleverd</Button>
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
                    <Button variant={'primary'} onClick={() => { bringItem(item, categories) }}>Markeer Als Ingeleverd</Button>
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
                        {buttonLayout}
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
