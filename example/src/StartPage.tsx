import * as React from "react";
import "./StartPage.less";
import {Link} from "@netless/i18n-react-router";

export default class StartPage extends React.Component<{}, {}> {
    public constructor(props: {}) {
        super(props);
    }
    public render(): React.ReactNode {
        return (
            <div className="container-start">
                <Link to="/rtc/1">
                    <div className="container-start-btn">
                        start
                    </div>
                </Link>
            </div>
        );
    }
}
