import axios from "axios";

export const loginUser =  async ({username, password}) => {
    const baseUrl = 'http://localhost:8080'
    try {
        return await axios.post(`${baseUrl}/login`, {
            username,
            password
        });
    } catch (error) {
        throw error;
    }
    
}