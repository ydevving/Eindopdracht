import { useState, type JSX } from "react"
import ItemButton from "./ItemButton"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';

type car = {
    image:string, name:string, 
    price:number, storage:number, 
    type:string, description:string,
    status:number,
    isAutomatic:boolean, seats:number,
    licensePlate:string, brand:string,
}
type accessory = {
    image:string, name:string, 
    price:number, storage:number, 
    type:string, description:string,
    status:number
}

export default function ItemList({filterList}:{filterList:Array<{filter:string, value:string|boolean|number}>}){
    const [page, setPage] = useState(0)
    
    function scrollPage(scroll:number){
        setPage(page+scroll)
    }
    const itemList:Array<car|accessory> = [
        {
            image:"/src/assets/placeholderCar.jpg",
            name:"Toyota 1000-THR Earthmover", 
            price:140, 
            seats:10000, 
            storage:25000000, 
            type:"Supreme Machine", 
            isAutomatic:true,
            status:0,
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            licensePlate:"loss meme",
            brand:"Ultrak- i mean, Toyota"
        },
        {
            image:"/src/assets/placeholderCar.jpg",
            name:"Toy yoda",
            price:4.99,
            storage:0,
            type:"toy",
            description:"a plastic caricature of Star Wars character \'master yoda\'",
            status:0
        },
        {
            image:"/src/assets/placeholderCar.jpg",
            name:"Toyota 1000-THR Earthmover", 
            price:150, 
            seats:10000, 
            storage:25000000, 
            type:"Supreme Machine", 
            isAutomatic:true,
            status:0,
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            licensePlate:"loss meme",
            brand:"Ultrak- i mean, Toyota"
        },
        {
            image:"/src/assets/placeholderCar.jpg",
            name:"Toy yoda",
            price:4.99,
            storage:0,
            type:"toy",
            description:"a plastic caricature of Star Wars character \'master yoda\'",
            status:0
        },
        {
            image:"/src/assets/placeholderCar.jpg",
            name:"Toyota 1000-THR Earthmover", 
            price:150, 
            seats:10000, 
            storage:25000000, 
            type:"Supreme Machine", 
            isAutomatic:true,
            status:0,
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            licensePlate:"loss meme",
            brand:"Ultrak- i mean, Toyota"
        }, 
        {
            image:"/src/assets/placeholderCar.jpg",
            name:"Toy yoda",
            price:4.99,
            storage:0,
            type:"toy",
            description:"a plastic caricature of Star Wars character \'master yoda\'",
            status:0
        },
        {
            image:"/src/assets/placeholderCar.jpg",
            name:"Toyota 1000-THR Earthmover", 
            price:150, 
            seats:10000, 
            storage:25000000, 
            type:"Supreme Machine", 
            isAutomatic:true,
            status:0,
            description:"...like antennas to heaven, a supreme machine built for war without reason",
            licensePlate:"loss meme",
            brand:"Ultrak- i mean, Toyota"
        }
    ]
    let newItemList = filterTheList(itemList, filterList)
    
    function filterTheList(list:Array<car|accessory>, 
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
        <Pagination >
            {pagiList}
        </Pagination>
        <Container fluid>
            <Row>
                { page === 0 ? 
                    <Col xs={1} style={{padding:0}}>
                        <Button className="primary" style={{backgroundColor: "#fff", borderColor: "#dee2e6", height:"100%", width:"100%"}} disabled>{"<"}</Button>
                    </Col>
                    : 
                    <Col xs={1} style={{padding:0}}>
                        <Button className="primary" style={{height:"100%", width:"100%"}} onClick={() => scrollPage(-1)}>{"<"}</Button>
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
                    <Col xs={1} style={{padding:0}}>
                        <Button className="primary" style={{backgroundColor: "#fff", borderColor: "#dee2e6", height:"100%", width:"100%"}} disabled>{">"}</Button>
                    </Col> 
                    :
                    <Col xs={1} style={{padding:0}}>
                        <Button className="primary" style={{height:"100%", width:"100%"}} onClick={() => scrollPage(1)}>{">"}</Button>
                    </Col>
                }
            </Row>
        </Container>
    </>)
}