import ItemColumn from "./ItemColumn";
import { ItemSchema, TransactionSchema } from "../../../utilities/types";
import type { Overview, Transaction, Item } from "../../../utilities/types";
import Session from "../../../utilities/Session";
import { useEffect, useState } from "react";


interface categoriesType {
    available: [Item[], React.Dispatch<Item[]>],
    late: [Transaction[], React.Dispatch<Transaction[]>],
    damaged: [Transaction[], React.Dispatch<Transaction[]>],
    rentals: [Transaction[], React.Dispatch<Transaction[]>]
};

interface categoriesNamingType {
    available: "Beschikbaar",
    late: "Laat",
    damaged: "Beschadigd",
    rentals: "Verhuurd"
};


async function getAvailable(categories: categoriesType): Promise<Item[] | void> {

    return await Session.instance.GET('/item/available')
            .then((data) => data.json())
            .then((items) => {

                // Validates incoming data
                items.forEach((item: Item) => ItemSchema.parse(item));

                categories['available'][1](items);

                return items;
            })
            .catch((error) => { console.error("An error occured on the /available endpoint in ItemColumns.tsx -", error); return error; });
};

async function getLate(categories: categoriesType): Promise<Transaction[] | void> {
    return await Session.instance.GET('/item/late')
        .then((data) => data.json())
        .then((transactions) => {

            // Validates incoming data
            transactions.forEach((transaction: Transaction) => {
                transaction.rentedAt = new Date(transaction.rentedAt);
                transaction.rentedUntil = new Date(transaction.rentedUntil);

                TransactionSchema.parse(transaction);
            });

            categories['late'][1](transactions);

            return transactions;
        })
        .catch((error) => { console.error("An error occured on the /late endpoint in ItemColumns.tsx -", error); return error; });
};

async function getDamaged(categories: categoriesType): Promise<Transaction[] | void> {
    return await Session.instance.GET('/item/damaged')
        .then((data) => data.json())
        .then((transactions) => {

            // Validates incoming data
            transactions.forEach((transaction: Transaction) => {
                transaction.rentedAt = new Date(transaction.rentedAt);
                transaction.rentedUntil = new Date(transaction.rentedUntil);

                TransactionSchema.parse(transaction);
            });

            categories['damaged'][1](transactions);

            return transactions;
        })
        .catch((error) => { console.error("An error occured on the /damaged endpoint in ItemColumns.tsx -", error); return error; });
};

async function getRentals(categories: categoriesType): Promise<Transaction[] | void> {
    return await Session.instance.GET('/item/rentals')
        .then((data) => data.json())
        .then((transactions) => {

            // Validates incoming data
            transactions.forEach((transaction: Transaction) => {
                transaction.rentedAt = new Date(transaction.rentedAt);
                transaction.rentedUntil = new Date(transaction.rentedUntil);

                TransactionSchema.parse(transaction);
            });

            categories['rentals'][1](transactions);

            return transactions;
        })
        .catch((error) => { console.error("An error occured on the /rentals endpoint in ItemColumns.tsx -", error); return error; });
};

export default function ItemColumns() {

    const categoriesNaming: categoriesNamingType = {
        available: "Beschikbaar",
        late: "Laat",
        damaged: "Beschadigd",
        rentals: "Verhuurd"
    };

    let categories: categoriesType = {
        available: useState<Item[]>([]),
        late: useState<Transaction[]>([]),
        damaged: useState<Transaction[]>([]),
        rentals: useState<Transaction[]>([])
    };

    useEffect(() => {
        const request = () => {
            console.log('ItemColumns useEffect');
            getAvailable(categories);
            getLate(categories);
            getDamaged(categories);
            getRentals(categories);

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