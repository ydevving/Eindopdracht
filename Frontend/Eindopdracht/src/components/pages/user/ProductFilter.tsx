import Dropdown from 'react-bootstrap/Dropdown';
import {useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col} from 'react-bootstrap';


type filterValue ={         //type alias of filterValue with types filter and value
    filter : string,
    value : string|boolean|number;

}    


function ProductFilter({filterList, setFilterList}:{                //function that takes the props filterList and setFilterList from page User
    filterList:Array<filterValue>, setFilterList:React.Dispatch<React.SetStateAction<Array<filterValue>>>       //typed values of filterList and setFilterList which take an object array of FilterValue
}){
    
    const [check, setcheck] = useState([false,false,false,false,false]);
    const [show, setShow ] = useState(false);   //State boolean for showing the modal
    const handleClose = () => setShow(false);       //Handle function for closing the modal
    const handleShow = () => setShow(true);         //Handle function for showing the modal


    function assignFilter(filter: string, value: string|number|boolean){        //function for assigning a filter after click in modal recieves a filter and value
        
        let newfilterList = [...filterList];

        let fvalue = {              //typed object of filter and value (nieuw value)
            filter : filter,
            value : value
        }
        
        let clickedCheck = [...check] //a variable Array of check

        if(value === 'SUV'){                // if value is SUV
           clickedCheck[0] = !clickedCheck[0]       //flip the boolean value of Array item 0
           setcheck(clickedCheck)               //set the new variable array to the check useState
        }
        if(value === 'Sport'){
            clickedCheck[1] = !clickedCheck[1]
           setcheck(clickedCheck)
        }
        
        if(value === 'Compact'){
            clickedCheck[2] = !clickedCheck[2]
           setcheck(clickedCheck)
        }
        
        if(value === 'Company car'){
            clickedCheck[3] = !clickedCheck[3]
           setcheck(clickedCheck)
        }
        
        if(value === 'Family car'){
            clickedCheck[4] = !clickedCheck[4]
           setcheck(clickedCheck)
        }


        let filterFound;
        let valueFound;

        function filterIndex(value:filterValue){        //function that searches through the selected values 
                            
            filterFound = (value.filter === fvalue.filter && value.filter != 'type')
            valueFound = (value.value === fvalue.value)
            return (filterFound || valueFound)
                    
        }

        let filterSplice = newfilterList.findIndex(filterIndex)     //variable for index of the filter

        console.log(filter, value, filterFound, valueFound);
        if(filterSplice > -1 && (filterFound || valueFound)){
                                                             //splices the filter en ensures that the same option cant be selected twice.
            newfilterList.splice(filterSplice, 1)
        }

        if(!(!filterFound && valueFound)){
             newfilterList.push(fvalue)  
        }
                         //pushes the filterList to the array of filter values
        
        
        setFilterList(newfilterList)                //sets the filterList with the values of newfilterList
    }

    return(
        <Container>
            
            <Row>
                <Col>
                    <Button className="px-2 buttons" onClick={handleShow}>Filter products</Button>
               </Col>
            </Row> 
        
            <Container>
            <Row>
                <Col>
            <Modal show={show} onHide={handleClose} animation={true} style={{}}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Filter</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Form>
<<<<<<< HEAD
                        <Form.Check inline checked={check[0]} label="SUV" onClick={() => assignFilter('type', 'SUV')}     />
                        <Form.Check inline checked={check[1]} label="Sport" onClick={()=>assignFilter('type', 'Sport')}/>
                        <Form.Check inline checked={check[2]} label="Compact" onClick={() => assignFilter('type', 'Compact')}/>
                        <Form.Check inline checked={check[3]} label="Company car" onClick={()=> assignFilter('type', 'Company car')}/>
                        <Form.Check inline checked={check[4]} label="Family car" onClick={()=> assignFilter('type', 'Family car')}/>      
                    </Form>
                    <Form>
                        <DropdownButton variant="info" size="sm" id="dropdown-price" title="price filter">
=======
                        <Form.Check checked={check[0]} label="SUV" onClick={() => assignFilter('type', 'SUV')}     />
                        <Form.Check checked={check[1]} label="Sport" onClick={()=>assignFilter('type', 'Sport')}/>
                        <Form.Check checked={check[2]} label="Compact" onClick={() => assignFilter('type', 'Compact')}/>
                        <Form.Check checked={check[3]} label="Company car" onClick={()=> assignFilter('type', 'Company car')}/>
                        <Form.Check checked={check[4]} label="Family car" onClick={()=> assignFilter('type', 'Family car')}/>      
                    </Form>
                    <Form>
                        <DropdownButton variant="warning" id="dropdown-price" title="price">
>>>>>>> Test
                                <Dropdown.Item onClick={()=> assignFilter('price', 0)}>€0 - €50</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('price', 1)}>€50 - €100</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('price', 2)}>€100 - €150</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('price', 3)}>150+</Dropdown.Item>
                        </DropdownButton>
                    </Form>
                    <Form>
<<<<<<< HEAD
                        <DropdownButton variant="info" size="sm" id="dropdown-storage" title="storage filter">
                                <Dropdown.Item onClick={()=> assignFilter('storage', '0L - 250L')}>0 - 500L</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('storage', '200L - 500L')}>500L - 1000L</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('storage','500L - 750L')}>1000L - 1500L</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('storage', '750L+')}>1500L+</Dropdown.Item>
                        </DropdownButton>
                    </Form>
                    <Form>
                        <DropdownButton variant="info" size="sm" id="dropdown-fuel" title="fuel filter">
=======
                        <DropdownButton variant="warning" id="dropdown-storage" title="storage">
                                <Dropdown.Item onClick={()=> assignFilter('storage', '0L - 250L')}>0 - 250L</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('storage', '250L - 500L')}>250L - 500L</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('storage','500L - 750L')}>500L - 750L</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('storage', '750L+')}>750L+</Dropdown.Item>
                        </DropdownButton>
                    </Form>
                    <Form>
                        <DropdownButton variant="warning" id="dropdown-fuel" title="fuel">
>>>>>>> Test
                                <Dropdown.Item onClick={()=> assignFilter('fuel', 'petrol')}>petrol</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('fuel','gas')}>gas</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('fuel','electric')}>electric</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('fuel', 'hybrid')}>hybrid</Dropdown.Item>
                        </DropdownButton>
                    </Form>
                    <Form>
<<<<<<< HEAD
                        <DropdownButton variant="info" size="sm" id="dropdown-transmission" title="transmission filter">
=======
                        <DropdownButton variant="warning"  id="dropdown-transmission" title="transmission">
>>>>>>> Test
                                <Dropdown.Item onClick={()=> assignFilter('transmission', false)}>Manual</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('transmission', true)}>Automatic</Dropdown.Item>
                        </DropdownButton>
                    </Form>
                    <Form>
<<<<<<< HEAD
                        <DropdownButton variant="info" size="sm" id="dropdown-seats" title="seats filter">
=======
                        <DropdownButton variant="warning"  id="dropdown-seats" title="seats">
>>>>>>> Test
                                <Dropdown.Item onClick={()=>  assignFilter('seats', 2)}>2</Dropdown.Item>
                                <Dropdown.Item onClick={()=>  assignFilter('seats', 4)}>4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>  assignFilter('seats', 5)}>5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>  assignFilter('seats', 8)}>8</Dropdown.Item>
                            </DropdownButton>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="errorCancel" onClick={handleClose}>Close</Button>      
                </Modal.Footer>
            </Modal>
            </Col>
            </Row>
            </Container>

        </Container>
    );
}
export default ProductFilter


//checked={true}
//defaultChecked={true}