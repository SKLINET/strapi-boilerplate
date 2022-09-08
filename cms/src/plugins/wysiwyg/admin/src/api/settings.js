import { axiosInstance } from "../utils";

const taskRequests = {
    getSettings: async () => {
        const data = await axiosInstance.get(`/wysiwyg/settings`);
        return data;
    },
    setSettings: async (data) => {
        return await axiosInstance.post(`/wysiwyg/settings`, {
            apiKey: data,
        });
    },
};
export default taskRequests;
