///GET Query

import { api } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";

// Custom hook
export const useGetMovementsCategories = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await api.get('v1/movements/categories/');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};