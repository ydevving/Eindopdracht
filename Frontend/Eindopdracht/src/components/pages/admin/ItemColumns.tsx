import {useState} from "react";
import {Button} from "react-bootstrap";
import SingleItem from './SingleItem';


export default function ItemColumns({columns}:{
    columns:String;
}){
    const[upDown, setUpDown] = useState(0);     //useState for the position of the column


    function scrollupDown(scroll:number){       //function for scrolling(changing) the useState
        setUpDown(upDown+scroll)
    }

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

    const filteredItems = itemList.filter((itemList) => itemList.status == columns); //filters the items by status

    //py-0 = padding top & bottom set to 0

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <p style={{color:"black"}}>{columns}</p>
            
            {upDown === 0 ? 
            <Button className="py-0" disabled style={{minWidth: "25vw", maxWidth: "25vw", backgroundColor: "navy"}}>{"^"}</Button> : 
            <Button className="py-0" style={{minWidth: "25vw", maxWidth: "25vw", backgroundColor: "navy"}}onClick={() => scrollupDown(-1)}>{"^"}</Button> }
            
            <SingleItem item={filteredItems[(3*upDown)]}/>
            {filteredItems[(3*upDown)+1] ? <SingleItem item={filteredItems[(3*upDown)+1]}/> : <></>}
            {filteredItems[(3*upDown)+2] ? <SingleItem item={filteredItems[(3*upDown)+2]}/> : <></>} 
                
            { ( (upDown+1) >= (filteredItems.length/3) ) ? 
            <Button className="py-0" disabled style={{minWidth: "25vw", maxWidth: "25vw", position:"absolute", bottom:"0px", backgroundColor: "navy"}}>{"v"}</Button> :
            <Button className="py-0" style={{minWidth: "25vw", maxWidth: "25vw", position:"absolute", bottom:"0px", backgroundColor: "navy"}} onClick={() => scrollupDown(1)}>{"v"}</Button>}

        </div>
    )

}