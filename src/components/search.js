import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import axios from'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const SearchResults = (props) =>{
    const shoes = props;
    const results = shoes.props.map((sr) =>
<div>{sr.name}</div>
    );
    return(<div>{results}</div>);

}
class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchValue:'',
            searchResults:[]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange=(event)=>{
        console.log(event.target.value);
        this.setState({searchValue: event.target.value});
        this.searchShoe(this.state.searchValue);
    }
    searchShoe(text){
        axios.get('http://localhost:5000/shoes/search/'+text)
            .then(res => this.setState({
                searchResults : res.data
            }))
            .catch(err=>console.log(err))

        
        
    }
    render(){
        return(<div>
            <input placeholder='search...' onChange={this.handleChange}></input>
            <div><SearchResults props={this.state.searchResults}/></div>
        </div>
        )}
}
export default Search;