import React from "react";
import {Card} from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";


class DenominationCard extends React.PureComponent {

    render() {
        const DenominationCardWrapper = styled(Card)`
            background-color: #42b549 !important
            color: #ffff !important
            border: none;
        `;

        const DenominationCardContentWrapper = styled(Card.Content)`
            font-weight: bold
        `;

        const DenominationAmount = styled.div`
            float: right;
            border-radius: 1vw
            background-color: #ffff
            color: #42b549
            padding: 0.35vw
            font-weight: bold
        `;


        return (<DenominationCardWrapper fluid>
            <DenominationCardContentWrapper>
                {this.props.denomination}
                <DenominationAmount>{this.props.amount} X</DenominationAmount>
            </DenominationCardContentWrapper>
        </DenominationCardWrapper>)
    }
}


DenominationCard.propTypes = {
    denomination: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
};

export default DenominationCard;