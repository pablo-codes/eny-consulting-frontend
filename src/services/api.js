import axios from 'axios';

// Create axios instance with base configuration
const api =
    process.env.NODE_ENV === "production"
        ? axios.create({
            baseURL: "https://api079.perzsirentals.com/api/v1/",

        })
        : axios.create({
            baseURL: "http://localhost:5000/api/",

        });




export default api;