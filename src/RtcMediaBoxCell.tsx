import "./RtcMediaBoxCell.less";
import * as React from "react";
import TweenOne from "rc-tween-one";
import Identicon from "react-identicons";
import userHead from "./images/user_head.svg";
import mute_gray from "./images/mute_gray.svg";
import voice from "./images/voice.svg";
import RtcMediaBoxCellPlayerBox from "./RtcMediaBoxCellPlayerBox";
import {RoomMember} from "./index";
import {Stream} from "agora-rtc-sdk";
import rtcMediaBoxCell from "./RtcMediaBoxCell.less";

export type rtcVideoCellProps = {
    streamBoxId: string;
    roomMember: RoomMember,
    remoteStream?: Stream;
    remoteIndex?: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export default class RtcMediaBoxCell extends React.Component<rtcVideoCellProps, {}> {

    public constructor(props: rtcVideoCellProps) {
        super(props);
    }
    private renderRemoteVoiceIcon(): React.ReactNode {
        const { remoteStream }  = this.props;
        if (remoteStream && remoteStream.hasAudio()) {
            return (
                <div className={rtcMediaBoxCell["rtc-float-sound"]}>
                    <img className="rtc-float-sound-img" src={voice}/>
                </div>
            );
        } else {
            return (
                <div className={rtcMediaBoxCell["rtc-float-sound"]}>
                    <img className={rtcMediaBoxCell["rtc-float-sound-img"]} src={mute_gray}/>
                </div>
            );
        }
    }

    public render(): React.ReactNode {
        const { remoteStream, roomMember }  = this.props;
        return (
            <div className={rtcMediaBoxCell["rtc-video-box-cell-out"]}>
                <div
                    style={{
                        zIndex: 2,
                        display: (remoteStream && remoteStream.hasVideo()) ?  "none" : "flex",
                        borderTopRightRadius: 4,
                    }}
                    className={rtcMediaBoxCell["rtc-float-cell"]}>
                    <TweenOne
                        animation={{
                            blur: remoteStream ? "0px" : "4px",
                        }}
                        resetStyle={true}
                        className={rtcMediaBoxCell["rtc-float-cell-mid"]}>
                        {(roomMember.information && roomMember.information.avatar) ?
                            <Identicon
                                size={128}
                                string={roomMember.information.avatar}/> :
                            <img
                                onDragStart={event => event.preventDefault()}
                                className={rtcMediaBoxCell["rtc-float-cell-inner-box"]}
                                src={userHead}/>
                        }
                    </TweenOne>
                </div>
                {remoteStream &&
                <RtcMediaBoxCellPlayerBox
                    remoteStreamIndex={this.props.remoteIndex}
                    remoteStream={remoteStream}
                    streamBoxId={this.props.streamBoxId}/>}
                {this.renderRemoteVoiceIcon()}
            </div>
        );
    }
}
