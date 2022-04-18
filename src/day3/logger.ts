import { green } from 'chalk';

export default class Logger {
  public static log(message: string) {
    console.log(green(message));
  }
}
