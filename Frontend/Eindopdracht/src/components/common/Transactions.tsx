

import { Container, Row, Col, Button } from 'react-bootstrap';
import { Outlet } from 'react-router';

export default function Transactions() {
return (
    <>
        <div style={{color: "red"}}>
            <Button variant='primary'></Button>
        </div>
        <h2>
            WASSUP
        </h2>
        <Outlet />
    </>
)
}