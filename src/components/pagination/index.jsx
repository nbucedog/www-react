import React,{Component} from 'react'
import Pagination from 'react-bootstrap/Pagination'
import {withRouter} from 'react-router-dom'


class myPagination extends Component{
    onPageClick = (pageIndex)=>{
        if(pageIndex===this.props.pageIndex){
            return;
        }
        // this.props.onPageChange(pageIndex);
        // this.props.history.push("/blog?page="+pageIndex)
        window.location.href="/blog?page="+pageIndex;
    };
    render() {
        let items = [];
        let pageNumber=Math.ceil(this.props.total/this.props.pageSize);
        let pageIndex=parseInt(this.props.pageIndex);
        console.log(pageIndex);
        if(pageNumber<=7){
            for (let i=1;i<=pageNumber;i++){
                items.push(<Pagination.Item key={i} active={pageIndex===i} onClick={()=>this.onPageClick(i)}>{i}</Pagination.Item>)
            }
        }else {
            if(pageIndex<=4){
                for (let i=1;i<=6;i++){
                    items.push(<Pagination.Item key={i} active={pageIndex===i} onClick={()=>this.onPageClick(i)}>{i}</Pagination.Item>)
                }
                items.push(<Pagination.Ellipsis key={7}/>)
            }
            else if(pageIndex>(pageNumber-4)){
                items.push(<Pagination.Ellipsis key={pageNumber-6}/>);
                for(let i=pageNumber-6+1;i<=pageNumber;i++){
                    items.push(<Pagination.Item key={i} active={pageIndex===i} onClick={()=>this.onPageClick(i)}>{i}</Pagination.Item>)
                }
            }
            else {
                items.push(<Pagination.Ellipsis key={pageIndex-3}/>);
                for(let i=pageIndex-2;i<=pageIndex;i++){
                    items.push(<Pagination.Item key={i} active={pageIndex===i} onClick={()=>this.onPageClick(i)}>{i}</Pagination.Item>)
                }
                for(let i=pageIndex+1;i<=pageIndex+2;i++){
                    items.push(<Pagination.Item key={i} onClick={()=>this.onPageClick(i)}>{i}</Pagination.Item>)
                }
                items.push(<Pagination.Ellipsis key={pageIndex+3}/>);
            }
        }
        return(
            <Pagination total={this.props.total}>
                <Pagination.First onClick={()=>this.onPageClick(1)}/>
                {items}
                <Pagination.Last onClick={()=>this.onPageClick(pageNumber)}/>
            </Pagination>
        )
    }
}
export default withRouter(myPagination)