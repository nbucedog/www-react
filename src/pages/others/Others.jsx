import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import MyFramework from '../../components/myFrameWork';
import Jumbotron from "react-bootstrap/Jumbotron";

class Others extends Component{
    componentDidMount() {
        document.title="其他内容 - 宁大通信狗";
        this.props.show();
    }

    render() {
        return(
            <div hidden={this.props.hidden}>
                <Container>
                    <div className="article-content">
                        <Jumbotron style={{padding:"1rem 1rem",marginBottom:".5rem"}}>
                            <p>敬请期待</p>
                        </Jumbotron>
                    </div>
                </Container>
            </div>
        );
    }
}
export default MyFramework("其他内容")(Others);