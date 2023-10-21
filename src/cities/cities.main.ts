import { argv } from 'node:process';
import { City } from './cities.model';

if (argv.length === 3) {
    if (argv[2].length >= 3) {
        City.fetchCities(argv[2]).then(cities => console.log(cities))
        City.fetchCitiesAsync(argv[2]).then(cities => console.log(cities))
    }
}