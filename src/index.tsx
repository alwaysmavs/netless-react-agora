import * as React from "react";
import {BlockPosition, SlidingBlockState} from "./slidingBlock";
import video from "./images/video.svg";
import {ExtendingPosition, FloatingPosition, HidingPosition} from "./RtcSlidingBlockPosition";
import {SlidingBlockMask} from "./SlidingBlockMask";
import AgoraRTC, {Stream, Client} from "agora-rtc-sdk";
import {RtcBlockContextProvider} from "./RtcBlockContext";
import TweenOne from "rc-tween-one";
import styles from "./index.less";

export type MemberInformation = {
    readonly id: number;
    readonly nickName: string;
    readonly isOwner: boolean;
    readonly avatar?: string;
};
export type RoomMember = {
    readonly memberId: number;
    readonly isRtcConnected: boolean;
    readonly information?: MemberInformation;
};
export type RtcLayoutState = {
    isBlockHiding: boolean;
    blockState: SlidingBlockState;
    remoteMediaStreams: Stream[];
    localStream: Stream | null;
    isStartBtnLoading: boolean;
};

export type RtcLayoutProps = {
    userId: number;
    channelId: string;
    roomMembers: ReadonlyArray<RoomMember>;
    agoraAppId: string;
    startBtn?: React.ReactNode;
    defaultStart?: boolean;
    FloatingPosition?: BlockPosition;
    HidingPosition?: BlockPosition;
    ExtendingPosition?: BlockPosition;
};

export default class Index extends React.Component<RtcLayoutProps, RtcLayoutState> {
    private FloatingPosition: BlockPosition = FloatingPosition;
    private HidingPosition: BlockPosition = HidingPosition;
    private ExtendingPosition: BlockPosition = ExtendingPosition;
    private agoraClient: Client;
    // private remoteMediaStreams: Stream[]
    public constructor(props: RtcLayoutProps) {
        super(props);
        this.state = {
            isBlockHiding: true,
            blockState: SlidingBlockState.Hiding,
            remoteMediaStreams: [],
            isStartBtnLoading: false,
            localStream: null,
        };
    }

    private startRtc = (uid: number, channelId: string): void => {
        this.setSliderExtending();
        this.setState({isStartBtnLoading: true});
        if (!this.agoraClient) {
            this.agoraClient = AgoraRTC.createClient({mode: "live", codec: "h264"});
            this.agoraClient.init(this.props.agoraAppId, () => {
                console.log("AgoraRTC client initialized");
            }, err => {
                console.log("AgoraRTC client init failed", err);
            });
        }
        const localStream = AgoraRTC.createStream({
            streamID: uid,
            audio: true,
            video: true,
            screen: false,
        });
        localStream.init(()  => {
            console.log("getUserMedia successfully");
            this.setState({localStream: localStream});
            // localStream.play("rtc_local_stream");
            this.setState({isStartBtnLoading: false});
            this.agoraClient.join(this.props.agoraAppId, channelId, uid, (uid: number) => {
                console.log("User " + uid + " join channel successfully");
                this.agoraClient.publish(localStream, err => {
                    console.log("Publish local stream error: " + err);
                });
            }, err => {
                console.log(err);
            });

        }, (err: any) => {
            console.log("getUserMedia failed", err);
        });
        this.agoraClient.on("stream-published", () => {
            console.log("Publish local stream successfully");
        });
        this.agoraClient.on("stream-added",  evt => {
            const stream = evt.stream;
            console.log("New stream added: " + stream.getId());
            const remoteMediaStreams: Stream[] = this.state.remoteMediaStreams;
            remoteMediaStreams.push(stream);
            this.setState({remoteMediaStreams: remoteMediaStreams});
            this.agoraClient.subscribe(stream, err => {
                console.log("Subscribe stream failed", err);
            });
        });
        this.agoraClient.on("peer-leave", evt => {
            this.stop(evt.uid);
            console.log("remote user left ", uid);
        });
        this.agoraClient.on("stream-subscribed", (evt: any) => {
            const remoteStream: Stream = evt.stream;
            console.log("Subscribe remote stream successfully: " + remoteStream.getId());
        });
    }

    private stop = (streamId: number): void => {
        const remoteMediaStreams = this.state.remoteMediaStreams;
        const stream = remoteMediaStreams.find((stream: Stream) => {
            return stream.getId() === streamId;
        });
        if (stream) {
            stream.stop();
            stream.close();
            remoteMediaStreams.splice(remoteMediaStreams.indexOf(stream), 1);
            this.setState({remoteMediaStreams: remoteMediaStreams});
        }
    }

    private stopLocal = (): void => {
        this.agoraClient.leave(() => {
            this.state.localStream!.stop();
            this.state.localStream!.close();
            this.setState({localStream: null, remoteMediaStreams: []});
            this.setSliderHiding();
        }, err => {
            console.log("Leave channel failed" + err);
        });
    }

    public componentDidMount(): void {
        if (this.props.defaultStart) {
            this.startRtc(this.props.userId, this.props.channelId);
        }
        if (this.props.HidingPosition) {
            this.HidingPosition = this.props.HidingPosition;
        }
        if (this.props.FloatingPosition) {
            this.FloatingPosition = this.props.FloatingPosition;
        }
        if (this.props.ExtendingPosition) {
            this.ExtendingPosition = this.props.ExtendingPosition;
        }
    }

    private setSliderFloating = (): void => {
        this.setState({blockState: SlidingBlockState.Floating});
    }


    private setSliderExtending = (): void => {
        this.setState({blockState: SlidingBlockState.Extending});
    }

    private setSliderHiding = (): void => {
        this.setState({blockState: SlidingBlockState.Hiding});
    }

    private renderRtcBtn = (): React.ReactNode => {
        if (this.state.blockState === SlidingBlockState.Hiding || this.state.isStartBtnLoading) {
            if (this.props.startBtn) {
                return (
                    <div onClick={() => this.startRtc(this.props.userId, this.props.channelId)}>
                        {this.props.startBtn}
                    </div>
                );
            } else {
                return (
                    <TweenOne
                        animation={{
                            duration: 240,
                            scale: 1,
                        }}
                        style={{
                            transform: "scale(0)",
                        }} onClick={() => this.startRtc(this.props.userId, this.props.channelId)} className={styles["rtc-block-btn"]}>
                        {this.state.isStartBtnLoading ? <img src={video}/> : <img src={video}/>}
                    </TweenOne>
                );
            }

        } else {
            return null;
        }
    }

    private extendingSize = (roomMembers: number): {width: number, height: number} => {
        const elementsInLine = 2;
        const linesCount = Math.ceil(roomMembers / elementsInLine);
        const blockHeight: number = 128 * linesCount + 64;
        const blockHeightMax: number = window.innerHeight - 32;
        const isBlockHeightMax: boolean = blockHeight >= blockHeightMax;
        if (isBlockHeightMax) {
            return {
                width: 256,
                height: blockHeightMax,
            };
        } else {
            return {
                width: 256,
                height: blockHeight,
            };
        }
    }

    private onClickSlidingBlock = (): void => {
        if (this.state.blockState === SlidingBlockState.Floating) {
            this.setSliderExtending();
        }
    }

    public render(): React.ReactNode {
        if (!this.state.localStream) {
            return this.renderRtcBtn();
        }
        return (
            <RtcBlockContextProvider
                value={{
                    remoteMediaStreams: this.state.remoteMediaStreams,
                    userId: this.props.userId,
                    roomMembers: this.props.roomMembers,
                    localStream: this.state.localStream,
                    setSliderExtending: this.setSliderExtending,
                    setSliderFloating: this.setSliderFloating,
                    setSliderHiding: this.setSliderHiding,
                    stopRtc: this.stopLocal,
                    agoraClient: this.agoraClient,
            }}>
                <SlidingBlockMask state={this.state.blockState}
                                  hiding={this.HidingPosition}
                                  floating={this.FloatingPosition}
                                  extending={{...this.ExtendingPosition, ...this.extendingSize(this.props.roomMembers.length)}}
                                  onIsHidingChanged={isBlockHiding => this.setState({isBlockHiding})}
                                  onClick={this.onClickSlidingBlock}/>
            </RtcBlockContextProvider>
        );
    }
}
