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
