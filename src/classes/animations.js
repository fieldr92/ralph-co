import LoadElements from "./LoadElements";

class Animations extends LoadElements {
  constructor(args) {
    super(args);
    this.width = args.width;
    this.height = args.height;
    this.data = args.data;
    this.elements = args.elements;
  }

  fade() {    
    return {
      in(width, height, delay, duration, element) {
              
      },
      out(width, height, delay, duration, element) {

      }
    }
  }

  slide() {
    return {
      in(width, height, direction, delay, duration, element) {

      },
      out(width, height, direction, delay, duration, element) {

      }
    }
  }

  zoom() {
    return {
      in(width, height, delay, duration, element) {

      },
      out(width, height, delay, duration, element) {

      }
    }
  }

}

export default Animations;