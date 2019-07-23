import React,{Component} from 'react'
import Container from 'react-bootstrap/Container';
import MyFramework from '../../components/myFrameWork';

class Comment extends Component{
    render() {
        return(
            <div>
                <Container>
                    comment
                </Container>
            </div>
        );
    }
}
export default MyFramework("留言社区")(Comment)