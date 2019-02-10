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

export default class UI {
  constructor() {}

  genBuild(build) {
    const buildElm = document.getElementById('build');

    build.floors.forEach(f => {
      const floorElm = document.createElement('div');
      floorElm.className =
        'd-flex justify-content-between align-items-center border border-top-0 border-left-0 border-right-0';
      floorElm.innerHTML = `
        ${f.number}
        <div>
          <button class="btn btn-secondary" name="go-up" data-floor-number="${f.number}">subir</button>
          <button class="btn btn-secondary" name="go-down" data-floor-number="${f.number}">bajar</button>
        </div>
      `;
      buildElm.appendChild(floorElm);
    });
  }

  genRequest(e) {
    if (e.srcElement.name === 'go-up') {
      console.log('go-up');
    } else if (e.srcElement.name === 'go-down') {
      console.log('go-down');
    }
  }
}

// DOM Events
document
  .getElementById('create-build-btn')
  .addEventListener('click', function(e) {
    const edf_1 = new Build('edificio_1', floors, 'Edificio Curicó', elevators);

    const ui = new UI();
    ui.genBuild(edf_1);

    console.log(edf_1);
  });

document.getElementById('build').addEventListener('click', function(e) {
  const ui = new UI();
  console.log(e);

  // Generar el request desde donde está el ascensor hasta el lugar donde se hace la solicitud
  const request = new Request(new Date(), parseInt(e.srcElement.dataset.floorNumber));
  ui.genRequest(e);
});
