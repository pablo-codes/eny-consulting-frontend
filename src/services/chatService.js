import api from './api';


export const sendChatMessage = (message) => {
    return api.post('/chat/message', { message });
};


export const checkChatHealth = () => {
    return api.get('/chat/health');
};


// export const sendChatMessageWithFallback = (message) => {
//     return api.post('/chat/message-fallback', { message });
// };