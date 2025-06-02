import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate} from 'react-router';

export default function NavbarComponent() {
    const navigate = useNavigate()
    return (
        <Navbar>     
            <Container style={{
            background: "rgb(40, 56, 86)",
            height: "15vh",
            color: "black",
            fontSize: "3vh",
            borderRadius: "2vh"
        }}>
            <Navbar.Brand href="/home" className="font-italic text-danger text-underline">Logisticus</Navbar.Brand>
            <Nav>
            <Button onClick={()=>navigate("/user/transactions/")} className="m-2" style={{
                background: "rgb(91, 106, 134)",
                borderColor: "rgb(91, 106, 134"}}>my rentals</Button>
            <Button onClick={()=>navigate("/login")} className="bg-danger border-danger m-2">log out</Button>
            </Nav>
        </Container>
        </Navbar> 
    )
}