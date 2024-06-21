// src/state/authState.js
import { atom, selector } from 'recoil';
import axios from 'axios';

export const authState = atom({
    key: 'authState',
    default: { isAuthenticated: false, userId: null, role: null, username: null },
});

