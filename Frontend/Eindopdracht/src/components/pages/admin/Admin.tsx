import { Outlet } from "react-router"
import ItemColumns from './ItemColumns'
import {useState} from 'react';

export default function Admin() {
    const [columns, setColumns] =useState(["available", "late", "broken","rented" ])

    return (
        <div>
            admin
            <Outlet/>
            
            <div  style={{display: 'flex'}}>
                <div style={{display: "flex", flexDirection: "column", width: "20vw"}}>
                <p> control panel</p>
                </div>

                {columns.map((e)=> <ItemColumns columns={e}/>)}
            </div>
        </div>
        

        
    )
}