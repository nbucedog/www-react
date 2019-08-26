import React,{Component} from 'react';
import MyNavBar from '../myNavBar';
// import PCNavBar from '../myNavBar/PCNavBar';
// import PropTypes from 'prop-types';

const loadingStyle={
    width:'100%',
    textAlign:'center',
    paddingTop:'4rem'
};
export default (title)=>Container=> class MyFramework extends Component{
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
        return(
            <div>
                <MyNavBar title={title} linkArr={this.state.linkArr}/>
                {/*<PCNavBar linkArr={this.state.linkArr}/>*/}
                <div style={loadingStyle} hidden={!this.state.hide}>
                    <img src="https://www.nbucedog.com/loading.svg" alt="loading"/>
                </div>
                <Container hide={this.hide} show={this.show} hidden={this.state.hide}/>
            </div>
        )
    }
}
