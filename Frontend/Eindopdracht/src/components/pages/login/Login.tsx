import {Form, Col, Row, Button} from "react-bootstrap"

export default function Login() {
    return (
        <div style={{
            backgroundColor: "rgb(251, 247, 244)",
            height:"80vh", 
            width:"100vw", 
            display:"flex", 
            justifyContent:"center", 
            alignItems:"center"
        }}>
            <style>{`
                .row {
                    padding-top: 0.5vh;
                    padding-bottom: 1vh;
                }
            `}</style>
            <div style={{
                borderRadius: "2vh",
                border:"1px solid transparent",
                padding:"0.6em 1.2em",
                fontSize:"1em",
                fontWeight: 500,
                fontFamily: "inherit",
                backgroundColor:"rgb(61, 78, 109)",
                transition:"border-color 0.25s",
                width:"350px"
            }}>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label style={{textAlign:"center"}}>
                            Username / Email
                        </Form.Label>
                        <Col>
                            <Form.Control placeholder="email@example.com" style={{width:"80%", margin:"auto"}}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label style={{textAlign:"center"}}>
                            Password
                        </Form.Label>
                        <Col>
                            <Form.Control type="password" placeholder="Password" style={{width:"80%", margin:"auto"}}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Button className="buttons" variant="info" style={{margin:"auto", width:"30%"}}>Login</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}