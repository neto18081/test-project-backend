import axios from "axios"

// DEFINING THE ROUTE WHERE THE REQUESTS WILL BE MADE
// IT IS EASIER THIS WAY BECAUSE IF THE URL CHANGES, I JUST HAVE TO CHANGE HERE

export const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;