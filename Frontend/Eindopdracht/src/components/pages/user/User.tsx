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
        <div >
           <div>
            <ItemList/>
           </div>
            <div>
            <ProductFilter filterList={filterList} setFilterList={setFilterList}/>
            <Button variant="info" onClick ={()=> {console.log(filterList)}}>test button</Button>
            </div>
            
            <div  style={{display: 'flex'}}>
            Filtered_by:{filterList.map((e)=> <div style={{position:'relative', right:"4.5vw", maxWidth: '8.5vw', minWidth: '8.5vw'}} >{e.filter}:{e.value}</div>)} 
            </div>

        </div>
    
    )
}