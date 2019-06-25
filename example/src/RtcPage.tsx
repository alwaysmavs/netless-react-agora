import * as React from "react";
import ReactAgora from "@netless/react-agora";
import "./RtcPage.less";
import {RouteComponentProps} from "react-router";
import {RoomMember} from "white-react-sdk";

const user: ReadonlyArray<RoomMember>  = [{
    memberId: 2,
    memberState: {
        currentApplianceName: "pencil",
        strokeColor: [236, 52, 85],
        strokeWidth: 4,
        textSize: 16,
    },
    session: "",
    payload: {
        id: "76611",
        isOwner: false,
        nickName: "46f70cf7-b439-4bae-9a8b-f6eaf6a0a696",
        avatar: "46f70cf7-b439-4bae-9a8b-f6eaf6a0a696",
    },
},
    {
    memberId: 3,
    session: "",
    memberState: {
        currentApplianceName: "pencil",
        strokeColor: [0, 91, 246],
        strokeWidth: 4,
        textSize: 16,
    },
    payload: {
        id: "87792",
        isOwner: false,
        nickName: "d501a95b-cea1-4d75-bdc4-4732f6291c59",
        avatar: "d501a95b-cea1-4d75-bdc4-4732f6291c59",
    },
}, {

    memberId: 4,
    memberState: {
        currentApplianceName: "rectangle",
        strokeColor: [245, 173, 70],
        strokeWidth: 4,
        textSize: 16,
    },
    session: "",
    payload: {
        id: "28466",
        isOwner: false,
        nickName: "c5a3ae31-4359-4f51-bd61-8dcd8ee87f0f",
        avatar: "c5a3ae31-4359-4f51-bd61-8dcd8ee87f0f",
    },
},
];

export default class RtcPage extends React.Component<RouteComponentProps<{ user: string }>, {}> {
    public constructor(props: RouteComponentProps<{ user: string }>) {
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
