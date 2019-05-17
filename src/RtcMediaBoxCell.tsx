import "./RtcMediaBoxCell.less";
import * as React from "react";
import TweenOne from "rc-tween-one";
import Identicon from "react-identicons";
import userHead from "./images/user_head.svg";
import mute_gray from "./images/mute_gray.svg";
import voice from "./images/voice.svg";
import RtcMediaBoxCellPlayerBox from "./RtcMediaBoxCellPlayerBox";
import {RoomMember} from "./index";
import {Stream, Client} from "agora-rtc-sdk";
import rtcMediaBoxCell from "./RtcMediaBoxCell.less";
import {SlidingBlockState} from "./slidingBlock";

export type rtcVideoCellProps = {
    streamBoxId: string;
    roomMember: RoomMember,
    remoteStream?: Stream;
    remoteIndex?: number;
    agoraClient: Client;
    blockState:  SlidingBlockState;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type RtcMediaBoxCellStates = {
    isVideoOpen: boolean;
    isAudioOpen: boolean;
};

export default class RtcMediaBoxCell extends React.Component<rtcVideoCellProps, RtcMediaBoxCellStates> {

    public constructor(props: rtcVideoCellProps) {
        super(props);
        this.state = {
            isVideoOpen: false,
            isAudioOpen: false,
        };
    }

    public componentWillReceiveProps(nextProps: rtcVideoCellProps): void {
        const {agoraClient, remoteStream} = this.props;
        if (nextProps.remoteStream !== remoteStream) {
            if (remoteStream) {
                agoraClient.on("mute-video", evt => {
                    const uid = evt.uid;
                    if (remoteStream.getId() === uid) {
                        this.setState({isVideoOpen: false});
                    }
                });
                agoraClient.on("unmute-video", evt => {
                    const uid = evt.uid;
                    if (remoteStream.getId() === uid) {
                        this.setState({isVideoOpen: true});
                    }
                });
                agoraClient.on("mute-audio", evt => {
                    const uid = evt.uid;
                    if (remoteStream.getId() === uid) {
                        this.setState({isAudioOpen: false});
                    }
                });
                agoraClient.on("unmute-audio", evt => {
                    const uid = evt.uid;
                    if (remoteStream.getId() === uid) {
                        this.setState({isAudioOpen: true});
                    }
                });
            }
        }
    }
    private renderRemoteVoiceIcon(): React.ReactNode {
        if (this.state.isAudioOpen) {
            return (
                <div className={rtcMediaBoxCell["rtc-float-sound"]}>
                    <img className={rtcMediaBoxCell["rtc-float-sound-img"]} src={voice}/>
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

    private initStream = (): void  => {
        this.setState({isVideoOpen: true, isAudioOpen: true});
    }

    private removeStream = (): void  => {
        this.setState({isVideoOpen: false, isAudioOpen: false});
    }

    public render(): React.ReactNode {
        const { remoteStream, roomMember }  = this.props;
        return (
            <div className={rtcMediaBoxCell["rtc-video-box-cell-out"]}>
                <div
                    style={{
                        zIndex: 2,
                        display: this.state.isVideoOpen ?  "none" : "flex",
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
                    initStream={this.initStream}
                    removeStream={this.removeStream}
                    remoteStream={remoteStream}
                    isVideoOpen={this.state.isVideoOpen}
                    streamBoxId={this.props.streamBoxId}/>}
                {this.renderRemoteVoiceIcon()}
            </div>
        );
    }
}
