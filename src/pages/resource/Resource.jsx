import React,{Component} from 'react';
import MyFramework from '../../components/myFrameWork';
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";

class Resource extends Component{
    componentDidMount() {
        document.title="资源分享 - 宁大通信狗";
        this.props.show();
    }

    render() {
        return(
            <Col lg="8" {...this.props}>
                <Jumbotron style={{padding:"1rem 1rem",marginBottom:".5rem"}}>
                    <p>敬请期待</p>
                </Jumbotron>
            </Col>
        );
    }
}
export default MyFramework("资源分享",true)(Resource);