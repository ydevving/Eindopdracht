import ItemColumn from "./ItemColumn";
import type { Overview } from "../../../entities/types";

export default function ItemColumns() {

    const overviewList: Overview = {
        "available": [
            {
                "id": 114,
                "name": "5G Modem",
                "price": 240.0,
                "car": null,
                "type": "MODEM",
                "description": "Wil jij internet-verbinding hebben in de auto kies dan voor deze snelle 5G modem!",
                "storageSpace": null,
                "status": "AVAILABLE",
                "imgUrl": null
            },
            {
                "id": 115,
                "name": "TomTom GO Classic 2nd gen",
                "price": 119.0,
                "car": null,
                "type": "GPS",
                "description": "De TomTom GO Classic 2e Generatie is de perfecte keuze voor wie op zoek is naar een betaalbare en betrouwbare GPS-navigatie. Met hoogwaardige TomTom-kaarten en maandelijkse kaartupdates voor Europa (inclusief 27 landen) en het vertrouwde TomTom Traffic, biedt dit systeem alles wat je nodig hebt voor een zorgeloze rit. Het 6-inch touchscreen biedt een hoge resolutie en een betere beeldkwaliteit, zodat je nooit meer een afslag of waarschuwing mist. Of je nu een korte rit of een lange reis maakt, de TomTom GO Classic 2nd GEN is je ideale navigatiepartner.",
                "storageSpace": null,
                "status": "AVAILABLE",
                "imgUrl": null
            },
            {
                "id": 116,
                "name": "CRUZ black Bici-rack frameholder bike rack - Roof mounting bike carrier",
                "price": 42.0,
                "car": null,
                "type": "BICYCLE_ROOF_RACK",
                "description": "The CRUZ 'Bici-rack' is a basic but very solid and stable locking bike carrier - it's made of much stronger material than similar bike carriers in this price range. It fits roof bars up to 45mm wide, steel bars and aluminium bars, and downtubes to 90mm deep by 80mm wide.",
                "storageSpace": 1,
                "status": "AVAILABLE",
                "imgUrl": null
            },
            {
                "id": 117,
                "name": "Thule 995001 OutWay Hanging 3-bike hanging trunk bike rack aluminium",
                "price": 405.0,
                "car": null,
                "type": "BICYCLE_TRUNK_RACK",
                "description": "Thule OutWay Hanging is designed to give you a quick and easy way to transport up to three bikes to wherever you want to ride. It fits on the boot of your car – great if you don't have a towbar or if you want to use the car roof for a cargo box. Twin hook attachment and sturdy steel cables with rubber protection (on all contact areas to the car) make sure that the hanging boot bike rack is fastened tightly to your car. This rack can hold up to a maximum weight of 45KG",
                "storageSpace": 3,
                "status": "AVAILABLE",
                "imgUrl": null
            }
        ],
        "late": [
            {
                "id": 41,
                "rentedAt": new Date("2020-05-21"),
                "rentedUntil": new Date("2024-05-25"),
                "rentingUser": {
                    "username": "royce_schut",
                    "email": "roooycehier@outlook.com",
                    "address": "Nassaustraat 113",
                    "city": "Winschoten"
                },
                "item": {
                    "id": 118,
                    "name": "M4 Competition Cabrio",
                    "price": 320.0,
                    "car": {
                        "licenseplate": "94-RO-BG",
                        "brand": "BMW",
                        "isAutomatic": true,
                        "seats": 4,
                        "towWeight": 0,
                        "kilometerCounter": 30000,
                        "modelYear": 2024,
                        "fuelType": "PETROL"
                    },
                    "type": "CABRIO",
                    "description": "Dikke vette cabrio heerlijk voor het vakantieleven, vakantieman.",
                    "storageSpace": 80,
                    "status": "RENTED",
                    "imgUrl": "https://www.van-poelgeest.nl/content/uploads/2024/02/BMW-m4-cabrio-1024x520.png"
                }
            },
            {
                "id": 42,
                "rentedAt": new Date("2020-06-21"),
                "rentedUntil": new Date("2021-06-30"),
                "rentingUser": {
                    "username": "bartje_boekestijn",
                    "email": "b.boekestijn@hotmail.com",
                    "address": "Prangelaar 97",
                    "city": "Woudenberg"
                },
                "item": {
                    "id": 120,
                    "name": "Sienna Spongebob",
                    "price": 1.2340021E7,
                    "car": {
                        "licenseplate": "GB-799-N",
                        "brand": "Toyota",
                        "isAutomatic": true,
                        "seats": 12,
                        "towWeight": 25000,
                        "kilometerCounter": 8430126,
                        "modelYear": 1857,
                        "fuelType": "PETROL"
                    },
                    "type": "HATCHBACK",
                    "description": "The original Spongebob car available for rent at a hefty price",
                    "storageSpace": 31023,
                    "status": "RENTED",
                    "imgUrl": "https://hips.hearstapps.com/autoweek/assets/s3fs-public/2014LAAS_SpongeBob_Movie_2015_Toyota_Sienna_001.jpg"
                }
            }
        ],
        "damaged": [
            {
                "id": 44,
                "rentedAt": new Date("2000-03-08"),
                "rentedUntil": new Date("2026-01-01"),
                "rentingUser": {
                    "username": "carl_wassenaar",
                    "email": "wussunaartje@gmail.com",
                    "address": "Ooievaarlaan 33",
                    "city": "Culemborg"
                },
                "item": {
                    "id": 113,
                    "name": "Mini-TV",
                    "price": 110.0,
                    "car": null,
                    "type": "TV",
                    "description": "Een Mini-TV handig voor de kids voor op reis!",
                    "storageSpace": null,
                    "status": "BROKEN",
                    "imgUrl": null
                }
            }
        ],
        "rentals": [
            {
                "id": 43,
                "rentedAt": new Date("1990-01-01"),
                "rentedUntil": new Date("2026-01-01"),
                "rentingUser": {
                    "username": "joos_breen",
                    "email": "j.breen@breencompany.nl",
                    "address": "Oostkade 14",
                    "city": "Huizen"
                },
                "item": {
                    "id": 119,
                    "name": "Q5",
                    "price": 84.0,
                    "car": {
                        "licenseplate": "64-NRL-7",
                        "brand": "Audi",
                        "isAutomatic": true,
                        "seats": 5,
                        "towWeight": 1996,
                        "kilometerCounter": 45330,
                        "modelYear": 2018,
                        "fuelType": "DIESEL"
                    },
                    "type": "SUV",
                    "description": "Stevig SUV'tje",
                    "storageSpace": 240,
                    "status": "RENTED",
                    "imgUrl": null
                }
            }
        ]
    };

    const categories = {
        "available": "Beschikbaar",
        "late": "Laat",
        "damaged": "Beschadigd",
        "rentals": "Verhuurd"
    };

    return (
        <>
            {Object.entries(categories).map(([key, value], index) => (<ItemColumn key={index} items={overviewList[key]} category={value} />))}
        </>
    );

}