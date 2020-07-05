import React from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import axios from'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sneaker(props){
    const sneakieInfo= props;
    console.log(sneakieInfo.props);
    
    const sneaks = sneakieInfo.props.map((si )=> 
<div   key={si._id}>
<Card style={{ width: '48rem' }} className='container border border-success bg-secondary '>
<Card.Header className='bg-success'><h2 className='text-light'>{si.name}</h2></Card.Header>
<Row><Col><Card.Img fluid='true' className=' 'src={si.imgUrl} alt='not found'/></Col>
<Card.Body ><Col>
    <div className=''>
    <p>{si.market.volatility * 100}%</p>
    <p> Change:{(si.market.changePercentage*100).toFixed(2)}%</p>
    </div>
    <p className=''>Price: ${si.market.lastSale }.00</p>
<h4>Change in price: ${si.market.changeValue }</h4>
<Button onClick={()=>props.removeItem(si._id)}>Delete</Button>
</Col></Card.Body>
</Row>
</Card>
<br/>
<br/>
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
    removeItem(id){
        axios.delete('http://localhost:5000/'+id)
        .then(res=> console.log(res))
    }

    render(){
        return(
            <div>
                <h1>Homeboard</h1>
                <Sneaker props={this.state.sneakers} removeItem={this.removeItem.bind(this)}/>
                
                

                

            </div>
        )
    }
}

export default Homeboard;

