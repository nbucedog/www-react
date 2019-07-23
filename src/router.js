import React from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
// import {HashRouter as Router,Route,Switch} from "react-router-dom";
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import BlogEditor from './pages/blog/editor/Editor';
import BlogArticle from './pages/blog/article/Article';
import Comment from './pages/comment/Comment';
import App from './pages/app/App';
import Others from './pages/others/Others';


export default ()=>(
    <Router>
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/home' exact component={Home}/>
            <Route path='/blog' exact component={Blog}/>
            <Route path='/blog/article' exact component={BlogArticle}/>
            <Route path='/blog/editor' exact component={BlogEditor}/>
            <Route path='/comment' exact component={Comment}/>
            <Route path='/app' exact component={App}/>
            <Route path='/others' exact component={Others}/>
        </Switch>
    </Router>
)