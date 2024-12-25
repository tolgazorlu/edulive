import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./client";

export const useCreateUserMutation = () =>
    useMutation({
        mutationFn: async ({
            ocid,
            name,
            email,
            edu_address,
            role
        }: {
            ocid: string;
            name: string;
            email: string;
            edu_address: string,
            role: string
        }) =>
            (
                await apiClient.post(`/auth/create`, {
                    ocid,
                    name,
                    email,
                    edu_address,
                    role
                })
            ).data,
    });

export const useGetUserIsExist = (ocid: string) =>
    useQuery({
        queryKey: ["exist", ocid],
        queryFn: async () =>
            (await apiClient.get(`/auth/exist-user/${ocid}`)).data,
    });
