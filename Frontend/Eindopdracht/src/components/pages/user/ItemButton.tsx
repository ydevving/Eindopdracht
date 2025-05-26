import { Button, Image } from 'react-bootstrap'
export default function ItemButton({item}:
        {item:{
        image:string, name:string, 
        price:number, seats?:number, 
        storage:number, type:string, 
        isAutomatic?:boolean
        }}
    ) {
    if (item.isAutomatic) {
        var transmission = "automatic"
    } else {
        var transmission = "manual"
    }
     
    return (
        <>
            <style>{`
                * {
                    max-width: 100%;
                    min-width: 100%;
                    font-size: 1vw;
                }
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
            <Button style={{minWidth:"30vw", maxWidth:"30vw", backgroundColor:"#242424"}}>
                <Image src={item.image} rounded style={{height:"auto", width:"20vw"}}/>
                <p><b style={{fontSize:"2vw", overflow:"wrap"}}>{item.name}</b></p>
                <p style={{ display:"block", color:"#90EE90", fontSize:"2vw", textAlign:"center"}}>${item.price},-/day</p>
                <p>{item.seats != undefined ? <Image src="/src/assets/type.svg"/> : <Image src="/src/assets/type2.svg"/>}{item.type}</p>
                {item.seats != undefined ? <p><Image src="/src/assets/seats.svg"/>{item.seats}</p> : <></>}
                {item.isAutomatic != undefined ? <p><Image src="/src/assets/transmission.svg"/>{transmission}</p> : <></>}
                <p><Image src="/src/assets/storage.svg"/>{item.storage} {item.type.includes("BikeHolder") ? "bicycle(s)" : "L"}</p>
            </Button>
        </>
    )
}