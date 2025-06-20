import { Button, Image } from 'react-bootstrap';
import {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';


export default function SingleItem({item}:
        {item:{
        image:string, name:string, 
        license_plate: string, late: boolean,
        reserved: Date | null, status: string;
        }}
    ){
        let [itemLate , setItemLate]= useState('');
        let currentDate = new Date();

        if(item.reserved && (item.reserved.getTime() < currentDate.getTime())){
                itemLate = 'LATE';
        }

        //my-0 = margin top & bottom set to 0

    return(
        <>
            <Button className="statusColumn" style={{minWidth: "25vw", maxWidth: "25vw", minHeight:"20vh", maxHeight:"20vh", backgroundColor:"lightblue"}}>
            <Image src={item.image} rounded style={{height:"5vh", width:"5vw"}}/>
            <p className="my-0" style={{color: "black"}}>{item.name}</p>
            <p className="my-0"style={{color: "black"}}>{item.license_plate}</p>
            <p className="my-0"style={{color: "black"}}>{item.reserved?.toLocaleDateString()}</p>
            <p style={{color: "red", fontFamily: "bold"}}>{itemLate}</p>

            </Button>
        </>
    )
}