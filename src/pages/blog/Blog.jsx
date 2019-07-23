import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import {IoMdTime,IoIosPerson} from 'react-icons/io';
import {FiThumbsUp,FiEye,FiMessageSquare} from 'react-icons/fi';
import MyFramework from '../../components/myFrameWork';
import './blog.css';
import Controller from '../../request/controller';

class Blog extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    articlesRequest = Controller.create("/articles");

    async componentDidMount(){
        const res = await this.articlesRequest.getAll();
        if(res.errcode>=500){
            return;
        }
        this.setState({
            errcode:res.errcode,
            errmsg:res.errmsg,
            data:res.data
        });
    }

    render() {
        return(
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        {
                            this.state.data.map((item,key)=>(
                                <Col lg="10" key={key}>
                                    <Card>
                                        <Card.Header>
                                            <Link to={"/blog/article?id="+item.id} className="blog-a-title">{item.title}</Link>
                                            <Row>
                                            <Col className="blog-information1">
                                                <IoMdTime className="blog-information-icon"/><span className="blog-information-item">{item.date}</span>
                                                <IoIosPerson className="blog-information-icon"/><span className="blog-information-item">{item.nickname}</span>
                                            </Col>
                                            <Col className="blog-information2" xs="auto">
                                                <FiThumbsUp className="blog-information-icon"/><span className="blog-information-item">{item.thumbs}</span>
                                                <FiEye className="blog-information-icon"/><span className="blog-information-item">{item.views}</span>
                                                <FiMessageSquare className="blog-information-icon"/><span className="blog-information-item">{item.comments}</span>
                                            </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text variant="secondary">
                                                <Link to={"/blog/article?id="+item.id} className="blog-a-text">{item.summary}</Link>
                                            </Card.Text>
                                            <div>
                                                {item.tagSet.map((tag,key)=>(
                                                    <Badge key={key} pill variant={tag.color}>{tag.tag}</Badge>
                                                ))}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}
export default MyFramework("博客文章")(Blog);