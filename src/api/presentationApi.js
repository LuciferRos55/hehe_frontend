import axiosClient from "./axiosClient";

const presentationApi = {
    async createPresentation(data) {
        const url = "/presentation/create";
        return axiosClient.post(url, {
            name: data.name,
            slide_list: data.slideList
        });
    },

    async getAllPresentations() {
        const url = "/presentation";
        return axiosClient.get(url);
    },

    async get(data) {
        const url = "/presentation/getone";
        return axiosClient.get(url, {
            params: {
                _id: data.id
            }
        });
    },

    async getPresentationDetail(id) {
        const url = "/presentation/getone";
        return axiosClient.get(url, {
            params: {
                _id: id
            }
        });
    },

    async delete(data) {
        const url = "/presentation/delete";
        return axiosClient.post(url, {
            _id: data.id,
        });
    },
};


export default presentationApi;