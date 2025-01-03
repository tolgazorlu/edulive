import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./client";
import { Stream } from "@/types/stream";

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

interface StreamsResponse {
    liveStreams: Stream[];
    pastStreams: Stream[];
}

export const useGetActiveStreams = () =>
    useQuery<StreamsResponse>({
        queryKey: ["active-streams"],
        queryFn: async () =>
            (await apiClient.get(`/stream/active`)).data,
    });

export const useUpdateStreamStatus = () =>
    useMutation({
        mutationFn: async ({ streamId, isLive }: { streamId: string; isLive: boolean }) =>
            (await apiClient.patch(`/stream/${streamId}/status`, { isLive })).data,
    });
