import React,{Component} from 'react';
import MarkDown from 'react-markdown/lib/with-html';
import MyFrameWork from '../../../components/myFrameWork';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from"react-bootstrap/Button";
import CodeBlock from "../../../components/codeBlock";
import './editor.css';
import Controller from "../../../request/controller";
import getCookies from '../../../utils/CookieTool';
import {withRouter} from 'react-router-dom';

class Editor extends Component{
    constructor(props){
        super(props);
        document.title="文章编辑 - 宁大通信狗";
        this.state={
            id:null,
            userId:null,
            title:"",
            summary:"",
            tagSet:[{
                "tag":"机器学习"
            },{
                "tag":"神经网络"
            },{
                "tag":"深度学习"
            }],
            content:"",
            tags:""
        }
    }

    articleRequest = Controller.create("/article");

    async componentDidMount() {
        const cookies = getCookies();
        if(this.props.match.params.id&&cookies&&cookies.id&&cookies.username){
            // console.log("params id:"+this.props.match.params.id);
            let id=this.props.match.params.id;
            let res = await this.articleRequest.getAll({id});
            let tags="";
            if(res&&res.data&&res.data.tagSet&&res.data.title&&res.data.summary&&res.data.content){
                tags=res.data.tagSet[0].tag;
                for (let i=1;i<res.data.tagSet.length;i++){
                    tags=tags+","+res.data.tagSet[i].tag
                }
                this.setState({
                    id:id,
                    userId:cookies.id,
                    username:cookies.username,
                    title:res.data.title,
                    summary:res.data.summary,
                    tagSet:res.data.tagSet,
                    content:res.data.content,
                    tags:tags
                });
            }
        }else if(cookies&&cookies.id&&cookies.username){
            this.setState({
                userId:cookies.id,
                username:cookies.username
            });
        }
        this.props.show();
    }

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
        let tags = e.currentTarget.value.split(/[,，]/);
        let tagSet = [];
        for (let tag of tags){
            let item={"tag":tag};
            tagSet.push(item)
        }
        this.setState({
            tags:tags,
            tagSet:tagSet
        });
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
            "tagSet":this.state.tagSet,
            "user":{
                "id":this.state.userId,
                "username":this.state.username
            },
            "content":this.state.content
        };
    };

    submit = (e,publish)=>{
        let button = e.currentTarget;
        button.disabled=true;
        let submitJson = this.getSubmitJson();
        submitJson["publish"]=publish;
        if(submitJson["id"]){
            this.articleRequest.putJson(submitJson).then(res=>{
                alert(res.errmsg);
                if(res.errcode<400){
                    this.props.history.goBack();
                }else {
                    button.disabled=false;
                }
            })
        }else {
            this.articleRequest.post(submitJson).then(res=>{
                alert(res.errmsg);
                if(res.errcode<400){
                    this.props.history.goBack();
                }else {
                    button.disabled=false;
                }
            })
        }
    };
    cancelRelease = ()=>{
        console.log(this.state.tagSet)
    };

    render() {
        return(
            this.state.userId?
            <div className="editor-container" {...this.props}>
                <Row>
                    <Col xs="auto">
                        标题:
                    </Col>
                    <Col>
                        <input className="editor-text-input" type="text" placeholder="点击输入标题，最多16个字" onChange={this.onTitleChange} defaultValue={this.state.title}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto">
                        摘要:
                    </Col>
                    <Col>
                        <textarea className="editor-text-input" placeholder="点击输入摘要，最多50个字" onChange={this.onSummaryChange} defaultValue={this.state.summary}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto">
                        标签:
                    </Col>
                    <Col>
                        <input className="editor-text-input" type="text" placeholder="最多添加四个，最少添加一个，多个标签用逗号隔开" onChange={this.onTagSetChange} defaultValue={this.state.tags}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <textarea className="editor-textarea" onChange={this.onContentChange} placeholder="点击此处使用markdown语法开始编辑" defaultValue={this.state.content}/>
                    </Col>
                    <Col xs="6">
                        <div>
                            <MarkDown className="result editor-result" source={this.state.content} renderers={{code:CodeBlock}}/>
                        </div>
                    </Col>
                </Row>
                <Button className="myNavBar-input" variant="outline-primary" onClick={(e)=>this.submit(e,true)}>保存并发布</Button>
                <Button className="myNavBar-input" variant="outline-success" onClick={(e)=>this.submit(e,false)}>保存草稿</Button>
                <Button className="myNavBar-input" variant="outline-danger" onClick={this.cancelRelease}>取消发布</Button>
            </div>
                :
            <div className="editor-container" hidden={this.props.hidden}>
                请登录！
            </div>
        )
    }
}
export default MyFrameWork("文章编辑",false)(withRouter(Editor));