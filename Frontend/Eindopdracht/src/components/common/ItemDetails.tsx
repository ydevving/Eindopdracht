import {Container, Row, Col, Image } from 'react-bootstrap';

export default function ItemDetails({item}:
        {item:{
        image:string, name:string, 
        price:number, seats:number, 
        storage:number, type:string, 
        isAutomatic:boolean
        }}){
            {/* property and type definition above are placeholder
                the specific item should be fetched from this file */}
    if (item.isAutomatic) {
        var transmission = "automatic"
    } else {
        var transmission = "manual"
    }

    return(
    <div style={{
        zIndex:1, position:"absolute",
        left:0, top:0, 
        height:"100vh", width:"100vw", 
        background:"rgba(0, 0, 0, 0.5)"
    }}>
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
        <div>
            <Container>
                <Row>
                    <Col>
                    <Image/>
                    </Col>
                    <Col>
                        <p><b style={{fontSize:"2vw", overflow:"wrap"}}>{item.name}</b></p>
                        <p style={{ display:"block", color:"#90EE90", fontSize:"2vw", textAlign:"center"}}>${item.price},-/day</p>
                        <p><Image src="/src/assets/type.svg"/>{item.type}</p>
                        <p><Image src="/src/assets/seats.svg"/>{item.seats}</p>
                        <p><Image src="/src/assets/transmission.svg"/>{transmission}</p>
                        <p><Image src="/src/assets/storage.svg"/>{item.storage} L</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
    )
}