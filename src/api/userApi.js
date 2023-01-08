import axiosClient from "./axiosClient";

const userApi = {
    async register(data) {
        const url = "/user/register";
        return axiosClient.post(url, {
            name: data.name,
            email: data.email,
            // status: data.status,
            password: data.password,
        });
    },

    async login(data) {
        const url = "/user/login";
        return axiosClient.post(url, {
            email: data.email,
            password: data.password,
            withGoogle: "false"
        });
    },

    async loginwithGoogle(data) {
        const url = "/user/logingoogle";
        return axiosClient.post(url, {
            email: data.data.email,
            name: data.data.name,
            withGoogle: "true"
        });
    },

    async update(data) {
        const url = "/user";
        return axiosClient.post(url, {
            name: data.name
        });
    },

    async get(userId) {
        const url = `/user/getone`;
        return axiosClient.get(url, {
            params: {
                _id: userId
            }
        });
    },
};


export default userApi;