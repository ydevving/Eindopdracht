import { useState } from "react"
import ItemButton from "./ItemButton"
import { Button } from "react-bootstrap"

export default function ItemList(){
    const [page, setPage] = useState(0)
    
    function scrollPage(scroll:number){
        setPage(page+scroll)
    }

    const itemList = [
        {
            image:"placeholderCar.jpg",
            name:"Toyota 1000-THR Earthmover", 
            price:50, 
            seats:10000, 
            storage:25000, 
            type:"Supreme Machine", 
            transmissionBool:true
        },
        {
            image:"placeholderCar.jpg",
            name:"Toy Yoda",
            price:2.99,
            seats:0,
            storage:0.01,
            type:"Toy",
            transmissionBool:false
        },
        {
            image:"placeholderCar.jpg",
            name:"Toyota 8",
            price:8,
            seats:8,
            storage:8,
            type:"8",
            transmissionBool:true
        },
        {
            image:"placeholderCar.jpg",
            name:"page 2",
            price:2,
            seats:2,
            storage:2,
            type:"page 2",
            transmissionBool:false
        }
    ]
    
    return(
        <div style={{display:"flex"}}>
            {/* .btn style also applies to ItemButton */}
            {/* <style>{`
                .btn-primary {
                    height: 60vh;
                    max-width: 5vw;
                    min-width: 5vw;
                    min-height: 30vw;
                }
            `}</style> */}
            { page === 0 ? 
            <Button style={{height: '60vh', maxWidth: '5vw', minWidth: '5vw', minHeight: '30vw'}} disabled>{"<"}</Button> : 
            <Button style={{height: '60vh', maxWidth: '5vw', minWidth: '5vw', minHeight: '30vw'}} onClick={() => scrollPage(-1)}>{"<"}</Button> }

            <ItemButton item={itemList[(3*page)]}/>
            {itemList[(3*page)+1] ? <ItemButton item={itemList[(3*page)+1]}/> : <></>}
            {itemList[(3*page)+2] ? <ItemButton item={itemList[(3*page)+2]}/> : <></>}
            
            { ( (page+1) >= (itemList.length/3) ) ? 
            <Button style={{height: '60vh', maxWidth: '5vw', minWidth: '5vw', minHeight: '30vw', position:"absolute", right:"0px"}} disabled>{">"}</Button> :
            <Button style={{height: '60vh', maxWidth: '5vw', minWidth: '5vw', minHeight: '30vw'}} onClick={() => scrollPage(1)}>{">"}</Button>}
        </div>
    )
}