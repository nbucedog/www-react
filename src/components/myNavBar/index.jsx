import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import {IoIosArrowBack,IoIosLock,IoIosPerson} from 'react-icons/io';
import './index.css';

class MyNavBar extends Component{
    goBack = ()=>{
        window.history.back()
    };
    render() {
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" id="blog">
                <Navbar.Brand onClick={this.goBack}><IoIosArrowBack/></Navbar.Brand>
                {window.outerWidth >= window.outerHeight ? null: <Navbar.Text style={{fontWeight:"bold"}}>{this.props.title}</Navbar.Text>}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            this.props.linkArr.map((item,key)=>(
                                <Nav.Link key={key} href={item.link} active={item.title===this.props.title}>{item.title}</Nav.Link>
                            ))
                        }
                    </Nav>
                    {
                        window.outerWidth >= window.outerHeight?
                            <Form inline hidden={false}>
                                <InputGroup className="myNavBar-input">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><IoIosPerson/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="用户名" aria-label="Username" aria-describedby="basic-addon1"/>
                                </InputGroup>
                                <InputGroup className="myNavBar-input">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><IoIosLock/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="password" placeholder="密&emsp;码" aria-label="Username" aria-describedby="basic-addon1"/>
                                </InputGroup>
                                <Button className="myNavBar-input" variant="outline-primary">登录</Button>
                                <Button className="myNavBar-input" variant="outline-success">注册</Button>
                            </Form>
                            :
                            <div id="myNavBar-login-mo">
                                <Link to={"#"}>登录</Link>
                                <span>/</span>
                                <Link to={"#"}>注册</Link>
                            </div>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
MyNavBar.defaultProps = {
    linkArr:[{
                link: "/blog",
                title: "博客文章",
            },{
                link: "/comment",
                title: "留言社区"
            },{
                link: "/app",
                title: "软件分享"
            }]
};
MyNavBar.protoTypes = {
    linkArr:PropTypes.array.isRequired
};
export default MyNavBar;