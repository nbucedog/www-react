import React,{Component} from 'react'
import Container from 'react-bootstrap/Container';
import MyFramework from '../../components/myFrameWork';
import Review from "../../components/review";

class Comment extends Component{
    componentDidMount() {
        document.title="留言社区 - 宁大通信狗";
        this.props.show();
    }

    render() {
        return(
            <div hidden={this.props.hidden}>
                <Container>
                    <Review request="/comment"/>
                </Container>
            </div>
        );
    }
}
export default MyFramework("留言社区")(Comment)
// export default Comment;