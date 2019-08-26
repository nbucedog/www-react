import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import {IoMdTime,IoIosPerson} from 'react-icons/io';
import {FiThumbsUp,FiEye,FiMessageSquare} from 'react-icons/fi';
import MyFramework from '../../components/myFrameWork';
import './blog.css';
import Controller from '../../request/controller';
import Pagination from '../../components/pagination';
import getUrlParamByName from '../../utils/UrlTool';
import getCookies from '../../utils/CookieTool';

class Blog extends Component{
    constructor(props){
        super(props);
        document.title="博客文章 - 宁大通信狗";
        this.state={
            pageIndex:1,
            pageSize:5,
            total:0,
            data:null
        };
    }

    articlesRequest = Controller.create("/articles");

    async getArticlesByPage(pageIndex){
        let userId=getUrlParamByName("userId");
        let tagId=getUrlParamByName("tagId");
        const res = await this.articlesRequest.getAll({pageIndex:pageIndex-1,pageSize:this.state.pageSize,userId:userId,tagId:tagId});
        if(res.errcode>=500){
            return res.errmsg;
        }
        this.setState({
            errcode:res.errcode,
            errmsg:res.errmsg,
            data:res.data,
            total:res.total,
            pageIndex:pageIndex
        });
        sessionStorage.setItem("pageIndex",pageIndex);
        return false;
    }

    async componentWillMount(){
        let errmsg;
        let pageIndexStr=sessionStorage.getItem("pageIndex");
        if(getUrlParamByName("userId")||getUrlParamByName("tagId")){
            pageIndexStr="1";
        }
        if(pageIndexStr){
            let pageIndex=parseInt(pageIndexStr);
            errmsg =await this.getArticlesByPage(pageIndex);
        }else {
            errmsg =await this.getArticlesByPage(this.state.pageIndex);
        }
        if(errmsg)
            alert(errmsg);
        this.props.show();
    }

    onPageChange = (pageIndex)=>{
        this.getArticlesByPage(pageIndex).then(errmsg=>{
            if(errmsg)
                alert(errmsg)
        });
    };

    onEdit = (id)=>{
        this.props.history.push("/blog/editor/"+id);
    };

    render() {
        let articles=(
            <Row>
                没有文章，新建文章！
            </Row>
        );
        if(this.state.data&&this.state.total>0){
            let cookies = getCookies();
            let nickname = null;
            if(cookies&&cookies.nickname){
                nickname=cookies.nickname;
            }
            articles=(
                <Row className="justify-content-md-center">
                    {
                        this.state.data.map((item,key)=>(
                            <Col lg="10" key={key}>
                                <Card>
                                    <Card.Header>
                                        <Row>
                                            <Col>
                                                <Link to={"/blog/article/"+item.id} className="blog-a-title">{item.title}</Link>
                                            </Col>
                                            {
                                                item.nickname===nickname ?
                                                    <Col xs="auto" style={{paddingLeft:"0"}}>
                                                        <Button variant="outline-success" style={{height:"1.5rem",fontSize:"0.65rem",padding:"0 .75rem"}} onClick={()=>this.onEdit(item.id)}>编辑</Button>
                                                    </Col>
                                                    :
                                                    null
                                            }
                                        </Row>
                                        <Row>
                                        <Col className="blog-information1">
                                            <IoMdTime className="blog-information-icon"/><span className="blog-information-item">{item.date}</span>
                                            <IoIosPerson className="blog-information-icon"/><span className="blog-information-item">{item.nickname}</span>
                                        </Col>
                                        <Col className="blog-information2" xs="auto">
                                            <FiEye className="blog-information-icon"/><span className="blog-information-item">{item.views}</span>
                                            <FiThumbsUp className="blog-information-icon"/><span className="blog-information-item">{item.thumbs}</span>
                                            <FiMessageSquare className="blog-information-icon"/><span className="blog-information-item" style={{marginRight:"0"}}>{item.comments}</span>
                                        </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text variant="secondary">
                                            <Link to={"/blog/article/"+item.id} className="blog-a-text">{item.summary}</Link>
                                        </Card.Text>
                                        <div>
                                            {item.tagSet.map((tag,key)=>(
                                                <a key={key} href={"/blog?tagId="+tag.id} style={{display:"inline-block"}}><Badge pill variant={tag.color}>{tag.tag}</Badge></a>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            );
        }

        return(
            <div hidden={this.props.hidden}>
                <Container>
                    {articles}
                    <Row className="page-row">
                        <Pagination total={this.state.total} pageIndex={this.state.pageIndex} pageSize={this.state.pageSize} onPageChange={this.onPageChange}/>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default MyFramework("博客文章")(withRouter(Blog));