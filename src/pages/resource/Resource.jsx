import React,{Component} from 'react';
import MyFramework from '../../components/myFrameWork';
import Container from 'react-bootstrap/Container';
import Jumbotron from "react-bootstrap/Jumbotron";

class Resource extends Component{
    componentDidMount() {
        document.title="资源分享 - 宁大通信狗";
        this.props.show();
    }

    render() {
        return(
            <div hidden={this.props.hidden}>
                <Container>
                    <Jumbotron style={{padding:"1rem 1rem",marginBottom:".5rem"}}>
                        <p>敬请期待</p>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}
export default MyFramework("资源分享")(Resource);