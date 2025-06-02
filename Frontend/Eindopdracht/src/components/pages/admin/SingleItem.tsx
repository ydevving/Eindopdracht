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

        // if(){
        //     itemLate = 'late';
        // }else{
        //     itemLate = 'not late';
        // }

    return(
        <>
            <style>{`
                .itemText{
                    margin: 0px;
                    text-align: left;
                    display: flex;
                    color: black;
                }
            `}</style>
            <Button className="statusColumn" style={{minHeight:"20vh", maxHeight:"20vh", backgroundColor:"orange"}}>
            <Image src={item.image} rounded style={{height:"5vh", width:"5vw"}}/>
            <p className="itemText">{item.name}</p>
            <p className="itemText">{item.license_plate}</p>
            <p className="itemText">{item.reserved?.toLocaleDateString()}</p>
            <p style={{color: "red", fontFamily: "bold"}}>{itemLate}</p>

            </Button>
        </>
    )
}