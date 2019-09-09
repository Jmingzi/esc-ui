import { loading } from './loading'

import { EscHttpOptions, EscHttpResponse, Notify, NotifyObject, StringMap, UniversalMap } from 'types/http'
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

const defaultOptions: EscHttpOptions = {
  urlMap: {},
  baseUrl: '',
  timeout: 20000,
  contentType: 'application/x-www-form-urlencoded',
  arrayFormat: 'repeat',
  useQsStringifyBody: true,
  withCredentials: true,
  notify: console.log,
  defaultErrorNotifyMessage: '服务异常，请稍后再试',
  loadingMethods: {
    open: () => console.log('open loading'),
    close: () => console.log('close loading')
  },
  // @ts-ignore
  successRequestAssert (serverResponse) {
    return serverResponse.success
  },
  captureAssert (serverResponse) {
    // @ts-ignore
    return serverResponse.code > 300
  }
}

export default class Base {
  options: EscHttpOptions

  constructor (options: EscHttpOptions) {
    if (!options || typeof options !== 'object') {
      throw new Error('EscHttpOptions is unvalid')
    }
    this.options = {
      ...defaultOptions,
      ...options
    }
  }

  mergeConfig (
    isBodyData: boolean,
    data?: UniversalMap,
    config?: AxiosRequestConfig
  ): AxiosRequestConfig | undefined {
    let mergeConfig: AxiosRequestConfig | undefined
    if (config && typeof config === 'object') {
      mergeConfig = { ...config }
    }
    if (data && typeof data === 'object') {
      if (!mergeConfig) {
        mergeConfig = {}
      }
      if (isBodyData) {
        mergeConfig.data = {
          ...(mergeConfig.data || {}),
          ...data
        }
      } else {
        mergeConfig.params = {
          ...(mergeConfig.params || {}),
          ...data
        }
      }
    }
    return mergeConfig
  }

  getPath (urlName: string): string {
    const { urlMap } = this.options
    const pathArr: Array<string> = urlName.split('/')
    let path = urlMap[urlName]
    if (pathArr.length === 2 && typeof urlMap[pathArr[0]] === 'object') {
      path = (<StringMap> urlMap[pathArr[0]])[pathArr[1]]
    }
    if (typeof path === 'string') {
      return path
    }
    throw new Error('urlName is not a object')
  }

  notify (
    res: EscHttpResponse,
    attaches?: UniversalMap,
    isSuccess?: boolean
  ) {
    let { notify, defaultErrorNotifyMessage } = this.options
    if (notify instanceof Function) {
      notify = {
        success: notify,
        error: notify
      }
    }

    const hasNotify = !attaches || (attaches && attaches.notify !== false)
    const codeCallback = attaches && attaches.codeCallback
    const successMessage = attaches && attaches.successMessage
    const _notify = (msg: string, cb?: Notify) => {
      hasNotify && cb && cb(msg)
    }

    const { msg, code } = res
    if (isSuccess) {
      successMessage && _notify(successMessage, (notify as NotifyObject).success)
    } else if (codeCallback && code && codeCallback[code]) {
      codeCallback[code](res, msg)
    } else {
      _notify(msg || (defaultErrorNotifyMessage as string), (notify as NotifyObject).error)
    }
  }

  commonThen<T> (
    res: AxiosResponse,
    attaches?: UniversalMap
  ): EscHttpResponse | Promise<EscHttpResponse> {
    let result = res.data
    const { beforeThen, successRequestAssert } = this.options
    if (beforeThen && typeof beforeThen === 'function') {
      result = beforeThen(result, attaches)
    }
    // loading
    loading.pop(attaches)

    if (!result || (result && typeof result !== 'object')) {
      throw new Error('beforeThen 返回的结果不合法')
    }

    const finalResponse = {
      ...result,
      attaches
    }
    if (
      successRequestAssert &&
      typeof successRequestAssert === 'function' &&
      successRequestAssert(result)
    ) {
      this.notify(finalResponse, attaches, true)
      return finalResponse
    }
    return Promise.reject(finalResponse)
  }

  commonCatch (
    error: EscHttpResponse | AxiosError,
    attaches?: UniversalMap
  ): Promise<EscHttpResponse> {
    let finalError: EscHttpResponse
    const isResponseReject = (<EscHttpResponse> error).success !== undefined
    // @ts-ignore
    finalError = isResponseReject ? error : {
      attaches,
      error,
      msg: (error as AxiosError).message,
      success: false,
      code: (error as AxiosError).code
    }

    const { beforeCatch, captureAssert } = this.options
    if (beforeCatch && typeof beforeCatch === 'function') {
      finalError = beforeCatch(finalError, attaches)
    }
    if (!finalError || (finalError && typeof finalError !== 'object')) {
      throw new Error('beforeCatch 返回的结果不合法')
    }
    // loading
    loading.pop(attaches)
    // notify
    this.notify(finalError, attaches)
    if (isResponseReject) {
      if (captureAssert && captureAssert(finalError)) {
        this.capture(JSON.stringify(finalError))
      }
      return Promise.reject(finalError)
    }

    this.capture(finalError)
    return Promise.reject(finalError)
  }

  capture (obj: string | EscHttpResponse) {
    if (this.options.bindSentry) {
      this.options.bindSentry.captureException(
        obj instanceof Error
          ? obj
          : new Error(typeof obj === 'string' ? obj : JSON.stringify(obj))
      )
    }
  }
}
