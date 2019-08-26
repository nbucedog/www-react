// import React,{Component,Suspense,lazy} from 'react'
// // import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
// import {Switch,Route} from 'react-router-dom'
// // import {HashRouter as Router,Route,Switch} from "react-router-dom";
// import loading from '../loading.svg';
// // import NavBar from '../components/myNavBar';
//
// const Home = lazy(()=> import('../pages/home/Home'));
// const Blog = lazy(()=> import('../pages/blog/Blog'));
// const Article = lazy(()=> import('../pages/blog/article/Article'));
// const Editor = lazy(()=> import('../pages/blog/editor/Editor'));
// const Comment = lazy(()=> import('../pages/comment/Comment'));
// const App = lazy(()=> import('../pages/app/App'));
// const Others = lazy(()=> import('../pages/others/Others'));
//
// const loadingStyle={
//     width:'100%',
//     textAlign:'center',
//     paddingTop:'4rem'
// };
//
// export default class ContainerRouter extends Component{
//     // getPath(){
//     //     return this.props.match.url === "/" ? "" :this.props.match.url;
//     // }
//
//     render() {
//         return(
//             <div>
//                 {/*<div style={loadingStyle}><img src={loading} alt="ma"/></div>*/}
//                 <Suspense fallback={<div style={loadingStyle}><img src={loading} alt="loading"/></div>}>
//                     <Switch>
//                         <Route exact path="/" component={Home}/>
//                         <Route exact path="/home" component={Home}/>
//                         <Route exact path="/blog" component={Blog}/>
//                         <Route exact path="/blog/article" component={Article}/>
//                         <Route exact path="/blog/editor" component={Editor}/>
//                         <Route exact path="/comment" component={Comment}/>
//                         <Route exact path="/app" component={App}/>
//                         <Route exact path="/others" component={Others}/>
//                     </Switch>
//                 </Suspense>
//             </div>
//         )
//     }
// }