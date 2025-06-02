import NavbarComponent from "./Navbar"
import { Outlet } from 'react-router'

export default function Transactions() {
    return (
        <>
           <h1>test test</h1>
        </>
    )
=======

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
>>>>>>> 0bf1ad9c8bd275b6da7837d1c90e6074a4b37e9a
}