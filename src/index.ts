import User from "./libs/user";
// import Request from "./libs/request";

interface UserInfoResult {
    logintype: "" | "qq" | "weixin";
    nickname?: string;
    avatar?: string;
    openid?: string;
}

// const user = new User();
// const request = new Request();

export const getUserInfo: () => Promise<UserInfoResult> = User.getUserInfo;
