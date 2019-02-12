export const ELEVATOR_STATES = {
  REPOSE: 'repose',
  GOING_UP: 'goingUp',
  GOING_DOWN: 'goingDown'
};

export class Elevator {
  constructor(id, maxCharge, currentFloor) {
    this.id = id;
    this.maxCharge = maxCharge;
    this.currentFloor = currentFloor;
    this.state = ELEVATOR_STATES.REPOSE;
  }
}
