import React,{Component} from 'react'
import MyFramework from '../../components/myFrameWork';
import Review from "../../components/review";
import Col from "react-bootstrap/Col";

class Comment extends Component{
    componentDidMount() {
        document.title="留言社区 - 宁大通信狗";
        this.props.show();
    }

    render() {
        return(
            <Col lg="8" {...this.props}>
                <Review request="/comment"/>
            </Col>
        );
    }
}
export default MyFramework("留言社区",true)(Comment)