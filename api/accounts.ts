import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios-config';


interface Post {
    id: number;
    title: string;
    body: string;
}

interface CreatePostData {
    otp_code: string,
    user_validator: string,
}
interface UseSendOtpOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}
export const useVerifyCode = (options: UseSendOtpOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postData: CreatePostData) => {
            const response = await api.post('v1/accounts/verify-code/', postData);
            return response.data;
        },
        onSuccess: options?.onSuccess,
        onError: options?.onError
    });
};



interface registerPostData {
    first_name: string,
    last_name: string,
    email: string
    password: string,
}
export const useRegister = (options: UseSendOtpOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postData: registerPostData) => {
            const response = await api.post('v1/accounts/register/', postData);
            return response.data;
        },
        onSuccess: options?.onSuccess,
        onError: options?.onError
    });
};


interface profilePostData {
    birth_date: string,
    gender: string,
    country_id: string,
    phone_number: string

}
export const useProfile = (options: UseSendOtpOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postData: profilePostData) => {
            const response = await api.post('v1/accounts/profile/', postData);
            return response.data;
        },
        onSuccess: options?.onSuccess,
        onError: options?.onError
    });
};

interface HealthInfoPostData {
    activity_level_id: string,
    health_condition_id: string,
    fitness_goal_id: string,
    height: number,
    weight: number

}

export const useHealthInfo = (options: UseSendOtpOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postData: HealthInfoPostData) => {
            const response = await api.post('v1/accounts/health-info/', postData);
            return response.data;
        },
        onSuccess: options?.onSuccess,
        onError: options?.onError
    });
};






///GET Query
// Custom hook
export const useCountries = () => {
    return useQuery({
        queryKey: ['countries'],
        queryFn: async () => {
            const response = await api.get('v1/accounts/countries/');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};


export const useGetActivityLevel = () => {
    return useQuery({
        queryKey: ['activity'],
        queryFn: async () => {
            const response = await api.get('v1/accounts/activity-level/');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useGetFitnessGoal = () => {
    return useQuery({
        queryKey: ['fitness'],
        queryFn: async () => {
            const response = await api.get('v1/accounts/fitness-goal/');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};



export const useGetHealthConditioan = () => {
    return useQuery({
        queryKey: ['condition'],
        queryFn: async () => {
            const response = await api.get('v1/accounts/health-condition/');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useGetProfileDetails= () => {
    return useQuery({
        queryKey: ['details'],
        queryFn: async () => {
            const response = await api.get('v1/accounts/details/');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};