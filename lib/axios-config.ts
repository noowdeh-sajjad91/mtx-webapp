import { logout, setToken } from '@/Store/reducers/user.reducer/user.reducer';
import store from '@/Store/store';
import axios from 'axios';



export const apiClient = axios.create({
    baseURL: '/api/', // اسلش در انتها
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = store.getState().reducer.user.currentUser.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'

        console.log(`📤 درخواست ${config.method?.toUpperCase()} به: ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token expiration and rotation
apiClient.interceptors.response.use(
    (response) => {
        console.log(`📥 پاسخ ${response.status} از: ${response.config.url}`);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        //if access token expired, try to refresh token
        console.error('❌ خطای API:', error.response?.data || error.message);

        // مدیریت خطاهای مختلف
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            debugger
            const refereshToken = store.getState().reducer.user.currentUser.refershToken;
            console.log('refresh token ', refereshToken)
            if (refereshToken) {
                debugger
                try {
                    //Request new access token
                    const res = await axios.post(
                        "/api/token/refresh/", {
                        refereshToken
                    }
                    );
                    console.log('res refresh token=> ', res.data)
                    //Save new tokens
                    store.dispatch(setToken({ token: res.data.access, refershToken: res.data.refresh }))
                    // Retry the original request with new token

                    originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                    debugger;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // Refresh token invalid, force logout or redirect to login
                    // Unauthorized - هدایت به صفحه لاگین
                    // localStorage.removeItem('accessToken');
                    store.dispatch(logout())
                    window.location.href = '/account/login';
                }
            }

        }

        if (error.response?.status === 500) {
            // Server Error
            console.error('خطای سرور داخلی');
        }

        return Promise.reject(error);
    }
);


export const api = {
    get: (url: string, params?: any) => apiClient.get(url, { params }),
    post: (url: string, data?: any) => apiClient.post(url, data),
    put: (url: string, data?: any) => apiClient.put(url, data),
    patch: (url: string, data?: any) => apiClient.patch(url, data),
    delete: (url: string) => apiClient.delete(url),
};