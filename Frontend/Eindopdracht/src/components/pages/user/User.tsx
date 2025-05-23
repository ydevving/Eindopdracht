import ItemButton from "./ItemButton";
import ProductFilter from "./ProductFilter";
import Button from 'react-bootstrap/Button';
import {useState} from 'react';

export default function User() {
        
        type filterValue = Array<{      //typescript alias of filterValue Array objects containing filter & value
            filter : string,
            value : string|boolean|number;

             }>
        const [filterList, setFilterList] = useState<filterValue>([{filter: '', value: ''}]) //useState of filterList with an initialstate of filterValue object with array filter '' & value ''


              console.log(filterList)       // console log of filterList state.
              

    return (
        <div>
            <div>
            <ProductFilter filterList={filterList} setFilterList={setFilterList}/>
            </div>
            
            <div>
                Filtered by {filterList.map((e)=> <div>{e.filter}:{e.value}</div>)}
                <Button onClick ={()=> {console.log(filterList)}}></Button> 
            </div>

        </div>
    
    )
}