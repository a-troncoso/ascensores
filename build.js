export class Build {
    constructor(id, floors, name, elevators) {
        this.id = id;
        this.floors = floors;
        this.name = name;
        this.elevators = elevators;
    }

    selectFeasibleElevator(floor) {
        return this.elevators[0];
        // this.elevators.map();
    }
}