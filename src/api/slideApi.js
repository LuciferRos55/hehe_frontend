import axiosClient from "./axiosClient";

const slideApi = {
    async createSlide(data) {
        const url = "/slide/create";
        return axiosClient.post(url, {
            presentation_id: data.presentationId
        });
    },

    async updateOptionSlide(data) {
        const url = "/slide/update_option";
        return axiosClient.post(url, {
            id: data.id,
            index: data.index
        });
    },

    async getAllSlides(data) {
        const url = "/slide";
        return axiosClient.get(url, {
            params: {
                presentation_id: data.presentationId
            }
        });
    },

    async getSlidesByCode(data) {
        const url = "/slide/get_slide_by_code";
        return axiosClient.get(url, {
            params: {
                code: data.code
            }
        });
    },

    async getSlideDetail(id) {
        const url = "/slide/getone";
        return axiosClient.get(url, {
            params: {
                _id: id
            }
        });
    },

    async delete(data) {
        const url = "/slide/delete";
        return axiosClient.post(url, {
            _id: data.id,
        });
    },

};


export default slideApi;