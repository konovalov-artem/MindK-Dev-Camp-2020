import { get, isUndefined } from 'lodash'
import * as path from 'path'
import { errLog } from './logger.service'

export class ConfigService {
  public static instance: ConfigService
  private config: Map<string, any>
  private readonly configFolderPath: string

  constructor() {
    if (ConfigService.instance) {
      return ConfigService.instance
    }
    this.configFolderPath = `${process.cwd()}/dist/configs`
    this.config = new Map<string, any>()
    ConfigService.instance = this
  }

  public get<T = any, V = any>(param: string, value: V = undefined): T | V {
    const [namespace, ...paramPath] = param.split('.')
    if (!this.config.has(namespace)) {
      const config = this.getConfigFromModule(namespace)
      this.setConfig(namespace, config)
    }
    if (paramPath.length) {
      const configValue = get(this.config.get(namespace), paramPath.join('.'))
      if (isUndefined(configValue)) {
        return value
      }
      return configValue
    }
    return this.config.get(namespace)
  }

  private setConfig(namespace: string, config: any): void {
    this.config.set(namespace, config)
  }

  private getConfigFromModule(fileName: string): any {
    let module: any = {}
    try {
      module = require(path.relative(__dirname, `${this.configFolderPath}/${fileName}.config`))
    } catch (e) {
      errLog(`ConfigService can't load module \n %s`, e.message)
    }
    return module.default || module
  }
}

export const configService = new ConfigService()
