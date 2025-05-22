import ItemList from "./ItemList"
import { Outlet } from "react-router"

export default function User() {
    return (
        <div>
            <ItemList/>
            <Outlet/>
        </div>
    )
}