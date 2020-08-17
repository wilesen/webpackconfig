import qs from 'qs';

const request = (options) => {
    let { url, data, method } = options;

    let paramOptions = {
        cache: 'no-cache',
        method
    }

    if (!url) {
        throw TypeError('url is need! ');
    }

    if (method.toLowerCase() == "get") {
        url = `${url}?${qs.stringify(data)}`;
    } else {
        paramOptions.body = JSON.stringify(data);
    }

    return requestApi(url, paramOptions);

}


const requestApi = (url, options) => {
    return fetch(url, options).then(response => response.json());

}

export default request;