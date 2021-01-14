import React, { Component } from 'react'
import LotteView from 'lottie-react-native'

export default class Animation extends Component {
    render(){
        return(
            <LotteView 
            style={{width:"60%"}}
            autoPlay loop
            source={require("../assets/3154-books-2.json")}/>
        )
    }
}