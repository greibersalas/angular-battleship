export interface ShipModel {
    id: number;
    name: string;
    size: number;
}

export interface ShipsModel {
    id: number;
    ship: ShipModel;
    positions: PositionModel[]
}

export interface PositionModel {
    id: number;
    state: string;
}