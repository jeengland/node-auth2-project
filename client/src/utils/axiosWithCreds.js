import axios from 'axios';

const axiosWithCreds = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: token,
        }
    })
}

export default axiosWithCreds;