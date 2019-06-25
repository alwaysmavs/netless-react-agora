import "./RtcMediaBoxCell.less";
import * as React from "react";
import TweenOne from "rc-tween-one";
import Identicon from "react-identicons";
import mute_gray from "./images/mute_gray.svg";
import voice from "./images/voice.svg";
import {RoomMember} from "white-react-sdk";
import {Stream} from "agora-rtc-sdk";
import rtcMediaBoxCell from "./RtcMediaBoxCell.less";
import {SlidingBlockState} from "./slidingBlock";

export type rtcVideoCellProps = {
    streamBoxId: string;
    roomMember: RoomMember | undefined;
    localStream: Stream;
    isAudioOpen: boolean;
    isVideoOpen: boolean;
    blockState:  SlidingBlockState;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export default class RtcMediaBoxCellSelf extends React.Component<rtcVideoCellProps, {}> {

    public constructor(props: rtcVideoCellProps) {
        super(props);
    }

    public componentWillReceiveProps(nextProps: rtcVideoCellProps): void {
        const { localStream }  = this.props;
        if (this.props.blockState !== nextProps.blockState) {
            if (nextProps.blockState === SlidingBlockState.Floating) {
                localStream.disableVideo();
            } else if (nextProps.blockState === SlidingBlockState.Extending) {
                localStream.enableVideo();
            }
        }
    }

    private renderLocalVoiceIcon(): React.ReactNode {
        if (this.props.isAudioOpen) {
            return (
                <div className={rtcMediaBoxCell["rtc-float-sound-self"]}>
                    <img className="rtc-float-sound-img" src={voice}/>
                </div>
            );
        } else {
            return (
                <div className={rtcMediaBoxCell["rtc-float-sound-self"]}>
                    <img className={rtcMediaBoxCell["rtc-float-sound-img"]} src={mute_gray}/>
                </div>
            );
        }
    }
    public render(): React.ReactNode {
        const { localStream, roomMember }  = this.props;
        return (
            <div className={rtcMediaBoxCell["rtc-video-box-cell-out-self"]}>
                <div
                    style={{
                        zIndex: 2,
                        display: this.props.isVideoOpen ? "none" : "flex",
                    }}
                    className={rtcMediaBoxCell["rtc-float-cell-self"]}>
                    <TweenOne
                        animation={{
                            blur: localStream ? "0px" : "4px",
                            duration: localStream ? 200 : 0,
                        }}
                        className={rtcMediaBoxCell["rtc-float-cell-mid"]}>
                        { (roomMember && roomMember.payload && roomMember.payload.avatar) ?
                            <Identicon
                            size={256}
                            string={roomMember.payload.avatar}/> :
                            <Identicon
                                size={256}
                                string={"netless"}/>
                        }
                    </TweenOne>
                </div>
                <TweenOne
                    animation={{scale: 1, duration: 200}}
                    style={{
                        transform: "scale(0)",
                        display: !this.props.isVideoOpen ? "none" : "flex",
                    }}
                    className={rtcMediaBoxCell["rtc-video-box-cell-self"]}
                    id={this.props.streamBoxId}
                />
                {this.renderLocalVoiceIcon()}
            </div>
        );
    }
}
