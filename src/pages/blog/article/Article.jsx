import React,{Component} from 'react';
import MarkDown from 'react-markdown/lib/with-html';
import CodeBlock from '../../../components/codeBlock'
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {IoMdTime,IoIosPerson} from 'react-icons/io';
import {FiThumbsUp,FiEye,FiMessageSquare} from 'react-icons/fi';
import MyFramework from '../../../components/myFrameWork';
import '../../../request/controller';
import Controller from "../../../request/controller";
import '../blog.css';
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom';
import getCookies from "../../../utils/CookieTool";
import Review from '../../../components/review';


class Article extends Component{
    constructor(props){
        super(props);
        this.state={
            data:{
                user:{
                    nickname:""
                },
                thumbs:0,
                views:0,
                content:"",
                reviewSet:[],
                tagSet:[]
            }
        }
    }

    articleRequest = Controller.create("/article");

    async componentWillMount(){
        if(this.props.match.params.id){
            let id=this.props.match.params.id;
            const res = await this.articleRequest.getAll({id});
            if(res.errcode>=500){
                return
            }
            document.title=res.data.title+" - 宁大通信狗";
            this.setState({
                errcode:res.errcode,
                errmsg:res.errmsg,
                data:res.data
            });
        }
        this.props.show();
    }

    onEdit = (id)=>{
        console.log(id);
        this.props.history.push("/blog/editor/"+id);
    };

    render() {
        const cookies = getCookies();
        let username=null;
        if(cookies&&cookies.username){
            username=cookies.username;
        }
        return(
            <Col lg="8" {...this.props}>
                <Card>
                    <Card.Header className="article-header">
                        <Row>
                            <Col>
                                <h5 style={{"display":"inline"}}>{this.state.data.title}</h5>
                            </Col>
                            {
                                this.state.data.user.username===username ?
                                    <Col xs="auto" style={{paddingLeft:"0"}}>
                                        <Button variant="outline-success" style={{height:"1.5rem",fontSize:"0.65rem",padding:"0 .75rem"}} onClick={()=>this.onEdit(this.state.data.id)}>编辑</Button>
                                    </Col>
                                    :
                                    null
                            }
                        </Row>
                        {this.state.data.tagSet.map((tag,key)=>(
                            <Badge key={key} pill variant={tag.color}>{tag.tag}</Badge>
                        ))}
                        <Row>
                            <Col className="blog-information1">
                                <IoMdTime className="blog-information-icon"/><span className="blog-information-item">{this.state.data.date}</span>
                                <IoIosPerson className="blog-information-icon"/><span className="blog-information-item">{this.state.data.user.nickname}</span>
                            </Col>
                            <Col className="blog-information2" xs="auto">
                                <FiEye className="blog-information-icon"/><span className="blog-information-item">{this.state.data.views}</span>
                                <FiThumbsUp className="blog-information-icon"/><span className="blog-information-item">{this.state.data.thumbs}</span>
                                <FiMessageSquare className="blog-information-icon"/><span className="blog-information-item" style={{marginRight:"0"}}>{this.state.data.reviewSet.length}</span>
                            </Col>
                        </Row>
                    </Card.Header>
                    <div className="article-content">
                        <MarkDown className="result" source={this.state.data.content} renderers={{code:CodeBlock}}/>
                    </div>
                </Card>
                <Review article={this.state.data.id} request="/review"/>
            </Col>
        )
    }
}
export default MyFramework("文章内容",true)(withRouter(Article));