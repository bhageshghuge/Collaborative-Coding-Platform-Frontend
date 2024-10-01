import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5001'; // Replace with your server URL
export const socket = io(ENDPOINT);
