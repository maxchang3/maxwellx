import consola from "consola"

export class logger {
  static sucesss = consola.success
  static log = consola.log
  static info = consola.info
  static error = (errorMessage?: string) => {
    if (typeof errorMessage === "object") {
      consola.error(errorMessage)
    } else {
      consola.error(new Error(errorMessage))
    }
  }
}