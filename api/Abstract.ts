/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-23 03:45:19
 */

import { UseFetchOptions } from '#app';
import { hash } from 'ohash';

// const baseURL = 'http://localhost:3000';

class Abstract {
  constructor() {}

  private rerquest(
    url: string,
    method,
    params?: { [key: string]: string },
    body?: { [key: string]: string }
  ) {
    let options: UseFetchOptions<any> = {
      method,
      params,
      body,
      // lazy: false,
      // baseURL,
      onRequest,
      onRequestError,
      onResponse,
      onResponseError,
    };
    // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
    const key =
      hash(JSON.stringify(options)) +
      '_' +
      url +
      '_' +
      new Date().getTime() / 10000;
    // 如果需要统一加参数可以options.params.token = 'xxx'
    return new Promise((resolve, reject) => {
      useFetch(url, { ...options, key })
        .then(({ data, error }) => {
          if (error.value) {
            reject(error.value);
            return;
          }
          const value = data.value;
          if (!value) {
            // 这里处理错你自定义的错误，例如code !== 1
            throw createError({
              statusCode: 500,
              statusMessage: url,
              message: 'Error',
            });
          } else {
            resolve(value);
          }
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    }) as Promise<any>;
  }

  protected getReq(url: string, params?: { [key: string]: string }) {
    return this.rerquest(url, 'get', params);
  }

  protected postReq(
    url: string,
    body?: { [key: string]: string },
    params?: { [key: string]: string }
  ) {
    return this.rerquest(url, 'post', params, body);
  }
}

async function onRequest({ request, options }) {
  // Set the request headers
  options.headers = options.headers || {};
  options.headers.authorization = '...';
}
async function onRequestError({ request, options, error }) {
  // Handle the request errors
  console.error('Net Error!');
}
function onResponse({ request, response, options }) {
  // Process the response data
  return response._data;
}
async function onResponseError({ request, response, options }) {
  // Handle the response errors
  console.error('Server Error!');
}

export default Abstract;
