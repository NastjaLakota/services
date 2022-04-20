export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  incementActiveToInactive() {
    this.activeToInactiveCounter++;
    console.log("Active to Inactive: " + this.activeToInactiveCounter);
  }
  incementInactiveToActive() {
    this.inactiveToActiveCounter++;
    console.log("Inactive to Active: " + this.inactiveToActiveCounter);
  }
}
