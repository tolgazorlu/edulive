import { useMutation } from "@tanstack/react-query";
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