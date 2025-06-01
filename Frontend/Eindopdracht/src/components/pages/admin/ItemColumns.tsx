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
            reserved: true,
            status: "available"
        },
        {
            image:"placeholderCar.jpg",
            name:"Toy Yoda",
            license_plate: "licenseplate 1",
            late: true,
            reserved: true,
            status: "late"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toyota 8",
           license_plate: "licenseplate 1",
            late: false,
            reserved: true,
            status: "broken"
        },
        {
            image:"placeholderCar.jpg",
            name:"page 2",
            license_plate: "licenseplate 1",
            late: false,
            reserved: true,
            status: "rented"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toy Yoda",
            license_plate: "licenseplate 1",
            late: true,
            reserved: true,
            status: "late"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toyota 1000-THR Earthmover", 
            license_plate: "licenseplate 1",
            late: false,
            reserved: true,
            status: "available"
        },
        {
            image:"placeholderCar.jpg",
            name:"Toy Yoda",
            license_plate: "licenseplate 1",
            late: true,
            reserved: true,
            status: "late"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toyota 8",
           license_plate: "licenseplate 1",
            late: false,
            reserved: true,
            status: "broken"
        },
        {
            image:"placeholderCar.jpg",
            name:"page 2",
            license_plate: "licenseplate 1",
            late: false,
            reserved: true,
            status: "rented"
           
        },
        {
            image:"placeholderCar.jpg",
            name:"Toy Yoda",
            license_plate: "licenseplate 1",
            late: true,
            reserved: true,
            status: "late"
           
        }
        
    ]

    const filteredItems = itemList.filter((itemList) => itemList.status == columns); //filters the items by status


    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <p>{columns}</p>
            <style>{`
                .btn-secondary{
                    width: 20vw;
                    max-height: 5vh;
                    min-height: 5vh;
                    min-width: 20vw;
                }
            `}</style>
            {upDown === 0 ? 
            <Button variant="secondary" disabled>{"^"}</Button> : 
            <Button variant="secondary" onClick={() => scrollupDown(-1)}>{"^"}</Button> }
            
            <SingleItem item={filteredItems[(3*upDown)]}/>
            {filteredItems[(3*upDown)+1] ? <SingleItem item={filteredItems[(3*upDown)+1]}/> : <></>}
            {filteredItems[(3*upDown)+2] ? <SingleItem item={filteredItems[(3*upDown)+2]}/> : <></>} 
                
            { ( (upDown+1) >= (filteredItems.length/3) ) ? 
            <Button variant="secondary" disabled style={{position:"absolute", bottom:"0px"}}>{"v"}</Button> :
            <Button variant="secondary" style={{position:"absolute", bottom:"0px"}} onClick={() => scrollupDown(1)}>{"v"}</Button>}

        </div>
    )

}