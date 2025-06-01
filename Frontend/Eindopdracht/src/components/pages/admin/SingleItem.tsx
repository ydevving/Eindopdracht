import { Button, Image } from 'react-bootstrap';
import {useState} from 'react';


export default function SingleItem({item}:
        {item:{
        image:string, name:string, 
        license_plate: string, late: boolean,
        reserved: boolean, status: string;
        }}
    ){
        


    return(
        <>
            <style>{`
                p {
                    margin: 4px;
                    text-align: left;
                    display: flex;
                }
                img {
                    height: 2vw;
                    min-width: 2vw;
                    margin-right: 10px;
                }
            `}</style>
            <Button variant="secondary" style={{minHeight:"20vh", maxHeight:"20vh", backgroundColor:"orange"}}>
            <Image src={item.image} rounded style={{height:"5vh", width:"5vw"}}/>
            <p>{item.name}</p>
            <p>{item.license_plate}</p>
            <p>{item.late}</p>
            <p>{item.reserved}</p>
            <p>{item.status}</p>

            </Button>
        </>
    )
}