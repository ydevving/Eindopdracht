import { z } from "zod/v4";

export const fuelTypeEnum = z.enum(['PETROL', 'DIESEL', 'HYBRID_PETROL', 'HYBRID_DIESEL']);
export const typeEnum = z.enum(["SEDAN", "SUV", "STATIONWAGON", "HATCHBACK", "CABRIO", "ROOFBOX", "TRAILER", "BICYCLE_ROOF_RACK", "BICYCLE_TRUNK_RACK", "TV", "MODEM", "GPS"]);
export const statusEnum = z.enum(['AVAILABLE', 'RENTED','BROKEN']);

export const TokenSchema = z.object({ token: z.uuidv4() });

export const UserSchema = z.object({
    username: z.string(),
    email:    z.email(),
    address:  z.string(),
    city:     z.string()
});

export const UserMinimalSchema = z.object({
    username: z.string()
});

export const CarSchema = z.object({
    licenseplate:     z.string(),
    brand:            z.string(),
    isAutomatic:      z.boolean(),
    seats:            z.int(),
    towWeight:        z.int(),
    kilometerCounter: z.int32(),
    modelYear:        z.int(),
    fuelType:         fuelTypeEnum
});

export const ItemSchema = z.object({
    id:           z.int(),
    name:         z.string(),
    price:        z.number(),
    car:          CarSchema.nullable(),
    type:         typeEnum,
    description:  z.string().max(1000),
    storageSpace: z.int().nullable(),
    status:       statusEnum,
    imgUrl:       z.url().nullable()
});

export const TransactionSchema = z.object({
    id:          z.int(),
    rentedAt:    z.date(),
    rentedUntil: z.date(),
    rentingUser: UserSchema,
    item:        ItemSchema
});

export const OverviewSchema = z.object({
    available: z.array(ItemSchema),
    late:      z.array(TransactionSchema),
    damaged:   z.array(TransactionSchema),
    rentals:   z.array(TransactionSchema)
});

export type User = z.infer<typeof UserSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type Car = z.infer<typeof CarSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type Overview = z.infer<typeof OverviewSchema>;

export interface categoriesType {
    available: [Item[], React.Dispatch<Item[]>],
    late: [Transaction[], React.Dispatch<Transaction[]>],
    damaged: [Transaction[], React.Dispatch<Transaction[]>],
    rentals: [Transaction[], React.Dispatch<Transaction[]>]
};

export function isItem(variable: any): variable is Item {
    return (
        typeof variable === 'object' &&
        variable !== null &&
        typeof variable?.name === 'string'
    );
}

export function isTransaction(variable: any): variable is Transaction {
    return (
        typeof variable === 'object' &&
        variable !== null &&
        typeof variable?.rentedAt === 'object'
    );
}

export function isCar(variable: any): variable is Car {
    return (
        typeof variable === 'object' &&
        variable !== null &&
        typeof variable?.licenseplate === 'string'
    );
}

export function enumToString(_enum: string): string {
    
    switch (_enum) {
        case 'SUV':
        case 'TV':
        case 'GPS':
            return _enum;
        default:
            return _enum.split('_').map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()}`).join(' ');;
    }
    
    return "";
}
