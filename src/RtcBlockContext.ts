import * as React from "react";
import {RoomMember, StreamsStatesType} from "./index";
import {Stream} from "agora-rtc-sdk";
export type RtcBlockContext = {
    readonly remoteMediaStreams: Stream[];
    readonly userId: number;
    readonly roomMembers: ReadonlyArray<RoomMember>;
    readonly localStream: Stream;
    remoteMediaStreamsStates: StreamsStatesType[];
    setSliderFloating: () => void;
    setSliderExtending: () => void;
    setSliderHiding: () => void;
    stopRtc: () => void;
};

const context = React.createContext<RtcBlockContext>(undefined as any);

export const RtcBlockContextProvider = context.Provider;
export const RtcBlockContextConsumer = context.Consumer;
