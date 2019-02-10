export class Elevator {
    constructor(id, maxCharge, currentFloor) {
        this.id = id;
        this.maxCharge = maxCharge;
        this.currentFloor = currentFloor;
        this.currentCharge = 0;
        this.state = 'reposo'; // 'reposo' | 'subiendo' | 'bajando'
    }
}