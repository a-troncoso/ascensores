import { Build } from './build.js';
import { Floor } from './floor.js';
import { Elevator } from './elevator.js';
import { Request } from './request.js';

const floor_1 = new Floor('piso_1', 1);
const floor_2 = new Floor('piso_2', 2);
const floors = [floor_1, floor_2];

const elevator_1 = new Elevator('ascensor_1', 600, floor_1);
const elevator_2 = new Elevator('ascensor_2', 600, floor_2);
const elevators = [elevator_1, elevator_2];

const edf_1 = new Build('edificio_1', floors, 'Edificio Curicó', elevators);

export default class App {

    constructor() {
      this.init();
    }

    init() {
      let i = 0;
      setInterval(() => {
        if (i <= 3) {
          let request_1 = new Request(1, new Date(), floor_1, floor_2);
          i++;
        }
      }, 3000)
    }    
}

