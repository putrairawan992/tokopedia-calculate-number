import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Input, Message} from 'semantic-ui-react'

const InputText = styled(Input)`
            
`;

const ErrorInputMessage = styled(Message)`
    background: none !important;
    padding: 0 !important;
    box-shadow: none !important;
`;

class CustomTextInput extends React.PureComponent {


    constructor(props, context) {
        super(props, context);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            errorMessage: ''
        }
    }


    handleOnChange(el) {
        this.props.onChangeValue(el.target.value);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const errorMsgProps = this.props.errorMessage;
        if (errorMsgProps !== prevProps.errorMessage) {
            this.setState({errorMessage: errorMsgProps})
        }
    }


    render() {

        const renderErrorMessage = () => {
            const {errorMessage} = this.state;
            if (errorMessage) {
                return <ErrorInputMessage size="tiny" color="red">
                    {errorMessage}
                </ErrorInputMessage>
            }
        };

        return (
            <React.Fragment>
                <InputText
                    id={this.props.name}
                    name={this.props.name}
                    type={'text'}
                    error={!!this.props.errorMessage}
                    placeholder={this.props.placeholder}
                    autoComplete="off"
                    label={this.props.label}
                    value={this.props.textValue}
                    onChange={this.handleOnChange}
                />
                {renderErrorMessage()}
            </React.Fragment>)
    }

}

CustomTextInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    textValue: PropTypes.string.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    placeholder: PropTypes.string
};

export default CustomTextInput;