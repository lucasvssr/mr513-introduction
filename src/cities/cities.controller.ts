import { City } from "./cities.model";
import { Request, Response } from "express";
import { validationResult } from 'express-validator';

export class CitiesController {
    static showForm(req: Request, res: Response): void {
        res.render('cities/search', { title: 'Cities', cities: undefined, errors: undefined});
    }

    static async searchResults(req: { body: { city: string; }; }, res: Response): Promise<void> {
        const result = validationResult(req);

        console.log(result);
        if (result.isEmpty()) {
            const cities = await City.fetchCitiesAsync(req.body.city);
            res.render('cities/search', { title: 'Cities', cities: cities, errors: undefined});
        }
        else {
            res.render('cities/search', { title: 'Cities', cities: undefined, errors: result.array() });
        }
    }

    static async searchResultsJson(req: { params: { city: string; }; }, res: Response): Promise<void> {
        const cities = await City.fetchCitiesAsync(req.params.city);
        res.json(cities);
    }
}