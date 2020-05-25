interface UserInfoResult {
    logintype: "" | "qq" | "weixin";
    nickname?: string;
    avatar?: string;
    openid?: string;
}
declare const User: {
    getUserInfo(): Promise<UserInfoResult>;
    login(): void;
};
export default User;
