import * as React from "react";
import TweenOne from "rc-tween-one";
import rtcMediaBoxCellPlayer from "./RtcMediaBoxCell.less";
import {Stream} from "agora-rtc-sdk";

export type RtcMediaBoxCellInnerState = {
    animationReverse: boolean,
};

export type RtcMediaBoxCellInnerProps = {
    streamBoxId: string,
    remoteStream: Stream,
    isVideoOpen: boolean,
    initStream: () => void,
    remoteStreamIndex?: number,
};

export default class RtcMediaBoxCellPlayerBox extends React.Component<RtcMediaBoxCellInnerProps, RtcMediaBoxCellInnerState> {

    public constructor(props: RtcMediaBoxCellInnerProps) {
        super(props);
        this.state = {
            animationReverse: false,
        };
    }

    public componentDidMount(): void {
        if (this.props.remoteStream) {
            this.props.remoteStream.play(this.props.streamBoxId);
            this.props.initStream();
        }
    }

    public componentWillUnmount(): void {
        this.setState({
            animationReverse: true,
        });
    }


    public render(): React.ReactNode {
        return (
            <TweenOne
                animation={{scale: 1, duration: 200}}
                reverse={this.state.animationReverse}
                style={{
                    transform: "scale(0)",
                    display: this.props.isVideoOpen ? "flex" : "none",
                }}
                className={rtcMediaBoxCellPlayer["rtc-video-box-cell"]}
                id={this.props.streamBoxId}
            />
        );
    }
}
