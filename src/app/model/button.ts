export class Button {

  name: string;
  buttonService: () => void;
  className: string;

  constructor(name: string, buttonService: () => void) {
    this.name = name;
    this.buttonService = buttonService;
  }
}
