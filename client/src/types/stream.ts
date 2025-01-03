export interface Stream {
    _id: string;
    title: string;
    description: string;
    slug: string;
    rtmpURL: string;
    streamKey: string;
    owner: {
        name: string;
        avatar: string;
    };
    viewerToken: string;
    callId: string;
    isLive: boolean;
    createdAt: string;
} 