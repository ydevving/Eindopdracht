import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import {useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


type filterValue ={         //type alias of filterValue with types filter and value
    filter : string,
    value : string|boolean|number;

}    


function ProductFilter({filterList, setFilterList}:{                //function that takes the props filterList and setFilterList from page User
    filterList:Array<filterValue>, setFilterList:React.Dispatch<React.SetStateAction<Array<filterValue>>>       //typed values of filterList and setFilterList which take an object array of FilterValue
}){
    
    //const [check, setcheck] = useState();
    const [show, setShow ] = useState(false);   //State boolean for showing the modal
    const handleClose = () => setShow(false);       //Handle function for closing the modal
    const handleShow = () => setShow(true);         //Handle function for showing the modal


    function assignFilter(filter: string, value: string|number|boolean){        //function for assigning a filter after click in modal recieves a filter and value
        let newfilterList = filterList;

        let fvalue = {              //typed object of filter and value
            filter : filter,
            value : value
        }
        
        function filterIndex(value:filterValue){        //function that searches through the selected values 
           if(value.filter === 'type'){                 //if the filter is type
                return (value === fvalue)               //return
           }
             return (value.filter === fvalue.filter)        //else return

        }

        let filterSplice = newfilterList.findIndex(filterIndex)     //variable for index of the filter

        if(filterSplice > -1){                                         //splices the filter en ensures that the same option cant be selected twice.
            newfilterList.splice(filterSplice, filterSplice +1)
        }
        
        newfilterList.push(fvalue)                  //pushes the filterList to the array of filter values
       
        console.log(newfilterList)
        setFilterList(newfilterList)                //sets the filterList with the values of newfilterList

        console.log(filterList)
    }

    // function checker(value: string|number|boolean){
    //     let i :number;

    //     for(i=0; i< filterList.length; i++){
    //         if(value === filterList[i].value){
    //             return setcheck(true);
    //         }else{
    //             return setcheck(false);
    //         }
    //     };
    // }

    return(
        <div className="container-sm">
            <div className="container-sm">
            <Button variant="primary" onClick={handleShow}>Filter products</Button>
            </div> 

            <Modal show={show} onHide={handleClose} animation={true} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Choose Filter</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Check inline label="SUV" onChange={() => assignFilter('type', 'SUV')/*setType('SUV')*/ }/>
                        <Form.Check inline label="Sport" onClick={()=>assignFilter('type', 'Sport')}/>
                        <Form.Check inline label="Compact" onClick={() => assignFilter('type', 'Compact')}/>
                        <Form.Check inline label="Company car" onClick={()=> assignFilter('type', 'Company car')}/>
                        <Form.Check inline label="Family car" onClick={()=> assignFilter('type', 'Family car')}/>      
                    </Form>
                    <Form>
                        <DropdownButton variant="primary" size="sm" id="dropdown-price" title="price filter">
                                <Dropdown.Item onClick={()=> assignFilter('price', 0)}>€0 - €50</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('price', 1)}>10.000 - 20.000</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('price', 2)}>20.000 - 30.000</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('price', 3)}>150+</Dropdown.Item>
                        </DropdownButton>
                    </Form>
                    <Form>
                        <DropdownButton variant="succes" size="sm" id="dropdown-storage" title="storage filter">
                                <Dropdown.Item onClick={()=> assignFilter('storage', '€0 - €50')}>€0 - €50</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('storage', '2000L - 5000L')}>2000L - 5000L</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('storage','5000L - 7500L')}>5000L - 7500L</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('storage', '7500L+')}>7500L+</Dropdown.Item>
                        </DropdownButton>
                    </Form>
                    <Form>
                        <DropdownButton variant="Info" size="sm" id="dropdown-fuel" title="fuel filter">
                                <Dropdown.Item onClick={()=> assignFilter('fuel', 'petrol')}>petrol</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('fuel','gas')}>gas</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('fuel','electric')}>electric</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('fuel', 'hybrid')}>hybrid</Dropdown.Item>
                        </DropdownButton>
                    </Form>
                    <Form>
                        <DropdownButton variant="warning" size="sm" id="dropdown-transmission" title="transmission filter">
                                <Dropdown.Item onClick={()=> assignFilter('transmission', false)}>Manual</Dropdown.Item>
                                <Dropdown.Item onClick={()=> assignFilter('transmission', true)}>Automatic</Dropdown.Item>
                        </DropdownButton>
                    </Form>
                    <Form>
                        <DropdownButton variant="secondary" size="sm" id="dropdown-seats" title="seats filter">
                                <Dropdown.Item onClick={()=>  assignFilter('seats', 2)}>2</Dropdown.Item>
                                <Dropdown.Item onClick={()=>  assignFilter('seats', 4)}>4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>  assignFilter('seats', 5)}>5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>  assignFilter('seats', 8)}>8</Dropdown.Item>
                            </DropdownButton>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="danger" onClick={handleClose}>Apply filters</Button>      
                </Modal.Footer>
            </Modal>

        </div>
    );
}
export default ProductFilter


//checked={true}
//defaultChecked={true}