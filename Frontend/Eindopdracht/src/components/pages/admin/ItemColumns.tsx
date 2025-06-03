import {Container, Row, Col, Card, Button} from "react-bootstrap";
import SingleItem from './SingleItem';

export default function ItemColumns() {

    const itemList = [
        {
            image:"placeholderCar.jpg",
            name:"Toyota 1000-THR Earthmover", 
            license_plate: "licenseplate 1",
            late: false,
            reserved: null,
            status: "available"
        },
        {
            image:"placeholderCar.jpg",
            name:"Toy Yoda",
            license_plate: "licenseplate 1",
            late: true,
            reserved: new Date(2025, 1, 23),
            status: "late"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toyota 8",
           license_plate: "licenseplate 1",
            late: false,
            reserved: new Date(2025, 10, 23),
            status: "broken"
        },
        {
            image:"placeholderCar.jpg",
            name:"page 2",
            license_plate: "licenseplate 1",
            late: false,
            reserved: new Date(2025, 10, 23),
            status: "rented"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toy Yoda",
            license_plate: "licenseplate 1",
            late: true,
            reserved: new Date(2025, 4, 23),
            status: "late"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toyota 1000-THR Earthmover", 
            license_plate: "licenseplate 1",
            late: false,
            reserved: new Date(2025, 10, 23),
            status: "available"
        },
        {
            image:"placeholderCar.jpg",
            name:"Toy Yoda",
            license_plate: "licenseplate 1",
            late: false,
            reserved: new Date(2025, 9, 23),
            status: "available"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toyota 8",
           license_plate: "licenseplate 1",
            late: false,
            reserved: new Date(2025, 10, 23),
            status: "broken"
        },
        {
            image:"placeholderCar.jpg",
            name:"page 2",
            license_plate: "licenseplate 1",
            late: false,
            reserved: new Date(2025, 10, 23),
            status: "rented"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toy Yoda",
            license_plate: "licenseplate 1",
            late: false,
            reserved: new Date(2025, 4, 23),
            status: "late"
           
        }
        
    ]

    return (
        <Container>
            
        </Container>
    );

}