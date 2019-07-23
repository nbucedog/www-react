import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import MyFramework from '../../components/myFrameWork';

class Others extends Component{
    render() {
        return(
            <div>
                <Container>
                    Others
                </Container>
            </div>
        );
    }
}
export default MyFramework("其他内容")(Others);