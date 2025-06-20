
// Methods with common Endpoints

import Session from "./Session";
import { ItemSchema, TransactionSchema } from "./types";
import type { Item, Transaction } from "./types";

export class Endpoints {

    private Endpoints() { }

    public static async getAvailable(): Promise<Item[]> {
        return await Session.instance.GET('/item/available')
            .then((data) => data.json())
            .then((items) => {

                // Validates incoming data
                items.forEach((item: Item) => ItemSchema.parse(item));

                return items;
            })
            .catch((error) => { console.error("An error occured on the /available endpoint in ItemColumns.tsx -", error); return error; });
    };

    public static async getLate(): Promise<Transaction[]> {
        return await Session.instance.GET('/item/late')
            .then((data) => data.json())
            .then((transactions) => {
    
                // Validates incoming data
                transactions.forEach((transaction: Transaction) => {
                    transaction.rentedAt = new Date(transaction.rentedAt);
                    transaction.rentedUntil = new Date(transaction.rentedUntil);
    
                    TransactionSchema.parse(transaction);
                });
    
                return transactions;
            })
            .catch((error) => { console.error("An error occured on the /late endpoint in ItemColumns.tsx -", error); return error; });
    };

    public static async getDamaged(): Promise<Transaction[]> {
        return await Session.instance.GET('/item/damaged')
            .then((data) => data.json())
            .then((transactions) => {
    
                // Validates incoming data
                transactions.forEach((transaction: Transaction) => {
                    transaction.rentedAt = new Date(transaction.rentedAt);
                    transaction.rentedUntil = new Date(transaction.rentedUntil);
    
                    TransactionSchema.parse(transaction);
                });
    
                return transactions;
            })
            .catch((error) => { console.error("An error occured on the /damaged endpoint in ItemColumns.tsx -", error); return error; });
    };

    public static async getRentals(): Promise<Transaction[]> {
        return await Session.instance.GET('/item/rentals')
            .then((data) => data.json())
            .then((transactions) => {
    
                // Validates incoming data
                transactions.forEach((transaction: Transaction) => {
                    transaction.rentedAt = new Date(transaction.rentedAt);
                    transaction.rentedUntil = new Date(transaction.rentedUntil);
    
                    TransactionSchema.parse(transaction);
                });
    
                return transactions;
            })
            .catch((error) => { console.error("An error occured on the /rentals endpoint in ItemColumns.tsx -", error); return error; });
    };

}
