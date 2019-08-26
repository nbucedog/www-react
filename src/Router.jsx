// import loading from './loading.svg';
import React,{Component,Suspense,lazy} from 'react'
// import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {BrowserRouter,Switch,Route} from 'react-router-dom'
// import {HashRouter as Router,Route,Switch} from "react-router-dom";
// import './App.css'
// import ContainerRouter from './routers/ContainerRouter';
import Blog from './pages/blog/Blog';
import Comment from './pages/comment/Comment';
import Resource from './pages/resource/Resource';
import Others from './pages/others/Others';

const Home = lazy(()=> import('./pages/home/Home'));
// const Blog = lazy(()=> import('./pages/blog/Blog'));
const Article = lazy(()=> import('./pages/blog/article/Article'));
const Editor = lazy(()=> import('./pages/blog/editor/Editor'));
// const Comment = lazy(()=> import('./pages/comment/Comment'));
// const Resource = lazy(()=> import('./pages/resource/Resource'));
// const Others = lazy(()=> import('./pages/others/Others'));
const Login = lazy(()=> import('./pages/login/Login'));

const loadingStyle={
    width:'100%',
    textAlign:'center',
    paddingTop:'4rem'
};
export default class RouterMap extends Component{
    // getPath(){
    //     return this.props.match.url === "/" ? "" :this.props.match.url;
    // }

    render() {
        return(
            <BrowserRouter>
                <Suspense fallback={<div style={loadingStyle}><img src="https://www.nbucedog.com/loading.svg" alt="loading"/></div>}>
                {/*<Suspense fallback={<div style={loadingStyle}>loading</div>}>*/}
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path={`/blog`} component={Blog}/>
                        <Route exact path={`/blog/article/:id?`} component={Article}/>
                        <Route exact path={`/blog/editor/:id?`} component={Editor}/>
                        <Route exact path="/comment" component={Comment}/>
                        <Route exact path="/resource" component={Resource}/>
                        <Route exact path="/others" component={Others}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </Suspense>
                {/*<ContainerRouter/>*/}
            </BrowserRouter>
        )
    }
}