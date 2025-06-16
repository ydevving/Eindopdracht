import React, { useContext, useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaCarSide, FaCogs, FaUsers, FaSuitcase } from 'react-icons/fa';
import type { Item } from '../../utilities/types';
import { isItem, isTransaction, isCar, enumToString } from '../../utilities/types';
import OrderOverviewModal from './OrderOverviewModal';
import Form from 'react-bootstrap/Form';
import { GlobalContext } from '../../App';
import { UserContext } from '../pages/user/User';

export default function ItemInfoModal({ _item, onHide }: { _item: any, onHide?: () => void }) {

  const availability = [new Date(2025, 6, 1), new Date(2025, 6, 2), new Date(2025, 6, 3), new Date(2025, 6, 4)];
  const endDate = [new Date(2025, 6, 1), new Date(2025, 6, 3), new Date(2025, 6, 5), new Date(2025, 6, 8)];
  const [selected, setSelected] = useState(Number);

  const [itemModal, setItemModal, currentItem] = useContext(UserContext);

  const itemHasCar = isCar(_item?.car);
  let item = isItem(currentItem.current) ? currentItem.current : currentItem.current?.item;

  function assignSelected(index: number) {
    setSelected(index)
  }

  const [seeOrder, setSeeOrder]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

  if (seeOrder)
    return (<OrderOverviewModal availability={availability[selected]} endDate={endDate[selected]} selected={selected} item={item} seeOrder={seeOrder} setSeeOrder={setSeeOrder} />);

  const onHideCB = (typeof onHide === 'function') ? onHide : (() => setItemModal(false));

  const userPanel = (
    <>
      <h3>€{item.price} / dag</h3>
      <p className='mt-3'><strong>Beschikbaarheid:</strong></p>
      <ul>
        <Form>
          {
            availability.map((range, index) => (
              <Form.Check key={index} type="radio" name="boxes" label={[range.toLocaleDateString(), <span> tot </span>, endDate[index].toLocaleDateString()]} onChange={() => assignSelected(index)} />
            ))
          }
        </Form>
      </ul>

      <Button onClick={() => setSeeOrder(true)} variant='warning' className='mt-3 w-100'>Huren</Button>
    </>
  );

  const itemInfoPanel = (
    <>
      <p>{item.type}</p>
      <p>{item.storageSpace}</p>
    </>
  );

  const carInfoPanel = (
    <div className='mt-4 text-start'>
      <p><FaCarSide /> {enumToString(item.type)}</p>
      <p><FaCogs /> {(item.car.isAutomatic) ? 'Automatisch' : 'Handmatig'}</p>
      <p><FaUsers /> {item.car.seats} Zitplaatsen</p>
      <p><FaSuitcase /> {item.storageSpace} Liters</p>
    </div>
  );

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
              src={(item.imgUrl) ? item.imgUrl : ''}
              alt={`${item.name}`}
              style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
            />
            {(itemHasCar) ? carInfoPanel : itemInfoPanel}
          </Col>

          {/* Right: Price and booking */}
          <Col md={6}>
            {userPanel}
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
