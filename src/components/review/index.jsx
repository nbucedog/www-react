import React,{Component} from "react";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from "react-bootstrap/Image";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Modal from 'react-bootstrap/Modal';
import getCookies from "../../utils/CookieTool";
import Controller from '../../request/controller';
import VisibilitySensor from 'react-visibility-sensor';

const textStyle={
    width:"100%",
    border:"1px solid #ced4da",
    borderRadius:"4px"
};

class Review extends Component{
    constructor(props){
        super(props);
        this.state={
            data:null,
            total:0,
            modalShow:false,
            deleteModalShow:false,
            rNickname:"空",
            reviewReply:{
                content:"",
                user:{
                    nickname: ""
                }
            }
        }
    }

    reviewRequest=Controller.create("/review");
    reviewReplyRequest=Controller.create("/reviewReply");
    dataRequest=Controller.create(this.props.request);

    submit = (e)=>{
        e.preventDefault();
        let button = e.currentTarget.button;
        button.disabled=true;
        let content = document.getElementById("review-content").value;
        const cookies = getCookies();
        let user={"id":cookies.id,"username":cookies.username};
        let data={
            "user":user,
            "content":content,
            "article":this.props.article?{"id":this.props.article}:null
        };
        this.reviewRequest.post(data).then(res=>{
            if(res.errcode<400){
                this.dataRequest.getAll({"articleId":this.props.article}).then(res1=>{
                    if(res1.errcode<400){
                        document.getElementById("review-content").value = "";
                        this.setState({
                            data:res1.data,
                            total:res1.data.length
                        })
                    }else {
                        alert(res1.errmsg);
                    }
                    button.disabled=false;
                })
            }else {
                alert(res.errmsg);
                button.disabled=false;
            }
        })
    };

    loadReview = ()=>{
        this.dataRequest.getAll({"articleId":this.props.article}).then(res=>{
            if(res.errcode<400){
                this.setState({
                    data:res.data,
                    total:res.data.length,
                    modalShow:false,
                    deleteModalShow:false
                })
            }else {
                alert(res.errmsg);
            }
        })
    };

    submitReply = (e)=>{
        e.preventDefault();
        let button = e.currentTarget.button;
        button.disabled=true;
        let content = e.currentTarget.textarea.value;
        let user={"id":getCookies().id};
        let rUser={"id":this.state.reviewReply.user.id};
        let review={"id":this.state.reviewId};
        let data={
            "user":user,
            "rUser":rUser,
            "content":content,
            "review":review
        };
        this.reviewReplyRequest.post(data).then(res=>{
            if(res.errcode<400){
                this.loadReview();
            }else {
                alert(res.errmsg);
            }
            // button.disabled=false;
        })
    };

    deleteReview = (e) =>{
        let button = e.currentTarget;
        button.disabled=true;
        let formData = new FormData();
        formData.append("id",this.state.reviewReply.id);
        if(this.state.reviewReply.review){
            this.reviewReplyRequest.delete(formData).then(res=>{
                if(res.errcode<400){
                    this.loadReview();
                }else {
                    alert(res.errmsg);
                }
                // button.disabled=false;
            })
        }else {
            this.reviewRequest.delete(formData).then(res=>{
                if(res.errcode<400){
                    this.loadReview();
                }else {
                    alert(res.errmsg);
                }
                // button.disabled=false;
            })
        }
    };

    handleModalShow = (reviewId,reviewReply)=>{
        const cookies = getCookies();
        if(!(cookies&&cookies.id&&cookies.nickname&&cookies.username)){
            return;
        }
        if(parseInt(cookies.id) === reviewReply.user.id){
            this.setState({
                deleteModalShow:true,
                reviewReply:reviewReply
            })
        }else {
            this.setState({
                modalShow:true,
                reviewId:reviewId,
                reviewReply:reviewReply
            });
        }
    };

    handleModalClose = ()=>{
        this.setState({
            modalShow:false
        })
    };

    handleDeleteModalClose = ()=>{
        this.setState({
            deleteModalShow:false
        })
    };

    reachBottom = (isVisible)=>{
        if(isVisible&&(!this.state.data)){
            this.loadReview()
        }
    };

    render() {
        let replyModal = (
            <Modal show={this.state.modalShow} onHide={this.handleModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>回复 {this.state.reviewReply.user.nickname}:</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e)=>this.submitReply(e)}>
                    <Modal.Body>
                        <textarea placeholder="点击此处回复" style={textStyle} id="modal-textarea" name="textarea" required={true}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>取消</Button>
                        <Button variant="primary" type="submit" name="button">回复</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
        let deleteModal = (
            <Modal show={this.state.deleteModalShow} onHide={this.handleDeleteModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>删除此条评论？</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.reviewReply.content}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleDeleteModalClose}>取消</Button>
                    <Button variant="danger" name="button" onClick={this.deleteReview}>删除</Button>
                </Modal.Footer>
            </Modal>
        );
        const cookies = getCookies();
        let data = this.state.data;
        let total = this.state.total;
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
                            <textarea id="review-content" placeholder="你想说点什么吗" style={textStyle} required={true}/>
                            <Button variant="primary" type="submit" name="button">评论</Button>
                        </Form>
                    </Col>
                </Row>
            );
        }
        return(
            <Card  style={{marginBottom: "3rem"}}>
                {replyModal}
                {deleteModal}
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
                                            <Row>
                                                <Col>
                                                <Image alt="Crop" key="avatar" src={"https://www.nbucedog.com/api/avatar/"+review.user.username} roundedCircle style={{"width":"2.2rem","height":"2.2rem"}}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col style={{fontSize:".75rem",textAlign:"center"}}>
                                                    {total-key}楼
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col  style={{paddingLeft:".5rem",paddingBottom:".15rem"}}>
                                            <Row>
                                                <Col style={{paddingRight:"0"}}>
                                                    {review.user.nickname}：
                                                </Col>
                                                <Col xs="auto" style={{paddingLeft:"0"}}>
                                                    <span style={{color:"grey",fontSize:".85rem",display:"inline-block"}}>{review.date}</span>
                                                </Col>
                                            </Row>
                                            <div style={{padding:".35rem .1rem .35rem .5rem",margin:".15rem 0",background:"#f9f9f9"}} onClick={()=>this.handleModalShow(review.id,review)}>
                                                <span style={{color:"#555",display:"inline-block"}}>
                                                    {review.content}
                                                </span>
                                            </div>
                                            {
                                                review.reviewReplyList&&review.reviewReplyList.length!==0?
                                                review.reviewReplyList.map((reviewReply,key1)=>(
                                                    <div key={key1}>
                                                        <div  style={{background:"#f9f9f9",padding:".15rem .1rem .15rem .5rem"}} onClick={()=>this.handleModalShow(review.id,reviewReply)}>
                                                            <span>{reviewReply.user.nickname}</span><strong style={{color:"#36648B"}}>@</strong><span>{reviewReply.rUser.nickname}：</span>
                                                            <span style={{color:"#555",background:"#f9f9f9"}}>{reviewReply.content}</span>
                                                        </div>
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
        )
    }
}
export default Review;