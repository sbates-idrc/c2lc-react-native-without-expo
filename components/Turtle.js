import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Polygon } from 'react-native-svg';


export default class Turtle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const turtleTransform = `translate(${this.props.location.x} ${this.props.location.y}) rotate(${this.props.directionDegrees} 0 0)`;
        return (
            <Polygon 
                transform={turtleTransform}
                points='-6 4 6 4 0 -9'/>
        )
    }
}
