import * as React from "react";
import ReactAgora from "@netless/react-agora";
import "./App.less";

export type AppStates = {
  scale: number;
};
export type MemberInformation = {
    readonly id: number;
    readonly nickName: string;
    readonly isOwner: boolean;
    readonly avatar?: string;
};
export type RoomMember = {
    readonly memberId: number;
    readonly isRtcConnected: boolean;
    readonly information: MemberInformation;
};

const user: RoomMember[] = [{memberId: 1, isRtcConnected: false, information: {id: 1, nickName: "2312", isOwner: false, avatar: "dasds"}}];
export default class App extends React.Component<{}, AppStates> {
    public constructor(props: {}) {
        super(props);
        this.state = {
          scale: 1,
        };
    }

    private getSlider(): React.ReactNode {
        return <ReactAgora channelId={"23123"} userId={1} agoraAppId={"8595fd46955f427db44b4e9ba90f015d"} roomMembers={user}/>;
    }

    public render(): React.ReactNode {
        return (
            <div className="container">
                {this.getSlider()}
            </div>
        );
    }
}
