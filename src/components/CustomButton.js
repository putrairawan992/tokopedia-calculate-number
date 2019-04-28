import React from "react";
import styled from "styled-components";
import {Button} from "semantic-ui-react";
import PropTypes from "prop-types";


const AppButton = styled(Button)`
`;

class CustomButton extends React.PureComponent {
    render() {

        return (
            <AppButton type={this.props.type}
                       className={this.props.className}
                          name={this.props.label}
                          content={this.props.label}
                          onClick={this.props.onClick}
                          color={this.props.color}/>
        );
    }
}

CustomButton.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    color: PropTypes.string
};

export default CustomButton;