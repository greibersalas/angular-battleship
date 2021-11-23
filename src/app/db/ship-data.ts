import { ShipModel, ShipsModel } from '../models/ship.model';
export class ShipDB {
    public static ship: ShipModel[] = [
        {id: 1, name: 'Carrier', size: 4},
        {id: 2, name: 'Cruiser', size: 3},
        {id: 3, name: 'Destroyer', size: 2},
        {id: 4, name: 'Frigate', size: 1}
    ];

}