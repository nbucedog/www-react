import React,{Component} from "react";
import MyFramework from '../../components/myFrameWork';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ImageCrop from '../../components/imageCrop';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import './login.css';
import getUrlParamByName from '../../utils/UrlTool';
import Controller from '../../request/controller';

class Login extends Component{
    constructor(props){
        super(props);
        document.title="登录注册 - 宁大通信狗";
        this.state={
            tab:"login",
            avatar:null
        }
    }
    userRequest = Controller.create("/user");
    loginRequest = Controller.create("/login");
    componentWillMount() {
        let tab = getUrlParamByName("tab");
        if(tab!==null && tab!==this.state.tab){
            this.setState({
                tab:tab
            })
        }
        this.props.show();
    }

    getAvatar = (imgBlob)=>{
        this.setState({
            avatar:imgBlob
        });
    };

    signUp = (e)=>{
        e.preventDefault();
        let username = document.getElementById("formSignUpUsername").value;
        let password = document.getElementById("formSignUpPassword").value;
        let confirm = document.getElementById("formSignUpConfirm").value;
        if(password!==confirm){
            alert("密码不一致");
            return;
        }
        let nickname = document.getElementById("formSignUpNickname").value;
        let sex;
        for (let item of document.getElementsByName("sex")){
            if(item.checked===true){
                sex = item.value;
            }
        }
        let avatar = this.state.avatar;
        let phone = document.getElementById("formSignUpPhone").value;
        // let email = document.getElementById("formSignUpEmail").value;
        let formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);
        formData.append("nickname",nickname);
        formData.append("sex",sex);
        formData.append("phone",phone);
        // formData.append("email",email);
        formData.append("file",avatar);
        this.userRequest.post(formData).then(res=>{
            alert(res.errmsg)
        });
    };

    login = (e)=>{
        let username = document.getElementById("formLoginUsername").value;
        let password = document.getElementById("formLoginPassword").value;
        let data ={"username":username,"password":password,"remember-me":true};
        this.loginRequest.postForm(data).then(res=>{
            alert(res.errmsg);
            if(res.errcode<400){
                window.history.back()
            }
        });
        e.preventDefault();
    };

    render() {
        const redStar={
            color:"red"
        };
        return(
            <div hidden={this.props.hidden}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg="10" style={{"paddingBottom":"2rem"}}>
                            <Tabs defaultActiveKey={this.state.tab}>
                                <Tab eventKey="login" title="登录">
                                    <Row className="justify-content-md-center">
                                        <Col lg="6">
                                            <Form onSubmit={this.login}>
                                                <Form.Group controlId="formLoginUsername">
                                                    <Form.Label>用户名</Form.Label>
                                                    <Form.Control type="text" placeholder="Username"  required={true} maxLength="10"/>
                                                </Form.Group>
                                                <Form.Group controlId="formLoginPassword">
                                                    <Form.Label>密&emsp;码</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" required={true}/>
                                                </Form.Group>
                                                <Button variant="primary" type="submit">登录</Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="signUp" title="注册">
                                    <Row className="justify-content-md-center">
                                        <Col lg="6">
                                            <Form onSubmit={this.signUp}>
                                                <Form.Group controlId="formSignUpUsername">
                                                    <Form.Label>邮&emsp;箱<span style={redStar}>*</span></Form.Label>
                                                    <Form.Control type="email" placeholder="Email address" required={true} maxLength="10"/>
                                                </Form.Group>
                                                <Form.Group controlId="formSignUpPassword">
                                                    <Form.Label>密&emsp;码<span style={redStar}>*</span></Form.Label>
                                                    <Form.Control type="password" placeholder="Password" required={true}/>
                                                </Form.Group>
                                                <Form.Group controlId="formSignUpConfirm">
                                                    <Form.Label>确认密码<span style={redStar}>*</span></Form.Label>
                                                    <Form.Control type="password" placeholder="Confirm the password" required={true}/>
                                                </Form.Group>
                                                <Form.Group controlId="formSignUpNickname">
                                                    <Form.Label>昵&emsp;称<span style={redStar}>*</span></Form.Label>
                                                    <Form.Control type="text" placeholder="Nickname" required={true} maxLength="10"/>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>头&emsp;像</Form.Label>
                                                    <ImageCrop getAvatar={this.getAvatar}/>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>性&emsp;别</Form.Label><br/>
                                                    <Form.Label><input type="radio" name="sex" value="male" defaultChecked="defaultChecked"/>&nbsp;男</Form.Label>&emsp;
                                                    <Form.Label><input type="radio" name="sex" value="female"/>&nbsp;女</Form.Label>
                                                </Form.Group>
                                                <Form.Group controlId="formSignUpPhone">
                                                    <Form.Label>电话号码</Form.Label>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control placeholder="Phone number" type="number" maxLength="13"/>
                                                        <InputGroup.Append><Button variant="info">验证</Button></InputGroup.Append>
                                                        <div style={{"width":"100%","paddingLeft":"5px"}}>
                                                            <Form.Text className="text-muted">We'll never share your phone number with anyone else.</Form.Text>
                                                        </div>
                                                    </InputGroup>
                                                </Form.Group>
                                                {/*<Form.Group controlId="formSignUpEmail">*/}
                                                    {/*<Form.Label>邮&emsp;箱</Form.Label>*/}
                                                    {/*<InputGroup className="mb-3">*/}
                                                        {/*<Form.Control placeholder="Email address" type="email"/>*/}
                                                        {/*<InputGroup.Append><Button variant="info">验证</Button></InputGroup.Append>*/}
                                                    {/*</InputGroup>*/}
                                                {/*</Form.Group>*/}
                                                <Form.Group>
                                                    <Form.Check type="checkbox" label="我已不管你有没有阅读协议" defaultChecked="defaultChecked"/>
                                                </Form.Group>
                                                <Button variant="primary" type="submit">注册</Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default MyFramework("登录注册")(Login);