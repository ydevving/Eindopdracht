import { z } from "zod/v4";

export const fuelTypeEnum = z.enum(['PETROL', 'DIESEL', 'HYBRID_PETROL', 'HYBRID_DIESEL']);
export const typeEnum = z.enum(["SEDAN", "SUV", "STATIONWAGON", "HATCHBACK", "CABRIO", "ROOFBOX", "TRAILER", "BICYCLE_ROOF_RACK", "BICYCLE_TRUNK_RACK", "TV", "MODEM", "GPS"]);
export const statusEnum = z.enum(['BROKEN']).nullable();

export const UserSchema = z.object({
    username: z.string(),
    password: z.string(),
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

export type Car = z.infer<typeof CarSchema>;

export const ItemSchema = z.object({
    id:           z.int(),
    name:         z.string(),
    price:        z.number(),
    car:          CarSchema.nullable(),
    type:         typeEnum,
    description:  z.string().max(1000),
    storageSpace: z.int().nullable(),
    status:       statusEnum,
    imgUrl:       z.url().nullable(),
    rentingUser:  UserMinimalSchema.nullable()
});

export const TransactionSchema = z.object({
    id:          z.int(),
    rentedAt:    z.date(),
    rentedUntil: z.date(),
    rentingUser: UserMinimalSchema,
    item:        ItemSchema
});

export const TokenSchema = z.object({ token: z.uuidv4() });

export type User = z.infer<typeof UserSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
