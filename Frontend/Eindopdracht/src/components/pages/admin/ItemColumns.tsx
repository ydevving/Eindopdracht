import ItemColumn from "./ItemColumn";
import { ItemSchema, TransactionSchema } from "../../../utilities/types";
import type { Overview, Transaction, Item } from "../../../utilities/types";
import Session from "../../../utilities/Session";
import { Endpoints } from "../../../utilities/Endpoints"
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "./Admin";
import type { categoriesType } from "../../../utilities/types";

interface categoriesNamingType {
    available: "Beschikbaar",
    late: "Laat",
    damaged: "Beschadigd",
    rentals: "Verhuurd"
};


export default function ItemColumns() {

    const categoriesNaming: categoriesNamingType = {
        available: "Beschikbaar",
        late: "Laat",
        damaged: "Beschadigd",
        rentals: "Verhuurd"
    };


    let [itemModal, setItemModal, currentItem, category, categories]: 
    [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.RefObject<Item>, React.RefObject<string>, categoriesType] 
    = useContext(AdminContext);

    useEffect(() => {
        const request = () => {
            Endpoints.getAvailable().then((data) => categories['available'][1](data));
            Endpoints.getLate().then((data) => categories['late'][1](data));
            Endpoints.getDamaged().then((data) => categories['damaged'][1](data));
            Endpoints.getRentals().then((data) => categories['rentals'][1](data));

            /* 
             * The reason I'm not using the '/item/overview' endpoint is cause I think it makes more sense to
             * process these items seperately for more fine-grained control and slightly modular architecture - YDevving
            */
        };

        if (Session.instance.isTokenPresent())
            return request();

        Session.instance.onTokenAvailable(request);
    }, []);

    return (
        <>
            {
                Object.entries(categories).map(([key, value]: [key: string, value: [Item[] | Transaction[], React.Dispatch<Item[]> | React.Dispatch<Transaction[]>]], index: number) =>
                    (<ItemColumn key={index} items={value[0]} category={categoriesNaming[key as keyof typeof categoriesNaming]} />)
                )
            }
        </>
    );

}