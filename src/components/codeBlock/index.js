import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/androidstudio.css';

import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import objectivec from 'highlight.js/lib/languages/objectivec';
import swift from 'highlight.js/lib/languages/swift';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import shell from 'highlight.js/lib/languages/shell';
// import ('highlight.js/lib/languages/python').then(python =>{
//    hljs.registerLanguage('python',python.)
// });

hljs.registerLanguage('python',python);
hljs.registerLanguage('java',java);
hljs.registerLanguage('cpp',cpp);
hljs.registerLanguage('objectivec',objectivec);
hljs.registerLanguage('swift',swift);
hljs.registerLanguage('sql',sql);
hljs.registerLanguage('xml',xml);
hljs.registerLanguage('javascript',javascript);
hljs.registerLanguage('css',css);
hljs.registerLanguage('shell',shell);

 // const python = React.lazy(()=>require ('highlight.js/lib/languages/python'));
//
// );
// const python = require('highlight.js/lib/languages/python');
// hljs.registerLanguage('python',python);
// hljs.registerLanguage('java',require('highlight.js/lib/languages/java'));
// hljs.registerLanguage('cpp',require('highlight.js/lib/languages/cpp'));
// hljs.registerLanguage('objectivec',require('highlight.js/lib/languages/objectivec'));
// hljs.registerLanguage('swift',require('highlight.js/lib/languages/swift'));
// hljs.registerLanguage('sql',require('highlight.js/lib/languages/sql'));
// hljs.registerLanguage('xml',require('highlight.js/lib/languages/xml'));
// hljs.registerLanguage('javascript',require('highlight.js/lib/languages/javascript'));
// hljs.registerLanguage('css',require('highlight.js/lib/languages/css'));
// hljs.registerLanguage('shell',require('highlight.js/lib/languages/shell'));


class CodeBlock extends PureComponent{
    constructor(props){
        super(props);
        this.setRef = this.setRef.bind(this)
    }
    setRef(el){
        this.codeEl = el
    }
    componentDidMount() {
        this.highlightCode()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.highlightCode()
    }
    highlightCode(){
        hljs.highlightBlock(this.codeEl)
    }
    render() {
        return(
            <pre>
                <code ref={this.setRef} className={`language-${this.props.language}`}>
                    {this.props.value}
                </code>
            </pre>
        )
    }
}
CodeBlock.defaultProps = {
    language:''
};
CodeBlock.protoTypes = {
    value:PropTypes.string.isRequired,
    language: PropTypes.string
};
export default CodeBlock;