
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios-config';
import { useDispatch } from 'react-redux';
import { setGmailVerify } from '@/Store/reducers/user.reducer/user.reducer';


interface Post {
    id: number;
    title: string;
    body: string;
}

interface CreatePostData {
    user_validator: string
}


interface UseSendOtpOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}
export const useSendOtp = (options?: UseSendOtpOptions) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async (postData: CreatePostData) => {
            const response = await api.post('v1/accounts/send-code/', postData);
            return response.data;
        },
        onSuccess: options?.onSuccess,
        onError: options?.onError
    });

}

interface TokenPostData{
   email: string;
    password: string
}

export const useTokenLogin = (options?: UseSendOtpOptions) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async (postData: TokenPostData) => {
            const response = await api.post('token/', postData);
            return response.data;
        },
        onSuccess: options?.onSuccess,
        onError: options?.onError
    });
}