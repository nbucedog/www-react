import React,{Component} from "react";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from "react-bootstrap/Image";
import Jumbotron from 'react-bootstrap/Jumbotron';
import getCookies from "../../utils/CookieTool";
import Controller from '../../request/controller';
import VisibilitySensor from 'react-visibility-sensor';

class Review extends Component{
    constructor(props){
        super(props);
        this.state={
            currentKey:null,
            data:null,
        }
    }

    reviewRequest=Controller.create("/review");
    reviewReplyRequest=Controller.create("/reviewReply");
    dataRequest=Controller.create(this.props.request);

    submit = (e)=>{
        e.preventDefault();
        let content = document.getElementById("review-content").value;
        let user={"id":getCookies().id,"username":getCookies().username};
        let data={
            "user":user,
            "content":content,
            "article":this.props.article?{"id":this.props.article}:null
        };
        this.reviewRequest.post(data).then(res=>{
            if(res.errcode<500){
                this.dataRequest.getAll({"articleId":this.props.article}).then(res1=>{
                    if(res1.errcode<500){
                        document.getElementById("review-content").value = "";
                        this.setState({
                            data:res1.data
                        })
                    }
                })
            }else {
                alert(res.errmsg);
            }
        })
    };

    loadReview = ()=>{
        this.dataRequest.getAll({"articleId":this.props.article}).then(res=>{
            if(res.errcode<500){
                this.setState({
                    data:res.data,
                    currentKey:null
                })
            }else {
                alert(res.errmsg);
            }
        })
    };

    submitReply = (e,reviewId,rUserId)=>{
        e.preventDefault();
        let content = document.getElementById("review-reply-"+this.state.currentKey).value;
        let user={"id":getCookies().id};
        let rUser={"id":rUserId};
        let review={"id":reviewId};
        let data={
            "user":user,
            "rUser":rUser,
            "content":content,
            "review":review
        };
        this.reviewReplyRequest.post(data).then(res=>{
            if(res.errcode<500){
                document.getElementById("review-reply-"+this.state.currentKey).value="";
                this.loadReview();
            }else {
                alert(res.errmsg);
            }
        })
    };

    showInput = (key)=>{
        let cookies = getCookies();
        if(!(cookies&&cookies.id&&cookies.nickname&&cookies.username)){
            return;
        }
        this.setState({
            currentKey:key
        })
    };

    reachBottom = (isVisible)=>{
        if(isVisible&&(!this.state.data)){
            this.loadReview()
        }
    };

    render() {
        let data = this.state.data;
        const textStyle={
            width:"100%",
            border:"1px solid #ced4da",
            borderRadius:"4px"
        };
        let cookies = getCookies();
        let commentArea=(
            <Jumbotron style={{padding:"1rem 1rem",marginBottom:".5rem"}}>
                <h5>登录后可以评论！</h5>
                <Button variant="primary" href="/login">登录</Button>
            </Jumbotron>
        );
        if(cookies&&cookies.id&&cookies.nickname&&cookies.username){
            commentArea=(
                <Row style={{paddingBottom:".4rem"}}>
                    <Col xs="auto" style={{paddingRight:"0"}}>
                        <Image alt="Crop" key="avatar" src={"https://www.nbucedog.com/api/avatar/"+cookies.username} roundedCircle style={{"width":"2rem","height":"2rem"}}/>
                    </Col>
                    <Col>
                        <Form onSubmit={this.submit}>
                            <textarea id="review-content" placeholder="你想说点什么吗" style={textStyle}/>
                            <Button variant="primary" type="submit">评论</Button>
                        </Form>
                    </Col>
                </Row>
            );
        }
        return(
            <Row className="justify-content-md-center">
                <Col lg="10">
                    <Card>
                        <Card.Header className="article-header">
                            {commentArea}
                        </Card.Header>
                        <ListGroup variant="flush">
                            {
                                data?
                                    (data.length!==0?
                                    data.map((review,key)=>(
                                        <ListGroup.Item className="article-content" key={key}>
                                            <Row>
                                                <Col xs="auto" style={{paddingRight:"0"}}>
                                                    <Image alt="Crop" key="avatar" src={"https://www.nbucedog.com/api/avatar/"+review.user.username} roundedCircle style={{"width":"2rem","height":"2rem"}}/>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col style={{paddingRight:"0"}}>
                                                            {review.user.nickname}：
                                                        </Col>
                                                        <Col xs="auto" style={{paddingLeft:"0"}}>
                                                            <span style={{color:"grey",fontSize:".85rem",display:"inline-block"}}>{review.date}</span>
                                                        </Col>
                                                    </Row>
                                                    <div style={{padding:".35rem 0",margin:".15rem 0",background:"#f9f9f9"}} onClick={()=>this.showInput(key)}>
                                                        <span style={{color:"#555",display:"inline-block"}}>
                                                            {review.content}
                                                        </span>
                                                    </div>
                                                    <Form onSubmit={(e)=>this.submitReply(e,review.id,review.user.id)} hidden={!(key===this.state.currentKey)}>
                                                        <textarea id={"review-reply-"+key} placeholder={"回复"+review.user.nickname} style={textStyle}/>
                                                        <Button variant="primary" type="submit">回复</Button>
                                                    </Form>
                                                    {
                                                        review.reviewReplyList&&review.reviewReplyList.length!==0?
                                                        review.reviewReplyList.map((reviewReply,key1)=>(
                                                            <div key={key1}>
                                                                <div  style={{background:"#f9f9f9",padding:".15rem 0"}} onClick={()=>this.showInput(key+"-"+key1)}>
                                                                    <span>{reviewReply.user.nickname}</span><strong style={{color:"#36648B"}}>@</strong><span>{reviewReply.rUser.nickname}：</span>
                                                                    <span style={{color:"#555",background:"#f9f9f9"}}>{reviewReply.content}</span>
                                                                </div>
                                                                <Form onSubmit={(e)=>this.submitReply(e,review.id,reviewReply.user.id)} hidden={!((key+"-"+key1)===this.state.currentKey)}>
                                                                    <textarea id={"review-reply-"+key+"-"+key1} placeholder={"回复"+reviewReply.user.nickname} style={textStyle}/>
                                                                    <Button variant="primary" type="submit">回复</Button>
                                                                </Form>
                                                            </div>
                                                        ))
                                                            :
                                                        null
                                                    }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                        :
                                    <div className="article-content">
                                        <Jumbotron style={{padding:"1rem 1rem",marginBottom:".5rem"}}>
                                            <p>来成为第一个评论的人吧！</p>
                                        </Jumbotron>
                                    </div>)
                                    :
                                <div className="article-content">
                                    <VisibilitySensor onChange={this.reachBottom}>
                                        <div style={{textAlign:"center"}}>
                                            <img src="https://www.nbucedog.com/loading.svg" alt="loading"/>
                                        </div>
                                    </VisibilitySensor>
                                </div>
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default Review;