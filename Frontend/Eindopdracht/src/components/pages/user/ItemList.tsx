import { useState } from "react"
import ItemButton from "./ItemButton"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import type {Item} from '../../../utilities/types';


export default function ItemList({filterList}: {filterList:Array<{filter:string, value:string|boolean|number}>}){
    const [page, setPage] = useState(0)
    
    function scrollPage(scroll:number){
        setPage(page+scroll)
    }
    const itemList:Array<Item> = [
        {
            id: 1,
            name:"Yaris", 
            price: 99,
            car: {licenseplate: "abc-123-a", brand: "Toyota", isAutomatic: true, seats: 5, towWeight: 1250, kilometerCounter: 98045, modelYear: 2023, fuelType: 'HYBRID_PETROL'},
            storageSpace: 286, 
            type: "HATCHBACK",
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            status: "AVAILABLE",
            imgUrl:"/src/assets/ToyotaYaris.webp",
        },
        {
            id: 1,
            name:"Corolla Touring Sports", 
            price: 140,
            car: {licenseplate: "", brand: "Toyota", isAutomatic: true, seats: 5, towWeight: 0, kilometerCounter: 0, modelYear: 0, fuelType: 'HYBRID_PETROL'}, 
            storageSpace: 596, 
            type: "STATIONWAGON",
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            status: "AVAILABLE",
            imgUrl:"/src/assets/ToyotaCorollaTouringSports.webp",
        },
        {
           id: 1,
            name:"Rav4", 
            price: 160,
            car: {licenseplate: "", brand: "Toyota", isAutomatic: true, seats: 5, towWeight: 0, kilometerCounter: 0, modelYear: 0, fuelType: 'HYBRID_PETROL'}, 
            storageSpace: 490, 
            type: "SUV",
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            status: "AVAILABLE",
            imgUrl:"/src/assets/ToyotaRav4.webp",
        },
        {
         id: 1,
            name:"Toyota 1000-THR Earthmover", 
            price: 140,
            car: {licenseplate: "abc-123-a", brand: "Toyota", isAutomatic: true, seats: 5, towWeight: 1250, kilometerCounter: 98045, modelYear: 2021, fuelType: 'PETROL'},
            storageSpace: 300, 
            type: "SUV",
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            status: "AVAILABLE",
            imgUrl:"/src/assets/placeholderCar.jpg",
        },
        {
           id: 1,
            name:"Toyota 1000-THR Earthmover", 
            price: 140,
            car: {licenseplate: "abc-123-a", brand: "Toyota", isAutomatic: true, seats: 5, towWeight: 1250, kilometerCounter: 98045, modelYear: 2021, fuelType: 'PETROL'},
            storageSpace: 300, 
            type: "SUV",
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            status: "AVAILABLE",
            imgUrl:"/src/assets/placeholderCar.jpg",
        }, 
        {
            id: 1,
            name:"Toyota 1000-THR Earthmover", 
            price: 140,
            car: {licenseplate: "abc-123-a", brand: "Toyota", isAutomatic: true, seats: 5, towWeight: 1250, kilometerCounter: 98045, modelYear: 2021, fuelType: 'PETROL'},
            storageSpace: 300, 
            type: "SUV",
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            status: "AVAILABLE",
            imgUrl:"/src/assets/placeholderCar.jpg",
        },
        {
            id: 1,
            name:"Toyota 1000-THR Earthmover", 
            price: 140,
            car: null, 
            storageSpace:25000000, 
            type: "SUV",
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            status: "AVAILABLE",
            imgUrl:"/src/assets/placeholderCar.jpg",
        }
    ]
    let newItemList = filterTheList(itemList, filterList)
    
    function filterTheList(list:Array<Item>, 
        filterList:Array<{filter:string, value:string|boolean|number}>
    ){
        let evaluate = false; 
        return list.filter((listItem) => {
    
            if(filterList.length > 1){
                return (
                    filterList.findIndex((filterPair) => {

                        evaluate = false

                        let valueNumber = filterPair.value as number
                        filterPair.filter === "price" ? evaluate = (
                            (listItem.price >= (50 * valueNumber) && 
                            listItem.price <= (50 * valueNumber + 50))
                            || (valueNumber >= 4 && listItem.price >= 200) 
                        ) : {}

                        filterPair.filter === "storage" ? evaluate = (
                            (listItem.price >= (250 * valueNumber) && 
                            listItem.price <= (250 * valueNumber + 250))
                            || (valueNumber >= 4 && listItem.price >= 1000)
                        ) : {}

                        filterPair.filter === "type" 
                        || filterPair.filter === "fuel"
                        || filterPair.filter === "seats" 
                        || filterPair.filter === "transmission" ? 
                        evaluate = (filterPair.value === listItem.type) : {}

                        return evaluate
                    }) > -1 
                )
            } else {
                return true
            }
        })
    }
            
    let pagiList = [<></>];
    for (let pageEval = 1; (pageEval*3-2 <= newItemList.length); pageEval++) {
        pagiList.push(
            <Pagination.Item key={pageEval} active={pageEval === page+1} onClick={()=>(setPage(pageEval-1))}>
                {pageEval}
            </Pagination.Item>
        )
    }
        
    return(<>    
        <Container fluid>
            <Row >
                { page === 0 ? 
                    <Col xs={1}> </Col>
                    : 
                    <Col xs={1} style={{padding:0}}className="d-flex align-items-center">
                        <Button className="primary fs-2" style={{height:"25%", width:"100%"}} onClick={() => scrollPage(-1)}>{"<"}</Button>
                    </Col> 
                }

                <Col style={{padding:0}}>
                    <ItemButton item={newItemList[(3*page)]}/>
                </Col>
                <Col style={{padding:0}}>
                    {itemList[(3*page)+1] ? <ItemButton item={newItemList[(3*page)+1]}/> : <></>}
                </Col>
                <Col style={{padding:0}}>
                    {itemList[(3*page)+2] ? <ItemButton item={newItemList[(3*page)+2]}/> : <></>}
                </Col>
                
                { ((page+1)*3) >= (newItemList.length) ? 
                    <Col xs={1}></Col> 
                    :
                    <Col xs={1} style={{padding:0}} className="d-flex align-items-center">
                        <Button className="primary fs-2" style={{height:"25%", width:"100%"}} onClick={() => scrollPage(1)}>{">"}</Button>
                    </Col>
                }
            </Row>
             <Row>
                <Col md={{span: 2, offset: 5}}>
                <Pagination className="m-2 justify-content-center" >
                {pagiList}
                </Pagination>
                </Col>
            </Row>
        </Container>
    </>)
}