import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './home.css';


class Home extends Component{
    render() {
        return (
            <div id='home-container'>
                <div id='home-background'>
                </div>
                <div id='div-title'>
                    <h1 className="home-h1">宁大通信狗</h1>
                </div>
                <div id='div-links'>
                    <ul id="ul-option">
                        <li className="li-option"><Link className='a-option' to={'/blog'}>博客文章</Link></li>
                        <li className="li-option"><Link className='a-option' to={'/comment'}>留言社区</Link></li>
                        <li className="li-option"><Link className='a-option' to={'/resource'}>资源分享</Link></li>
                        <li className="li-option"><Link className='a-option' to={'/others'}>其他内容</Link></li>
                    </ul>
                </div>
                <div id='div-icp'>
                    <a id='a-icp' href="http://www.miitbeian.gov.cn/">渝ICP备18013708号</a>
                </div>
            </div>
        );
    }
}

export default Home;