import axios from 'axios';

// Create axios instance with base configuration
const api =
    process.env.NODE_ENV === "production"
        ? axios.create({
            baseURL: "https://51eb4d709e3407.lhr.life/api/",

        })
        : axios.create({
            baseURL: "http://localhost:5000/api/",

        });




export default api;