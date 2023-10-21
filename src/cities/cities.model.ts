import { ICity } from "../../shared_types/cities";

export class City implements ICity {
    name: string;
    info: string;
    latitude: number;
    longitude: number;
    
    constructor(name: string, info: string, latitude: number, longitude: number) {
        this.name = name;
        this.info = info;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    static fetchCities(name: string): Promise<City[]> {
        return fetch(`https://api-adresse.data.gouv.fr/search/?type=municipality&q=${name}`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Error while fetching cities')
            }
            return response.json();
        })
        .then(data => {
            const cities: City[] =  data.features
                .map((city: { properties: { name: string; context: string; }; geometry: { coordinates: number[]; }; }) => {
                return new City(
                    city.properties.name,
                    city.properties.context,
                    city.geometry.coordinates[1],
                    city.geometry.coordinates[0]
                )
            })
            return cities
        }).catch(error => {
            throw new Error(error)
        })
    }

    static async fetchCitiesAsync(name: string): Promise<City[]> {
        try {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?type=municipality&q=${name}`);
            if (!response.ok) {
                throw new Error('Error while fetching cities');
            }
            const data = await response.json();
            const cities: City[] = data.features
                .map((city: { properties: { name: string; context: string; }; geometry: { coordinates: number[]; }; }) => {
                    return new City(
                        city.properties.name,
                        city.properties.context,
                        city.geometry.coordinates[1],
                        city.geometry.coordinates[0]
                    );
                });
            return cities;
        } catch (error) {
            throw new Error(error);
        }
    }
}
