# netless-react-agora

> 一个和 `netless` 白板结合 `agora` 组件，可以在您的白板项目中直接使用，也可以参考其中的代码逻辑自己实现。

[![NPM](https://img.shields.io/npm/v/netless-scale-controller.svg)](https://www.npmjs.com/package/netless-scale-controller) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 1. 说明

本项目技术选型为：`React` `Typescript `
打包工具为： `rollup`  

## 2. 安装

```bash
npm install --save @netless/react-agora

或者

yarn @netless/react-agora
```

## 3. 接口说明

**自定义类型说明**

```typescript
export type MemberInformation = {
    readonly id: number;
    readonly nickName: string;
    readonly isOwner: boolean;
    readonly avatar?: string;
};
// 白板的成员类型
export type RoomMember = {
    readonly memberId: number;
    readonly isRtcConnected: boolean;
    readonly information?: MemberInformation;
}
  
// 浮窗位置类型
export type BlockPosition = {
    readonly width: number;
    readonly height: number;
    readonly top?: number;
    readonly bottom?: number;
    readonly left?: number;
    readonly right?: number;
};
```



| 参数              | 说明                         | 类型                      |                       默认值                        |
| :---------------- | :--------------------------- | :------------------------ | :-------------------------------------------------: |
| userId            | 用户 id                      | number                    |                                                     |
| channelId         | 频道 id                      | string                    |                                                     |
| roomMembers       | 白板的成员                   | ReadonlyArray<RoomMember> |                                                     |
| agoraAppId        | 声网的 appId                 | string                    |                                                     |
| startBtn          | 开始启动的按钮               | React.ReactNode           |                                                     |
| defaultStart      | 是否载入自动开启音视频       | boolean                   |                                                     |
| HidingPosition    | 音视频窗口收缩的位置         | BlockPosition             |   {bottom: 0, left: 154, width: 32, height: 32,}    |
| FloatingPosition  | 音视频窗口变成浮球的初始位置 | BlockPosition             | {bottom: 54, left: 0,     width: 90, height: 90, }  |
| ExtendingPosition | 音视频窗口扩展变大的初始位置 | BlockPosition             | {bottom: 64, left: 0,     width: 120, height: 120,} |

## 4. 使用概览

```typescript
import * as React from "react";
import ReactAgora from "@netless/react-agora";

export type MemberInformation = {
    readonly id: number;
    readonly nickName: string;
    readonly isOwner: boolean;
    readonly avatar?: string;
};
export type RoomMember = {
    readonly memberId: number;
    readonly isRtcConnected: boolean;
    readonly information: MemberInformation;
};

const user_mock_data: RoomMember[] = [
    {
        memberId: 1,
        isRtcConnected: false,
        information:
            {
                id: 1,
                nickName: "Tom",
                isOwner: false,
                avatar: "xxx-1",
            },
    },
    {
        memberId: 2,
        isRtcConnected: false,
        information:
            {
                id: 2,
                nickName: "Jack",
                isOwner: false,
                avatar: "xxx-2",
            },
    }];
export default class RtcPage extends React.Component<{}, {}> {
    public constructor(props: RouteComponentProps<{user: string}>) {
        super(props);
    }
    public render(): React.ReactNode {
        const userId = parseInt(this.props.match.params.user);
        return (
            <div className="container">
                <ReactAgora
                    channelId={"1-xxx-2"}
                    userId={1}
                    agoraAppId={"xxxxxxxxxxxxxxx"}
                    roomMembers={user_mock_data}/>
            </div>
        );
    }
}

```

## 5. 启动项目测试案例

1. 获取源码
  
    ```bash
    git clone git@github.com:netless-io/netless-react-agora.git
    ```

2. 进入项目并安装库文件依赖
  
    ```bash
    cd netless-react-agora
    yarn
    ```

3. 启动库文件项目

    ```bash
        yarn start
    ```

4. 进入项目并安装 `example` 文件依赖

    ```bash
        cd example
        yarn
    ```

5. 启动 `example` 项目

    ```bash
        yarn start
    ```
    
6. 项目截图

    ![屏幕快照 2019-05-18 下午4.08.15](https://ohuuyffq2.qnssl.com/屏幕快照 2019-05-18 下午4.08.15.png)
    
    ![屏幕快照 2019-05-18 下午4.09.08](https://ohuuyffq2.qnssl.com/屏幕快照 2019-05-18 下午4.09.08.png)


## License

MIT © [alwaysmavs](https://github.com/alwaysmavs)



