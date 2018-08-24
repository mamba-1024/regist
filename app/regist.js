import React from "react";
import styles from "./regist.less";

const reg = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;

const send_sms = "http://api.bitcfans.com/user/send-sms"; // 发送验证码 post
const register = "http://api.bitcfans.com/user/register"; // 注册 post

export default class Regist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "", // 手机号
            password: "", // 密码
            // isPassword: "", // 确认密码
            nickname: "", // 昵称
            invite: "", // 邀请码
            code: "" // 验证码 发送验证码时 type = 1
        };
    }

    handleClick = e => {
        const { username } = this.state;
        if (!username) {
            // 如果手机号为空的话不发送
            alert("请输入手机号码");
            return false;
        }
        const url = send_sms;
        const params = {
            phone: "",
            type: 1
        };

        // 发送请求
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                phone: "",
                type: 1
            })
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log("jsonData --->", jsonData);
            })
            .catch(error => {
                console.log("jsonData error --->", error);
                alert(error);
            });
    };

    onChange = (e, key) => {
        const value = e.target.value;

        this.setState({
            [key]: value
        });
    };

    handleCommit = () => {
        const {
            nickname,
            password,
            username,
            invite,
            // isPassword,
            code
        } = this.state;

        if (!nickname) {
            alert("请输入昵称");
            return false;
        }
        if (!username) {
            alert("请输入手机号");
            return false;
        }
        if (!code) {
            alert("请输入验证码");
            return false;
        }
        if (!password) {
            alert("请输入密码");
            return false;
        }
        if (!reg.test(password)) {
            alert("密码格式不正确");
            return;
        }

        const url = register;

        // 发送请求
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                nickname: nickname,
                invite: invite,
                code: code
            })
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log("jsonData --->", jsonData);
            })
            .catch(error => {
                console.log("jsonData error --->", error);
                alert(error);
            });
    };

    render() {
        const {
            nickname,
            password,
            username,
            invite,
            // isPassword,
            code
        } = this.state;

        return (
            <div>
                <div className={styles.title}>注册</div>
                <div className={styles.item_line}>
                    <span className={styles.name} />
                    <input
                        type="text"
                        placeholder="昵称"
                        value={nickname}
                        onChange={e => this.onChange(e, "nickname")}
                    />
                </div>
                <div className={styles.item_line}>
                    <span className={styles.mobile} />
                    <input
                        type="text"
                        placeholder="手机号"
                        value={username}
                        onChange={e => this.onChange(e, "username")}
                    />
                </div>
                <div className={styles.item_line}>
                    <span className={styles.reg_code} />
                    <input
                        type="text"
                        placeholder="验证码"
                        value={code}
                        onChange={e => this.onChange(e, "code")}
                    />
                    <a className={styles.get_code} onClick={this.handleClick}>
                        获取验证码
                    </a>
                </div>
                <div className={styles.item_line}>
                    <span className={styles.password} />
                    <input
                        type="password"
                        placeholder="密码"
                        value={password}
                        onChange={e => this.onChange(e, "password")}
                    />
                </div>
                {/* <div className={styles.item_line}>
          <span className={styles.password} />
          <input
            type="password"
            placeholder="确认密码"
            value={isPassword}
            onChange={e => this.onChange(e, "isPassword")}
          />
        </div> */}
                <div className={styles.item_line}>
                    <span className={styles.add_user} />
                    <input
                        type="text"
                        placeholder="邀请码(选填)"
                        value={invite}
                        onChange={e => this.onChange(e, "invite")}
                    />
                </div>
                <div className={styles.desc}>
                    *密码长度6-20，必须包含数字+字母+符号
                </div>
                <div className={styles.registBtn}>
                    <button onClick={this.handleCommit}>注册</button>
                </div>
            </div>
        );
    }
}
