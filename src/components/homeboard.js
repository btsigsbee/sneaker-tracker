import React from 'react';

import axios from'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sneaker(props){
    const sneakieInfo= props;
    console.log(sneakieInfo);
    const sneaks = sneakieInfo.props.map((si )=> 
<div className='container' key={si._id}>
    <h4 >{si.name}</h4>
    <img fluid='true' className='h-50 w-50'src={si.imgUrl} alt='not found'/>


</div>
    
    );
    return (
        <ul>
            {sneaks}
        </ul>
    

    )}


class Homeboard extends React.Component{
    constructor(){
    super()
    this.state ={
        sneakers: []
    
    }
}
    componentDidMount(){
        

        axios.get("http://localhost:5000/shoes/get/Bruce")
            .then(res=> this.setState({
                sneakers: res.data
            }))
            .catch(err => console.log(err))

            
    }

    render(){
        return(
            <div>
                <h1>Homeboard</h1>
                <Sneaker props={this.state.sneakers}/>
                
                

                

            </div>
        )
    }
}

export default Homeboard;

