import { Button, Image } from 'react-bootstrap'
import { FaCarSide, FaCogs, FaUsers, FaSuitcase, FaTrailer } from 'react-icons/fa';
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
export default function ItemButton({item}:{item:car|accessory}
    ) {
        let transmission = ""
        let carItem = item as car
        if(item != undefined && 'isAutomatic' in carItem){
            carItem.isAutomatic ? transmission = "automatic" : transmission = "manual"
        }
        
     
    // TO-DO: Specify specific elements with classname or ID

    // {
    //             * {
    //                 max-width: 100%;
    //                 min-width: 100%;
    //                 font-size: 1vw;
    //             }
    //             p {
    //                 margin: 4px;
    //                 text-align: left;
    //                 display: flex;
    //             }
    //             img {
    //                 height: 2vw;
    //                 min-width: 2vw;
    //                 margin-right: 10px;
    //             }

    return (
        <>{ item != undefined ? <>
            <Button className="secondary" style={{height:"100%"}}>
                <Image src={item.image} fluid rounded/>
                <p><b style={{fontSize:"2vw", overflow:"wrap"}}>{"  "}{item.name}</b></p>
                <p style={{color:"#90EE90", textAlign:"center"}}>{"  "}${item.price},-/day</p>
                <p>{carItem.seats ? <FaCarSide/> : <FaTrailer/>}{"  "}{item.type}</p>
                {carItem.seats ? <p><FaUsers/>{"  "}{carItem.seats}</p> : <></>}
                {carItem.seats ? <p><FaCogs/>{"  "}{transmission}</p> : <></>}
                <p><FaSuitcase/>{"  "}{item.storage} {"type" in item && item.type.includes("Bike") ? "bicycle(s)" : "L"}</p>
            </Button>
    </> : <></>}</>
    )
}