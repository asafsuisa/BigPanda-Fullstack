const apiAddress = process.env.REACT_APP_API + '/api/';

const postData = (realtiveApiCallPath, body = {}) => {
  let url = new URL(apiAddress + realtiveApiCallPath);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json()).catch(error => window.alert(`Request failed with the error: ${error}`));
}

const getData = (realtiveApiCallPath, queryParams) => {
  let url = new URL(apiAddress + realtiveApiCallPath);
  for (const key in queryParams) {
    if (queryParams[key]) {
      url.searchParams.append(key, queryParams[key]);
    }
  }
  return fetch(url, { method: 'GET' }).then(res => res.json()).catch(error => window.alert(`Request failed with the error: ${error}`));
}


export const MessagesAPI = {
  getItemsList: (filterValue) => {
    return getData('messages', { 'filterBy': filterValue });
  },

  submitNewItem: (newMessageData) => {
    return postData('message', newMessageData);
  },

  getLastActivatedTime: (email) => {
    return getData('message/getLastActivatedTime', { 'email': email });
  }
}