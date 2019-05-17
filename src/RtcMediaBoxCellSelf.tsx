import "./RtcMediaBoxCell.less";
import * as React from "react";
import TweenOne from "rc-tween-one";
import Identicon from "react-identicons";
import userHead from "./images/user_head.svg";
import mute_gray from "./images/mute_gray.svg";
import voice from "./images/voice.svg";
import {RoomMember} from "./index";
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
        const { localStream, roomMember }  = this.props;
        return (
            <div className={rtcMediaBoxCell["rtc-video-box-cell-out"]}>
                <div
                    style={{
                        zIndex: 2,
                        display: this.props.isVideoOpen ? "none" : "flex",
                        borderTopLeftRadius: 4,
                    }}
                    className={rtcMediaBoxCell["rtc-float-cell"]}>
                    <TweenOne
                        animation={{
                            blur: localStream ? "0px" : "4px",
                            duration: localStream ? 200 : 0,
                        }}
                        className={rtcMediaBoxCell["rtc-float-cell-mid"]}>
                        { (roomMember && roomMember.information && roomMember.information.avatar) ?
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
                <TweenOne
                    animation={{scale: 1, duration: 200}}
                    style={{
                        transform: "scale(0)",
                        borderTopLeftRadius: 4,
                        display: !this.props.isVideoOpen ? "none" : "flex",
                    }}
                    className={rtcMediaBoxCell["rtc-video-box-cell"]}
                    id={this.props.streamBoxId}
                />
                {this.renderLocalVoiceIcon()}
            </div>
        );
    }
}
