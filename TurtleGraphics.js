// @flow

import React from 'react';
import * as C2lcMath from './C2lcMath';
import {View, Text} from 'react-native';
import Turtle from './components/Turtle';
import Svg, { Line } from 'react-native-svg';

type TurtleGraphicsState = {
    location: {
        x: number,
        y: number
    },
    directionDegrees: number,
    path: Array<{
        x1: number,
        y1: number,
        x2: number,
        y2: number
    }>
};

export default class TurtleGraphics extends React.Component<{}, TurtleGraphicsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            location: {
                x: 0,
                y: 0
            },
            directionDegrees: 0,
            path: []
        }
    }

    forward(distance: number): void {
        this.setState((state) => {
            const directionRadians = C2lcMath.degrees2radians(state.directionDegrees);
            const xOffset = Math.sin(directionRadians) * distance;
            const yOffset = Math.cos(directionRadians) * distance;

            const newX = state.location.x + xOffset;
            const newY = state.location.y - yOffset;
            const newPathSegment = {
                x1: state.location.x,
                y1: state.location.y,
                x2: newX,
                y2: newY
            };

            return {
                location: {
                    x: newX,
                    y: newY
                },
                path: state.path.concat([newPathSegment])
            }
        });
    }

    turnLeft(amountDegrees: number): void {
        this.setState((state) => {
            return {
                directionDegrees: C2lcMath.wrap(0, 360,
                    state.directionDegrees - amountDegrees)
            };
        });
    }

    turnRight(amountDegrees: number): void {
        this.setState((state) => {
            return {
                directionDegrees: C2lcMath.wrap(0, 360,
                    state.directionDegrees + amountDegrees)
            };
        });
    }

    home(): void {
        this.setState({
            location: {
                x: 0,
                y: 0
            },
            directionDegrees: 0
        });
    }

    clear(): void {
        this.setState({
            path: []
        });
    }

    render() {
        return (
            <View>
                <Svg
                    width='100%'
                    height='100%'
                    viewBox='-100 -100 200 200'
                >
                    {this.state.path.map((pathSegment, i) => {
                        return <Line 
                            x1={pathSegment.x1}
                            y1={pathSegment.y1}
                            x2={pathSegment.x2}
                            y2={pathSegment.y2}
                            stroke="#222"
                            strokeWidth="3"
                            strokeLinecap="round"
                            key={i} />
                    })}
                    <Turtle location={this.state.location} directionDegrees={this.state.directionDegrees} path={this.state.path}/>
                </Svg>
            </View>
        );
    }
}
