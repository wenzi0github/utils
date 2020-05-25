interface UserInfoResult {
    logintype: "" | "qq" | "weixin";
    nickname?: string;
    avatar?: string;
    openid?: string;
}

const User = {
    getUserInfo(): Promise<UserInfoResult> {
        return Promise.resolve({
            logintype: "qq",
            nickname: "蚊子",
            avatar: "",
            openid: "123456",
        });
    },
    login() {},
};

export default User;
