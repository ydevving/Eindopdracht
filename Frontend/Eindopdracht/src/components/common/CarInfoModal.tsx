import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaCarSide, FaCogs, FaUsers, FaSuitcase } from 'react-icons/fa';
import type { Item } from '../../utilities/types';
import OrderOverviewModal from './OrderOverviewModal';
import Form from 'react-bootstrap/Form';

export default function CarInfoModal({ show, onHide, item }: {show: boolean, onHide: () => void, item: Item}) {

  const availability = [new Date(2025, 6, 1),  new Date(2025, 6, 2),  new Date(2025, 6, 3), new Date(2025, 6, 4)];
  const endDate = [new Date(2025, 6,1), new Date(2025, 6,3 ), new Date(2025,6, 5), new Date(2025, 6, 8)];
  const [selected, setSelected] = useState(Number);

  function assignSelected(index: number){
    setSelected(index)
  }
  
  if (!item.car)
    return (<><h4>Couldn't find a car object in item object</h4></>);

  const [seeOrder, setSeeOrder]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

  if (seeOrder)
    return (<OrderOverviewModal availability={availability[selected]} endDate={endDate[selected]} selected={selected} item={item} seeOrder={seeOrder} setSeeOrder={setSeeOrder} />);

  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title>{item.car.brand} {item.name}</Modal.Title>
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
            <div className='mt-4 text-start'>
              <p><FaCarSide /> {item.type}</p>
              <p><FaCogs /> {(item.car.isAutomatic) ? 'Automatisch' : 'Handmatig'}</p>
              <p><FaUsers /> {item.car.seats} Zitplaatsen</p>
              <p><FaSuitcase /> {item.storageSpace} Liters</p>
            </div>
          </Col>

          {/* Right: Price and booking */}
          <Col md={6}>
            <h3>€{item.price} / dag</h3>
            <p className='mt-3'><strong>Beschikbaarheid:</strong></p>
            <ul>
              <Form>
              {
                availability.map((range,index) => (
                  <Form.Check type="radio" name="boxes" label={[range.toLocaleDateString(),<text> tot </text>, endDate[index].toLocaleDateString()]} onChange={()=> assignSelected(index)}/>
                ))
              }
              </Form>
            </ul>
            
            <Button onClick={() => setSeeOrder(true)} variant='warning' className='mt-3 w-100'>Huren</Button>
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
