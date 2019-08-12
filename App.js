// @flow

import React from 'react';
import EditorsSelect from './EditorsSelect';
import * as FeatureDetection from './FeatureDetection';
import Interpreter from './Interpreter';
import ProgramTextEditor from './ProgramTextEditor';
import TextSyntax from './TextSyntax';
import TurtleGraphics from './TurtleGraphics';
import {View, Button, Text, Switch} from 'react-native';

type AppState = {
    program: Array<string>,
    programVer: number,
    numEditors: number
};

type AppContext = {
    bluetoothApiIsAvailable: boolean
};

export default class App extends React.Component<{}, AppState> {
    appContext: AppContext;
    interpreter: Interpreter;
    syntax: TextSyntax;
    turtleGraphicsRef: { current: null | TurtleGraphics };

    constructor(props: {}) {
        super(props);

        this.state = {
            program: ["forward", "left"],
            programVer: 1,
            numEditors: 1,
            liveMode: false
        };

        this.appContext = {
            bluetoothApiIsAvailable: FeatureDetection.bluetoothApiIsAvailable()
        };

        this.interpreter = new Interpreter(
            {
                forward: () => {
                    if (this.turtleGraphicsRef.current !== null) {
                        this.turtleGraphicsRef.current.forward(40);
                    }
                },
                left: () => {
                    if (this.turtleGraphicsRef.current !== null) {
                        this.turtleGraphicsRef.current.turnLeft(90);
                    }
                },
                right: () => {
                    if (this.turtleGraphicsRef.current !== null) {
                        this.turtleGraphicsRef.current.turnRight(90);
                    }
                }
            }
        );

        this.syntax = new TextSyntax();

        this.turtleGraphicsRef = React.createRef<TurtleGraphics>();

        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.handleNumEditorsChange = this.handleNumEditorsChange.bind(this);
        this.handleClickRun = this.handleClickRun.bind(this);
        this.handleClickHome = this.handleClickHome.bind(this);
        this.handleClickClear = this.handleClickClear.bind(this);
        this.showLiveFeedback = this.showLiveFeedback.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }

    handleProgramChange: (Array<string>) => void;
    handleProgramChange(program: Array<string>) {
        this.setState((state) => {
            return {
                program: program,
                programVer: state.programVer + 1
            }
        });
    }

    handleNumEditorsChange: (number) => void;
    handleNumEditorsChange(numEditors: number) {
        console.log(numEditors);
        this.setState({
            numEditors: numEditors
        });
    }

    handleClickRun: () => void;
    handleClickRun() {
        this.interpreter.run(this.state.program);
    }

    handleClickHome: () => void;
    handleClickHome() {
        if (this.turtleGraphicsRef.current !== null) {
            this.turtleGraphicsRef.current.home();
        }
    }

    handleClickClear: () => void;
    handleClickClear() {
        if (this.turtleGraphicsRef.current !== null) {
            this.turtleGraphicsRef.current.clear();
        }
    }

    showLiveFeedback: () => void;
    showLiveFeedback() {
        this.interpreter.run(this.state.program);
        //this.handleProgramChange();
    }

    changeMode: () => void;
    changeMode() {
        this.setState({liveMode : !this.state.liveMode});
    }

    render() {
        return (
            <View>
                <Switch
                    onValueChange = {this.changeMode}
                    value = {this.state.liveMode}/>
                {[...Array(this.state.numEditors)].map((x, i) => {
                    return <ProgramTextEditor
                        liveMode= {this.state.liveMode}
                        program={ this.state.program }
                        programVer={ this.state.programVer }
                        syntax={ this.syntax }
                        onChange={ this.showLiveFeedback }
                        key={ i } />
                })}
                <EditorsSelect
                    numEditors={ this.state.numEditors }
                    onChange={ this.handleNumEditorsChange } />
                <View className='c2lc-graphics'>
                    <TurtleGraphics ref={this.turtleGraphicsRef} />
                </View>
                <Button 
                    onPress={this.handleClickRun}
                    title="Run"
                />
                <Button 
                    onPress={this.handleClickHome}
                    title="Home"
                />
                <Button 
                    onPress={this.handleClickClear}
                    title="Clear"
                />
                <View>
                    {this.appContext.bluetoothApiIsAvailable ? (
                        <Text>Bluetooth available</Text>
                    ) : (
                        <Text>Bluetooth not available</Text>
                    )}
                </View>
            </View>
        );
    }
}
