// @flow

import React from 'react';
import { Picker } from 'react-native';

type EditorsSelectProps = {
    numEditors: number,
    onChange: (number) => void
};

export default class EditorsSelect extends React.Component<EditorsSelectProps> {
    constructor(props: EditorsSelectProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange: (SyntheticEvent<HTMLSelectElement>) => void;
    handleChange(e: SyntheticEvent<HTMLSelectElement>) {
        this.props.onChange(parseInt(e.currentTarget.value, 10));
    }

    render() {
        return (
            <Picker value={this.props.numEditors} onValueChange={this.handleChange}>
                <Picker.Item value="0" label="0"/>
                <Picker.Item value="1" label="1"/>
                <Picker.Item value="2" label="2"/>
                <Picker.Item value="3" label="3"/>
            </Picker>
        );
    }
}
