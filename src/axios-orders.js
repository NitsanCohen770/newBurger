import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://valued-context-300911-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default instance;
