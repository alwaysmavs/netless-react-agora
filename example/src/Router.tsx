import * as React from "react";
import {AppRouter} from "@netless/i18n-react-router";
import {language} from "./locale";
import RtcPage from "./RtcPage";
import StartPage from "./StartPage";

export default class App extends React.Component<{}, {}> {
    public constructor(props: {}) {
        super(props);
    }
    public render(): React.ReactNode {
        return (
            <AppRouter language={language} routes={[
                {path: "/", component: StartPage},
                {path: "/rtc/:user", component: RtcPage},
            ]}/>
        );
    }
}
