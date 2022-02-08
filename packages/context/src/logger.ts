import consola from "consola"

export class logger {
  static sucesss = consola.success
  static log = consola.log
  static info = consola.info
  static error = (errorMessage?: string) => consola.error(new Error(errorMessage))
}