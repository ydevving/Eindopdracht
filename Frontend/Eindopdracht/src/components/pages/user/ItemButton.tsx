import { Button, Image } from 'react-bootstrap'
export default function ItemButton() {
    const name = "Toyota 1000-THR Earthmover"
    const price = 50
    const seats = 10000
    const storage = 25000
    const type = "Supreme Machine"

    const transmissionBool = true
    if (transmissionBool) {
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
                    font-size: 2vw;
                }
                p {
                    margin: 0;
                    text-align: left;
                    display: flex;
                }
                img {
                    height: 5vh;
                    min-width: 5vw;
                }
            `}</style>
            <Button style={{minWidth:"33vw", maxWidth:"33vw"}}>
                <Image src="/src/assets/placeholderCar.jpg" rounded style={{height:"30vh"}}/>
                <p><b style={{fontSize:"3vw", overflow:"wrap"}}>{name}</b></p>
                <p style={{ display:"block", color:"#90EE90", fontSize:"3vw", textAlign:"center"}}>${price},-/day</p>
                <p><Image src="/src/assets/type.svg"/>{type}</p>
                <p><Image src="/src/assets/seats.svg"/>{seats}</p>
                <p><Image src="/src/assets/transmission.svg"/>{transmission}</p>
                <p><Image src="/src/assets/storage.svg"/>{storage} m3</p>
            </Button>
        </>
    )
}