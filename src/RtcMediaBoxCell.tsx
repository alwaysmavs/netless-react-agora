import "./RtcMediaBoxCell.less";
import * as React from "react";
import TweenOne from "rc-tween-one";
import Identicon from "react-identicons";
import userHead from "./images/user_head.svg";
import mute_gray from "./images/mute_gray.svg";
import voice from "./images/voice.svg";
import RtcMediaBoxCellPlayerBox from "./RtcMediaBoxCellPlayerBox";
import {RoomMember, StreamsStatesType} from "./index";
import rtcMediaBoxCell from "./RtcMediaBoxCell.less";
import {SlidingBlockState} from "./slidingBlock";
import {Stream} from "agora-rtc-sdk";

export type rtcVideoCellProps = {
    streamBoxId: string;
    roomMember: RoomMember,
    remoteStream?: Stream;
    remoteIndex?: number;
    blockState:  SlidingBlockState;
    streamsState?: StreamsStatesType;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type RtcMediaBoxCellStates = {
    isFirst: boolean;
};

export default class RtcMediaBoxCell extends React.Component<rtcVideoCellProps, RtcMediaBoxCellStates> {

    public constructor(props: rtcVideoCellProps) {
        super(props);
        this.state = {
            isFirst: true,
        };
    }

    public componentWillReceiveProps(): void {
    }
    private renderRemoteVoiceIcon(): React.ReactNode {
        const { streamsState }  = this.props;
        if (streamsState && streamsState.state.isAudioOpen) {
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
    public render(): React.ReactNode {
        const { remoteStream, roomMember, streamsState}  = this.props;
        return (
            <div className={rtcMediaBoxCell["rtc-video-box-cell-out"]}>
                <div
                    style={{
                        zIndex: 2,
                        display: (streamsState && streamsState.state.isVideoOpen) ?  "none" : "flex",
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
                    streamsState={streamsState}
                    remoteStreamIndex={this.props.remoteIndex}
                    remoteStream={remoteStream}
                    streamBoxId={this.props.streamBoxId}/>}
                {this.renderRemoteVoiceIcon()}
            </div>
        );
    }
}
