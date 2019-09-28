import React,{Component} from 'react';
import MyNavBar from '../myNavBar';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import isMobile from "../../utils/AgentTool";
import Image from "react-bootstrap/Image";
// import PCNavBar from '../myNavBar/PCNavBar';
// import PropTypes from 'prop-types';

const loadingStyle={
    width:'100%',
    textAlign:'center',
    paddingTop:'4rem'
};
export default (title,ex)=>ColMain=> class MyFramework extends Component{
    constructor(props){
        super(props);
        this.state={
            hide:true,
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
                link: "/others",
                title: "其他内容"
            }]
        }
    }
    hide = ()=>{
        this.setState({
            hide:true
        });
    };
    show = ()=>{
        this.setState({
            hide:false
        })
    };
    render() {
        const minHeight = window.innerHeight+"px";
        const footerHeight = "5.7rem";
        return(
            <div>
                <MyNavBar title={title} linkArr={this.state.linkArr}/>
                {/*<PCNavBar linkArr={this.state.linkArr}/>*/}
                <Container fluid={true} style={{}}>
                    <Row className="justify-content-md-center">
                        <Col lg={ex?"8":"12"} style={loadingStyle} hidden={!this.state.hide}>
                            <img src="https://www.nbucedog.com/loading.svg" alt="loading"/>
                        </Col>
                        <ColMain hide={this.hide} show={this.show} hidden={this.state.hide} style={{minHeight:minHeight,paddingTop: "4rem",paddingBottom:footerHeight}}/>
                        {
                            (isMobile()||(!ex))?
                                null//不显示广告
                                :
                                <Col lg="3" hidden={isMobile()||(!ex)} style={{paddingTop:"4rem"}}>
                                    <Image src="https://www.nbucedog.com/extension.jpeg" alt="Finland" style={{width:"25%",position:"fixed"}}/>
                                </Col>
                        }
                    </Row>
                </Container>
                <Row className="justify-content-md-center" style={{color:"#999",margin:"-"+footerHeight+" 0 0 0",height:footerHeight}} hidden={this.state.hide}>
                    <Col lg="8" style={{textAlign: "center",paddingBottom:"1rem",fontSize:".8rem"}}>
                        <div style={{paddingTop:".75rem",borderTop:"1px solid #eee"}}>
                            Copyright © 2019 宁大通信狗
                        </div>
                        <div>
                            友情链接：<a href="http://www.tangyida.top" style={{color:"#999"}}>我是唐益达</a>
                        </div>
                        <div>
                            渝ICP备18013708号
                        </div>
                    </Col>
                    <Col lg="3"/>
                </Row>
            </div>
        )
    }
}
