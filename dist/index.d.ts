interface UserInfoResult {
    logintype: "" | "qq" | "weixin";
    nickname?: string;
    avatar?: string;
    openid?: string;
}
export declare const getUserInfo: () => Promise<UserInfoResult>;
export {};
