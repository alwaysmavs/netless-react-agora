import * as React from "react";
import ReactAgora from "@netless/react-agora";
import "./RtcPage.less";
import {RouteComponentProps} from "react-router";

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

const user: RoomMember[] = [
    {
        memberId: 1,
        isRtcConnected: false,
        information:
            {
                id: 1,
                nickName: "第一",
                isOwner: false,
                avatar: "dasdst",
            },
    },
    {
        memberId: 2,
        isRtcConnected: false,
        information:
            {
                id: 2,
                nickName: "第二",
                isOwner: false,
                avatar: "mnbhkj",
            },
    },
    {
        memberId: 3,
        isRtcConnected: false,
        information:
            {
                id: 3,
                nickName: "第三",
                isOwner: false,
                avatar: "vihbihgjgukjhkh",
            },
    },
    {
        memberId: 4,
        isRtcConnected: false,
        information:
            {
                id: 4,
                nickName: "第四",
                isOwner: false,
                avatar: "mnbdqwehkj",
            },
    },
    {
        memberId: 5,
        isRtcConnected: false,
        information:
            {
                id: 5,
                nickName: "第五",
                isOwner: false,
                avatar: "mnbh341234kj",
            },
    }];
export default class RtcPage extends React.Component<RouteComponentProps<{user: string}>, {}> {
    public constructor(props: RouteComponentProps<{user: string}>) {
        super(props);
    }
    public render(): React.ReactNode {
        const userId = parseInt(this.props.match.params.user);
        return (
            <div className="container">
                <ReactAgora
                    channelId={"23123"}
                    userId={userId}
                    agoraAppId={"8595fd46955f427db44b4e9ba90f015d"}
                    roomMembers={user}/>
            </div>
        );
    }
}
