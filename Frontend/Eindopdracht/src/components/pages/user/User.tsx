import ItemList from "./ItemList"
import ProductFilter from "./ProductFilter";
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import ItemInfoModal from "../../common/CarInfoModal.tsx";
import { useNavigate } from "react-router";
import { ItemSchema, typeEnum } from '../../../utilities/types.ts';
import type { Item } from '../../../utilities/types.ts';
import {Container, Row, Col} from 'react-bootstrap';

export default function User() {
    
    type filterValue = Array<{ //typescript alias of filterValue Array objects containing filter & value
        filter: string,
        value: string | boolean | number;

    }>;
    const [filterList, setFilterList] = useState<filterValue>([]); //useState of filterList with an initialstate of filterValue object with array filter '' & value ''

    console.log(filterList); // console log of filterList state.

    const [itemModal, setItemModal] = useState<boolean>(false);
    const handleClose = () => setItemModal(false);
    const handleShow = () => setItemModal(true);

    const svgSize = "11%";
    const svgs = ["car-black", "gear-black", "seats-black", "trunk-black"];

    let item: Item = {
        id: 1,
        name: "M4 Competition Cabrio",
        price: 320,
        car: {
            licenseplate: "94-RO-BG",
            brand: "BMW",
            isAutomatic: true,
            seats: 4,
            towWeight: 0,
            kilometerCounter: 30_000,
            modelYear: 2024,
            fuelType: "DIESEL",
        },

        type: typeEnum.parse("SUV"),
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis accusamus assumenda ab temporibus, dolor labore maxime doloribus, deleniti, necessitatibus modi beatae nostrum voluptas dignissimos excepturi et voluptatibus aspernatur! Quidem, cumque.\nNon est necessitatibus nulla expedita blanditiis aperiam laborum aut officiis suscipit voluptas nam consequatur fuga reprehenderit facilis fugit praesentium modi quas repellat, dolore corrupti accusamus error? Voluptatibus, ex sapiente. Fugiat!\nNon, maxime, sed numquam dolore fuga omnis facilis aliquid optio est, inventore consectetur consequuntur amet labore magni eveniet tempore velit illum laborum asperiores architecto id. Cum exercitationem assumenda possimus nihil?\nQuo nulla omnis quaerat blanditiis fuga recusandae dolor maxime sit illum eum possimus consequatur, sunt aut dolorem doloribus voluptatum nam nobis architecto quam minima doloremque ut porro corporis repudiandae? Fugit.`,

        storageSpace: 80,
        status: "BROKEN",
        imgUrl: "https://www.van-poelgeest.nl/content/uploads/2024/02/BMW-m4-cabrio-1024x520.png"
    };

    item = ItemSchema.parse(item);

    const navigate = useNavigate();

    //filter filterList by type:
    const typeList = filterList.filter((filter)=> filter.filter == "type")
    //filter filterList by != type:
    const elseList = filterList.filter((filter) => filter.filter != "type")

    function typeShow(){
        if(typeList[0]){
        return(
            <>
            <Col xs="auto">Type:</Col>
            {typeList.map((e) => <Col xs="auto" style={{color:"black",paddingLeft: 0, paddingRight: 5}}>{e.value},</Col>)}
            </> 
        )}
    }

    return (
        <Container fluid style={{backgroundColor:'rgb(251, 247, 244)', paddingLeft: 0, paddingRight: 0}}>
            
            <Row>           
                <ProductFilter filterList={filterList} setFilterList={setFilterList} />                    
            </Row>
   
            <Row style={{color: "black"}}>
            <div>Applied filters:</div>
            {typeShow()}
            {elseList.map((e) => <Col xs="auto" style={{color:"black"}}>{e.filter} : {e.value}</Col>)}       
            </Row>
            
            <Row>
            <ItemList filterList={filterList}/>
           </Row>
        </Container>

    )
}