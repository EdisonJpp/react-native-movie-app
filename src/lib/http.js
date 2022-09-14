/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * MISSING TO IMPLEMENT, I HAD LITTLE TIME TO DO
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

import axios from 'axios';

export const baseDomain = 'https://api.themoviedb.org';
export const apiKey = 'bf091621962bdf5c30339e874a2a0c1a';

const StatusCode = {
  Unauthorized: 401,
  Forbidden: 403,
  TooManyRequests: 429,
  InternalServerError: 500,
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
};

class Http {
  instance = null;

  get http() {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: baseDomain,
      headers,
      withCredentials: true,
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  request(config) {
    return this.http.request(config);
  }

  async get(url, config) {
    try {
      const h = await this.http.get(url, config);
      return h;
    } catch (error) {
      console.error(error);
    }
  }

  post(url, data, config) {
    return this.http.post(url, data, config);
  }

  put(url, data, config) {
    return this.http.put(url, data, config);
  }

  delete(url, config) {
    return this.http.delete(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  handleError(error) {
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
