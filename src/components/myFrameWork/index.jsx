import React,{Component} from 'react';
import MyNavBar from '../myNavBar';

export default (title)=>Container=> class MyFramework extends Component{
    constructor(props){
        super(props);
        this.state={
            linkArr:[{
                link: "/blog",
                title: "博客文章",
            },{
                link: "/comment",
                title: "留言社区"
            },{
                link: "/app",
                title: "软件分享"
            },{
                link: "/others",
                title: "其他内容"
            }]
        }
    }
    render() {
        return(
            <div>
                <MyNavBar title={title} linkArr={this.state.linkArr}/>
                <Container/>
            </div>
        )
    }
}
