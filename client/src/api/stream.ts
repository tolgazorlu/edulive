import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./client";

export const useCreateStreamMutation = () =>
    useMutation({
        mutationFn: async ({
            ocid,
            title,
            description
        }: {
            ocid: string;
            title: string;
            description: string
        }) =>
            (
                await apiClient.post(`/stream/create/${ocid}`, { title, description })
            ).data,
    });

export const useGetStreamInformation = (slug: string) =>
    useQuery({
        queryKey: ["stream", slug],
        queryFn: async () =>
            (await apiClient.get(`/stream/${slug}`)).data,
    });
