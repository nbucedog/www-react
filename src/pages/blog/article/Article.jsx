import React,{Component} from 'react';
import MarkDown from 'react-markdown/with-html';
import CodeBlock from '../../../components/codeBlock'
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {IoMdTime,IoIosPerson} from 'react-icons/io';
import {FiThumbsUp,FiEye,FiMessageSquare} from 'react-icons/fi';
import MyFramework from '../../../components/myFrameWork';
import '../../../request/controller';
import Controller from "../../../request/controller";
import './article.css';

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
                commentList:[],
                tagSet:[]
            }
        }
    }

    articleRequest = Controller.create("/article");

    getQueryVariable = (variable) =>{
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++){
            let pair = vars[i].split("=");
            if(pair[0] === variable){
                return pair[1];
            }
        }
        return false;
    };

    async componentWillMount(){
        const id = this.getQueryVariable("id");
        const res = await this.articleRequest.getAll({id});
        if(res.errcode>=500){
            return;
        }
        this.setState({
            errcode:res.errcode,
            errmsg:res.errmsg,
            data:res.data
        })
    }

    render() {
        return(
            <div className="result-pane">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg="10">
                            <Card>
                                <Card.Header className="article-header">
                                    <h5>{this.state.data.title}</h5>
                                    {this.state.data.tagSet.map((tag,key)=>(
                                        <Badge key={key} pill variant={tag.color}>{tag.tag}</Badge>
                                    ))}
                                    <Row>
                                    <Col className="blog-information1">
                                        <IoMdTime className="blog-information-icon"/><span className="blog-information-item">{this.state.data.date}</span>
                                        <IoIosPerson className="blog-information-icon"/><span className="blog-information-item">{this.state.data.user.nickname}</span>
                                    </Col>
                                    <Col className="blog-information2" xs="auto">
                                        <FiThumbsUp className="blog-information-icon"/><span className="blog-information-item">{this.state.data.thumbs}</span>
                                        <FiEye className="blog-information-icon"/><span className="blog-information-item">{this.state.data.views}</span>
                                        <FiMessageSquare className="blog-information-icon"/><span className="blog-information-item">{this.state.data.commentList.length}</span>
                                    </Col>
                                    </Row>
                                </Card.Header>
                                <div className="article-content">
                                    <MarkDown className="result" source={this.state.data.content} renderers={{code:CodeBlock}}/>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default MyFramework("文章")(Article);