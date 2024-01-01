import axios from 'axios';

const failedResponse = (error: any) => {
  if (
    error.response &&
    error.response.status &&
    error.response.status === 401
  ) {
    console.log('Request Failed');
  }
  return Promise.reject(error);
};

export const getRequest = (route: string, data = {}) => {
  return axios
    .get(route, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return console.log(error);
    });
};

export const postRequest = (route: string, data = {}, headers = {}) => {
  return axios
    .post(route, data, {
      headers: headers,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return failedResponse(error);
    });
};

export const deleteRequest = (route: string, data = {}) => {
  return axios
    .delete(route, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return console.log(error);
    });
};

export const putRequest = (route: string, data = {}) => {
  return axios
    .put(route, data)
    .then(response => {
      return response;
    })
    .catch(error => {
      return console.log(error);
    });
};

export const patchRequest = (route: string, data = {}) => {
  return axios
    .patch(route, data)
    .then(response => {
      return response;
    })
    .catch(error => {
      return console.log(error);
    });
};
