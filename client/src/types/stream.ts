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
    chatToken: string;
}

import type { UR, LiteralStringForUnion } from 'stream-chat';

export type UserRole = 'streamer' | 'moderator' | 'VIP' | 'user' | string;

export type AttachmentType = UR;
export type ChannelType = UR;
export type CommandType = LiteralStringForUnion;
export type EventType = UR;
export type MemberType = UR;
export type MessageType = UR;
export type ReactionType = UR;
export type UserType = { name: string; userRole: UserRole };
export type PollOptionType = UR;
export type PollType = UR;

export type StreamChatType = {
    attachmentType: AttachmentType;
    channelType: ChannelType;
    commandType: CommandType;
    eventType: EventType;
    memberType: MemberType;
    messageType: MessageType;
    reactionType: ReactionType;
    userType: UserType;
    pollOptionType: PollOptionType;
    pollType: PollType;
};
