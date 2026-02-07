import { create } from 'zustand';
import {
    registerUser,
    loginUser,
    forgotPassword,
    validateUser,
} from '../../Services/AuthAPI';

export const useAuthStore = create((set) => ({
    userID: null,
    token: null,
    error: null,
    success: null,

    setError: (msg) => set({ error: msg }),
    setSuccess: (msg) => set({ success: msg }),

    register: async (data) => {
        set({ error: null, success: null });
        try {
            const res = await registerUser(data);
            if (res.status === 200) {
                set({
                    userID: res.data.userID,
                    token: res.data.Token,
                    error: null,
                    success: true,
                });
                localStorage.setItem('Token', res.data.Token);
                localStorage.setItem('UserID', res.data.userID);
                return true;
            }
        } catch (error) {
            const message =
                error.response?.data?.message || 'Something went wrong';
            set({ error: message, success: false });
            return false;
        }
    },

    login: async (data) => {
        set({ error: null, success: null });
        try {
            const res = await loginUser(data);
            if (res.status === 200) {
                if (!res.data.isDeactived) {
                    set({
                        userID: res.data.userID,
                        token: res.data.Token,
                        error: null,
                        success: true,
                    });
                    localStorage.setItem('Token', res.data.Token);
                    localStorage.setItem('UserID', res.data.userID);
                } else {
                    set({
                        success: false,
                        error: 'Your Account is Deactivated',
                    });
                }
                return res.data;
            }
        } catch (error) {
            const message =
                error.response?.data?.message || 'Something went wrong';
            set({ error: message, success: false });
            return false;
        }
    },
}));
