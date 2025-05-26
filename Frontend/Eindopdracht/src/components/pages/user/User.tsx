import ItemButton from "./ItemButton";
import ItemList from './ItemList'
import ProductFilter from "./ProductFilter";
import Button from 'react-bootstrap/Button';
import {useState} from 'react';

export default function User() {
        
        type filterValue = Array<{      //typescript alias of filterValue Array objects containing filter & value
            filter : string,
            value : string|boolean|number;

             }>
        const [filterList, setFilterList] = useState<filterValue>([{filter: '', value: ''}]) //useState of filterList with an initialstate of filterValue object with array filter '' & value ''
              

    return (
        <div>
           <div>
            <ItemList/>
           </div>
            <div>
            <ProductFilter filterList={filterList} setFilterList={setFilterList}/>
            <Button variant="info" onClick ={()=> {console.log(filterList)}}>test button</Button>
            </div>
            <div>Filtered by:</div>
            
            <div >
                {filterList.map((e)=> <div style={{display: 'flex', maxWidth: "15 vw", minWidth: "10 vw"}}>{e.filter}:{e.value}</div>)} 
            </div>

        </div>
    
    )
}