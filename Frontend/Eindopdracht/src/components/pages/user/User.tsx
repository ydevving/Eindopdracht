import ItemButton from "./ItemButton";
import ItemList from "./ItemList"
import ProductFilter from "./ProductFilter";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import CarInfoModal from "./CarInfoModal.tsx";
import { useNavigate } from "react-router";
import { UserSchema, CarSchema, ItemSchema } from '../../../entities/types.ts';

export default function User() {

    type filterValue = Array<{ //typescript alias of filterValue Array objects containing filter & value
        filter: string,
        value: string | boolean | number;

    }>;
    const [filterList, setFilterList] = useState<filterValue>([{ filter: '', value: '' }]); //useState of filterList with an initialstate of filterValue object with array filter '' & value ''

    console.log(filterList); // console log of filterList state.

    const [itemModal, setItemModal] = useState<boolean>(false);
    const handleClose = () => setItemModal(false);
    const handleShow = () => setItemModal(true);

    const svgSize = "11%";
    const svgs = ["car-black", "gear-black", "seats-black", "trunk-black"];

    let item: object = {
        id: 1,
        name: "M4 Competition Cabrio",
        price: 320,
        car: {
            licenseplate: "94-RO-BG",
            brand: "BMW",
            isAutomatic: true,
            seats: 4,
            towWeight: 0,
            kilometerCounter: 30_000,
            modelYear: 2024,
            fuelType: "DIESEL",
        },

        type: "SUV",
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis accusamus assumenda ab temporibus, dolor labore maxime doloribus, deleniti, necessitatibus modi beatae nostrum voluptas dignissimos excepturi et voluptatibus aspernatur! Quidem, cumque.\nNon est necessitatibus nulla expedita blanditiis aperiam laborum aut officiis suscipit voluptas nam consequatur fuga reprehenderit facilis fugit praesentium modi quas repellat, dolore corrupti accusamus error? Voluptatibus, ex sapiente. Fugiat!\nNon, maxime, sed numquam dolore fuga omnis facilis aliquid optio est, inventore consectetur consequuntur amet labore magni eveniet tempore velit illum laborum asperiores architecto id. Cum exercitationem assumenda possimus nihil?\nQuo nulla omnis quaerat blanditiis fuga recusandae dolor maxime sit illum eum possimus consequatur, sunt aut dolorem doloribus voluptatum nam nobis architecto quam minima doloremque ut porro corporis repudiandae? Fugit.`,

        storageSpace: 80,
        status: "OPERABLE",
        imgURL: "https://www.van-poelgeest.nl/content/uploads/2024/02/BMW-m4-cabrio-1024x520.png",
    };

    item = ItemSchema.parse(item);

    const navigate = useNavigate();

    return (
        <div>

            <div>
                <ItemList/>
            </div>
            <div>
                <ProductFilter filterList={filterList} setFilterList={setFilterList} />
            </div>

            <div>
                Filtered by {filterList.map((e) => <div>{e.filter}:{e.value}</div>)}
                <Button onClick={() => { console.log(filterList); navigate("/user/transactions") }}></Button>
            </div>

            <div>
                <Button onClick={handleShow}>Rent A Car</Button>
            </div>

            <CarInfoModal show={itemModal} onHide={() => setItemModal(false)} item={item} />
        </div>

    )
}