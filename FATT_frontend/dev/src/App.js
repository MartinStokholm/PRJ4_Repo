import React, { Component } from'react'
import axios from 'axios'
export default class App extends Component{
  constructor(props){
  super(props)
  this.state={
    imageUrl:"",
  }
   }
componentDidMount(){

  this.callApi()
}

  callApi= ()=>{
axios.get("https://api.thecatapi.com/v1/images/search")
.then((response) => {
console.log(response.data[0].url)
this.setState({ imageUrl: response.data[0].url})
})
  }
render() {


return(

<div>
Hi!!! 
<img src={this.state.imageUrl} alt="cat" width="1000" heiht= "1000" />
</div>
) 
}


}










