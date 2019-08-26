import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import {NavLink,withRouter} from "react-router-dom";
import {IoIosArrowBack,IoIosLock,IoIosPerson} from 'react-icons/io';
import './index.css';
import Controller from "../../request/controller";
import getCookies from '../../utils/CookieTool';
import Image from "react-bootstrap/Image";

class PCNavBar extends Component{
    loginRequest = Controller.create("/login");
    logoutRequest = Controller.create("/logout");

    goBack = ()=>{
        // window.history.back()
        this.props.history.goBack();
    };
    login = ()=>{
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if(username==="" || password===""){
            alert("账号或密码不能为空");
            return;
        }
        let data ={"username":username,"password":password,"remember-me":true};
        this.loginRequest.postForm(data).then(res=>{
            alert(res.errmsg);
            if(res.errcode<400){
                window.location.reload()
            }
        });
    };

    logout = ()=>{
        this.logoutRequest.getAll().then(res=>{
            alert(res.errmsg);
            if(res.errcode<400){
                window.location.reload()
            }
        });
    };

    render() {
        let pcLoginArea=null;//电脑登录
        let cookies = getCookies();
        let dropdownItem=null;//下拉栏提取出来，统一管理
        if(cookies&&cookies.id){
            dropdownItem = (
            <div>
                <Dropdown.Item eventKey="1" href={"/blog?userId="+cookies.id}>我的文章</Dropdown.Item>
                <Dropdown.Item eventKey="2" href="/blog/editor">新建文章</Dropdown.Item>
                <Dropdown.Item eventKey="3">消息提醒</Dropdown.Item>
                <Dropdown.Item eventKey="4">我的账号</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="5" onClick={this.logout}>退出登录</Dropdown.Item>
            </div>
        );
        }
        if(cookies&&cookies.id&&cookies.nickname&&cookies.username){
            pcLoginArea=(
                <Nav>
                    {/*<NavLink to={"#"} style={{"height":"1.5rem"}}>*/}
                        <Image alt="Crop" key="avatar" src={"https://www.nbucedog.com/api/avatar/"+cookies.username} roundedCircle style={{"width":"1.5rem","height":"1.5rem"}}/>
                    {/*</NavLink>*/}
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle split variant="" id="dropdown-custom-2" style={{"height":"1.5rem","padding":"0 .75rem","color":"#ccc"}}/>
                        <Dropdown.Menu className="super-colors" style={{"left":"-5.25rem"}}>
                            {dropdownItem}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            )
        }else {
            pcLoginArea=(
                <Form inline hidden={false}>
                    <InputGroup className="myNavBar-input">
                        <InputGroup.Prepend>
                            <InputGroup.Text><IoIosPerson/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="username" placeholder="用户名" aria-label="Username" aria-describedby="basic-addon1"/>
                    </InputGroup>
                    <InputGroup className="myNavBar-input">
                        <InputGroup.Prepend>
                            <InputGroup.Text><IoIosLock/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="password" type="password" placeholder="密&emsp;码" aria-label="Username" aria-describedby="basic-addon1"/>
                    </InputGroup>
                    <Button className="myNavBar-input" variant="outline-primary" onClick={this.login}>登录</Button>
                    <Button className="myNavBar-input" variant="outline-success" href="/login?tab=signUp">注册</Button>
                </Form>
            );
        }
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" id="blog">
                <Navbar.Brand onClick={this.goBack}><IoIosArrowBack/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            this.props.linkArr.map((item,key)=>(
                                <NavLink to={item.link} key={key} className="nav-link">{item.title}</NavLink>
                            ))
                        }
                    </Nav>
                    {pcLoginArea}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
PCNavBar.defaultProps = {
    linkArr:[{
                link: "/blog",
                title: "博客文章",
            },{
                link: "/comment",
                title: "留言社区"
            },{
                link: "/resource",
                title: "资源分享"
            },{
                link:"/others",
                title:"其他内容"
            }]
};
PCNavBar.protoTypes = {
    linkArr:PropTypes.array.isRequired
};
export default withRouter(PCNavBar);