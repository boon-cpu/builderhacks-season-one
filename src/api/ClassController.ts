import signale from "signale";

export class ClassController {
  constructor() {
    signale.info(`Registering ${this.constructor.name}`);
  }
}
