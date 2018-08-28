import LoadElements from "./LoadElements";

class Animations extends LoadElements {
  constructor(width, height, data, element) {
    this.width = width,
    this.height = height,
    this.data = data,
    this.element = element
  }

  static fade() {
    return {
      in(width, height, delay, duration, element) {
        
      },
      out(width, height, delay, duration, element) {

      }
    }
  }

  static slide() {
    return {
      in(width, height, direction, delay, duration, element) {

      },
      out(width, height, direction, delay, duration, element) {

      }
    }
  }

  static zoom() {
    return {
      in(width, height, delay, duration, element) {

      },
      out(width, height, delay, duration, element) {

      }
    }
  }

}

export default Animations;