import Axios from 'axios'

const Client = Axios.create({
    baseURL: 'https://vuadomain.typicode.com/',
    // baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Accept':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("_token"),
    }
});
const Client2 = Axios.create({
    baseURL: 'https://some-domain.com/api/v2',
    headers: {'Authorization': 'Bearer ' + localStorage.getItem("_token")}
});

export default Client;
export {
    Client2
};
