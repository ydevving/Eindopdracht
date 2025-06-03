import { Outlet } from "react-router"
import ItemColumns from './ItemColumns'
import {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default function Admin() {
    const [columns, setColumns] =useState(["available", "late", "broken","rented" ])

    return (
        <Container fluid>
            <Row>
                <ItemColumns/> 
            </Row>
        </Container>
    )
}