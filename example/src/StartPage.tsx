import * as React from "react";
import "./StartPage.less";
import {Link} from "@netless/i18n-react-router";
import netless_black from "./netless_black.svg";

export type StartPageStates = {
    userId: string;
};

export default class StartPage extends React.Component<{}, StartPageStates> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            userId: "",
        };
    }
    public render(): React.ReactNode {
        return (
            <div className="container-start">
                <img src={netless_black}/>
                <div className="container-start-title">
                    Netless + Agora 集成测试
                </div>
                <input placeholder={"输入用户 id，类型是数字"}
                       value={this.state.userId}
                       onChange={e => this.setState({userId: e.target.value})}/>
                <Link to={`/rtc/${this.state.userId}`}>
                    <div className="container-start-btn">
                        进入房间
                    </div>
                </Link>
            </div>
        );
    }
}
