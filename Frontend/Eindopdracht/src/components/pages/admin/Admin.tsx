import ItemColumns from './ItemColumns'
import { Container, Row } from 'react-bootstrap';
import SearchBar from './SearchBar';
import ItemCard from './ItemCard';
import { fuelTypeEnum, statusEnum, typeEnum } from '../../../entities/types';

export default function Admin() {

    let item = [
        {
            "id": 119,
            "name": "Q5",
            "price": 84.0,
            "car": {
                "licenseplate": "64-NRL-7",
                "brand": "Audi",
                "isAutomatic": true,
                "seats": 5,
                "towWeight": 1996,
                "kilometerCounter": 45330,
                "modelYear": 2018,
                "fuelType": "DIESEL"
            },
            "type": "SUV",
            "description": "Stevig SUV'tje",
            "storageSpace": 240,
            "status": "RENTED",
            "imgUrl": null
        }
    ];

    let transaction = [
        {
            "id": 43,
            "rentedAt": new Date("1990-01-01"),
            "rentedUntil": new Date("2026-01-01"),
            "rentingUser": {
                "username": "joos_breen",
                "email": "j.breen@breencompany.nl",
                "address": "Oostkade 14",
                "city": "Huizen"
            },
            "item": {
                "id": 119,
                "name": "Q5",
                "price": 84.0,
                "car": {
                    "licenseplate": "64-NRL-7",
                    "brand": "Audi",
                    "isAutomatic": true,
                    "seats": 5,
                    "towWeight": 1996,
                    "kilometerCounter": 45330,
                    "modelYear": 2018,
                    "fuelType": fuelTypeEnum.parse("DIESEL")
                },
                "type": typeEnum.parse("SUV"),
                "description": "Stevig SUV'tje",
                "storageSpace": 240,
                "status": statusEnum.parse("RENTED"),
                "imgUrl": null
            }
        }
    ];

    return (
        <Container style={{ marginTop: '40px', backgroundColor: '#FAF9F9', borderRadius: '6px' }} fluid>
            <Row>
                <SearchBar />
            </Row>
            <Row xs='auto'>
                {/* <ItemColumns /> */}
                <ItemCard item={transaction[0]}  />
            </Row>
        </Container>
    )
}