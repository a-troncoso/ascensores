import { Build } from './build.js';
import { Floor } from './floor.js';
import { Elevator } from './elevator.js';
import { Request } from './request.js';
import { ELEVATOR_STATES } from './elevator.js';

export default class UI {
  constructor() {
    this.build = undefined;
  }

  genBuild(build) {
    this.build = build;

    this.build.floors.forEach(f => {
      const floorElm = document.createElement('div');
      floorElm.className =
        'd-flex justify-content-between align-items-center border border-top-0 border-left-0 border-right-0';
      floorElm.innerHTML = `
        ${f.number}
        <div>
          <button class="btn btn-secondary" name="goUp" data-floor-number="${
            f.number
          }">subir</button>
          <button class="btn btn-secondary" name="goDown" data-floor-number="${
            f.number
          }">bajar</button>
        </div>
      `;

      const buildElm = document.getElementById('build');
      buildElm.appendChild(floorElm);
    });
  }

  // Selecciona cuál es el mejor ascensor para hacer la solicitud
  getBestElevator(fromFloor) {
    if (!fromFloor.srcElement.dataset.floorNumber) return;

    // fromFloor.srcElement.dataset.floorNumber -> es donde se hace la solicitud
    // selected -> ascensor seleccionado

    let selected = this.build.elevators[0];
    let tmp = this.build.floors[this.build.floors.length - 1].number;
    this.build.elevators.forEach(elevator => {
      // numbero del piso donde se encuentra el ascensor evaluado
      const elevatorNumber = elevator.currentFloor.number;
      // desde donde se hace la solicitud
      const numberFromFloor = parseInt(
        fromFloor.srcElement.dataset.floorNumber
      );
      // distancia entre donde se encuentra el ascensor evaluado
      // y el piso desde donde se hace la solicitud
      const differenceBetwFloors = Math.abs(elevatorNumber - numberFromFloor);
      if (differenceBetwFloors < tmp) {
        selected = elevator;
        tmp = differenceBetwFloors;
      }
    });
    return selected;
  }
}

// DOM Events
document.getElementById('create-build-btn').addEventListener('click', () => {
  const floor_1 = new Floor('piso_1', 1);
  const floor_2 = new Floor('piso_2', 2);
  const floor_3 = new Floor('piso_3', 3);
  const floor_4 = new Floor('piso_4', 4);
  const floor_5 = new Floor('piso_5', 5);
  const floors = [floor_1, floor_2, floor_3, floor_4, floor_5];

  const elevator_1 = new Elevator('ascensor_1', 600, floor_1);
  const elevator_2 = new Elevator('ascensor_2', 600, floor_2);
  const elevators = [elevator_1, elevator_2];

  const edf_1 = new Build('edificio_1', floors, 'Edificio Curicó', elevators);

  ui.genBuild(edf_1);
});

document.getElementById('build').addEventListener('click', e => {
  const chosenElevator = ui.getBestElevator(e);

  // Request desde donde está el ascensor hasta el lugar donde se hace la solicitud
  const request = new Request(
    new Date(),
    chosenElevator.currentFloor,
    parseInt(e.srcElement.dataset.floorNumber)
  );
});

const ui = new UI();
