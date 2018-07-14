export class Common {

  static isClient() {
    return 'undefined' !== typeof window;
  }

  static isServer() {
    return 'undefined' === typeof window;
  }

}
