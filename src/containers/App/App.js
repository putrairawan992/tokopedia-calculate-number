import React from 'react';
import {Form, Grid, Message, Header, Divider} from "semantic-ui-react";
import CustomButton from "../../components/CustomButton";
import styled from "styled-components";
import {DenominationUtil} from "../../utilities/DenominationUtil";
import DenominationCard from "../../components/DenominationCard";
import CurrencyUtil from "../../utilities/CurrencyUtil";
import AppContainer from "../../components/Container";
import CustomTextInput from "../../components/CustomTextInput";
import ValidatorUtil from "../../utilities/ValidatorUtil";
import './App.css';


class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            denominationList: [],
            changes: '',
            errorInput: '',
            hasCalculated: false
        };
    }

    onSubmit =(event) => {
        event.preventDefault();
        this.calculateDenomination(this.state.amount);
    }

    calculateDenomination(amount) {
        this.setState({amount: amount});

        const amountValue = amount,
            isNumberValid = ValidatorUtil.checkNumberIsCurrency(amountValue);

        if (!isNumberValid.error) {

            let denominationUtil = new DenominationUtil(),
                calculateDenomination = denominationUtil.calculateDenomination(amountValue);

            this.setState({
                hasCalculated: true,
                errorInput: isNumberValid.message,
                denominationList: calculateDenomination.resultDenomination,
                changes: calculateDenomination.changes
            });

        } else {
            this.setState({
                errorInput: isNumberValid.message,
                changes: '',
                denominationList: []
            })
        }
    }

    onClear =(event) => {
        event.preventDefault();
        this.setState({
            amount: '',
            denominationList: [],
            changes: '',
            errorInput: '',
            hasCalculated: false
        })
    }

    clickSuggestion =(event, val) => {
        event.preventDefault();
        this.calculateDenomination(val.toString());
    }

    render() {

        const CardGroup = styled(Grid)`
        `;


        const renderDenominationList = () => {
            const {denominationList} = this.state;
            if (denominationList.length > 0) {
                return denominationList.map((item, index) => {
                    if (item.amount > 0) {
                        const GridColumn = styled(Grid.Column)`
                                margin-top: 0.5vw !important;
                            `;
                        return (
                            <GridColumn key={index}>
                                <DenominationCard key={item.label}
                                                  amount={item.amount}
                                                  denomination={CurrencyUtil.numberToCurrencyFormat(item.label)}/>
                            </GridColumn>)
                    } else {
                        return ''
                    }
                })
            }
        };

        const ifHasChanges = () => {
            const {changes} = this.state;
            if (changes > 0) {
                const changesMessage = `You've got ${CurrencyUtil.numberToCurrencyFormat(changes)} left`;
                return <Message color='green'>{changesMessage}</Message>
            }
        };

        const renderDenominationLabel = () => {
            const {denominationList, hasCalculated} = this.state;
            if (hasCalculated) {
                if (denominationList.length > 0) {
                    const resultMessage = `Here's your denomination result`;
                    return (
                        <React.Fragment>
                            <Header as={'h3'}>{resultMessage}</Header>
                            <Divider/>
                        </React.Fragment>
                    )
                } else {
                    const resultMessage = `Denomination not found`;
                    return (
                        <React.Fragment>
                            <Header as={'h3'}>{resultMessage}</Header>
                            <Divider/>
                        </React.Fragment>
                    )
                }
            }
        };


        return (
            <AppContainer fluid>

                <Header as='h1'>Denomination Calculator</Header>

                <Form id={'denomination-form'} onSubmit={this.onSubmit}>
                    <Form.Field>
                        <CustomTextInput
                            label="Amount"
                            name="amount"
                            errorMessage={this.state.errorInput}
                            placeholder="Please input amount for calculate denomination"
                            textValue={this.state.amount}
                            onChangeValue={(val) => this.setState({amount: val})}/>
                    </Form.Field>

                    <CustomButton color="blue"
                                  type="submit"
                                  label={'Calculate'}
                                  onClick={this.onSubmit}/>

                    <CustomButton color="red"
                                  type="button"
                                  label={'Clear'}
                                  onClick={this.onClear}/>
                </Form>


                {ifHasChanges()}

                {renderDenominationLabel()}

                <CardGroup columns={3}>
                    <Grid.Row>
                        {renderDenominationList()}
                    </Grid.Row>
                </CardGroup>
            </AppContainer>
        );
    }
}

export default App;
