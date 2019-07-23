import React,{Component} from 'react';
import MyFramework from '../../components/myFrameWork';
import Container from 'react-bootstrap/Container';

class App extends Component{
    render() {
        return(
            <div>
                <Container>
                    App
                </Container>
            </div>
        );
    }
}
export default MyFramework("软件分享")(App);