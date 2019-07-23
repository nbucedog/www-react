import React,{Component} from 'react';
import MarkDown from 'react-markdown/with-html';
import MyFrameWork from '../../../components/myFrameWork';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from"react-bootstrap/Button";
import CodeBlock from "../../../components/codeBlock";
import './editor.css';
import Controller from "../../../request/controller";

class Editor extends Component{
    constructor(props){
        super(props);
        this.state={
            id:2,
            title:"",
            summary:"",
            tagSet:[],
            content:""
        }
    }

    articleRequest = Controller.create("/article");

    onTitleChange = (e) =>{
        this.setState({
            title:e.currentTarget.value
        })
    };
    onSummaryChange = (e) =>{
        this.setState({
            summary:e.currentTarget.value
        })
    };
    onTagSetChange = (e) =>{
        this.setState({
            tagSet:e.currentTarget.value
        })
    };
    onContentChange = (e) => {
        this.setState({
            content:e.currentTarget.value
        })
    };

    getSubmitJson = ()=>{
        return {
            "id":this.state.id,
            "title":this.state.title,
            "summary":this.state.summary,
            // "tagSet":this.state.tagSet,
            "content":this.state.content
        };
    };

    submit = (publish)=>{
        let submitJson = this.getSubmitJson();
        submitJson["publish"]=publish;
        console.log(submitJson);
        if(submitJson["id"]===undefined){
            this.articleRequest.postJson(submitJson)
        }else {
            this.articleRequest.putJson(submitJson)
        }
    };
    cancelRelease = ()=>{

    };

    render() {
        return(
            <div className="editor-container">
                <Row>
                    <Col xs="auto">
                        标题:
                    </Col>
                    <Col>
                        <input className="editor-text-input" type="text" placeholder="点击输入标题，最多16个字" onChange={this.onTitleChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto">
                        摘要:
                    </Col>
                    <Col>
                        <textarea className="editor-text-input" placeholder="点击输入摘要，最多50个字" onChange={this.onSummaryChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto">
                        标签:
                    </Col>
                    <Col>
                        <input className="editor-text-input" type="text" placeholder="最多添加四个，最少添加一个，多个标签用&隔开" onChange={this.onTagSetChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <textarea className="editor-textarea" onChange={this.onContentChange} placeholder="点击此处开始编辑"/>
                    </Col>
                    <Col xs="6">
                        <div>
                            <MarkDown className="result editor-result" source={this.state.content} renderers={{code:CodeBlock}}/>
                        </div>
                    </Col>
                </Row>
                <Button className="myNavBar-input" variant="outline-primary" onClick={()=>this.submit(true)}>保存并发布</Button>
                <Button className="myNavBar-input" variant="outline-success" onClick={()=>this.submit(false)}>保存草稿</Button>
                <Button className="myNavBar-input" variant="outline-danger" onClick={this.cancelRelease}>取消发布</Button>
            </div>
        )
    }
}
export default MyFrameWork("文章编辑")(Editor)