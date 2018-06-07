import React from 'react';
//What state is there?
//When does it change?

class Calculator extends React.Component{
    //initial state of the Display Value
    state ={
        value: null,
        displayValue:'0',
        waitingForOperand: false,
        operator: null
    }
    //StateChangers because guess what?it changes the state of display value
    //can also be known as event handler methods
    inputDigit(digit){
        const { displayValue, waitingForOperand } = this.state

        if (waitingForOperand){
            this.setState({
                displayValue: String(digit),
                waitingForOperand: false
            })
        } else {
            this.setState({
                //if display value is 0 lets just use string of digit otherwise display both digits
                displayValue: displayValue === '0'? String(digit) : displayValue + digit
            })
        }
        
    }
    inputDot(){
        const { displayValue, waitingForOperand } = this.state
        //if we are waiting for an operand we will start our new num with a decimal
        if (waitingForOperand){
            this.setState({
                displayValue:'.',
                waitingForOperand: false
            })
        } else if 
        //Gaurding the setState: if it already has a decimal we dont want another
        //waiting for operand is false because it be the begining of a new number
        (displayValue.indexOf('.') === -1){
            this.setState({
                displayValue: displayValue + '.',
                waitingForOperand: false
            })
        }
    }
    clearDisplay(){
        this.setState({
            displayValue: '0'
        })
    }
    toggleSign(){
        const { displayValue } = this.state
        this.setState({
            //Does the character at index 0 equals negative sign? yes,return display value by returning only characters begining from character index 1 to end: if not add a negative sign to display value 
            displayValue: displayValue.charAt(0) ==='-'? displayValue.substr(1):'-'+ displayValue
        })
    }
    inputPercent(){
        const { displayValue } = this.state
        const value = parseFloat(displayValue)
        this.setState({
            displayValue: String(value/100)
        })
    }
    preformOperation(nextOperator){
        const { displayValue, operator, value } = this.state
        //parse it off and save it if there was a previous value
        const nextValue = parseFloat(displayValue)
        //writing functions that know how to preform these operations helps avoid big switch statement
        const operations = {
            '/': (preValue, nextValue) => preValue / nextValue,
            '*': (preValue, nextValue) => preValue * nextValue,
            '+': (preValue, nextValue) => preValue + nextValue,
            '-': (preValue, nextValue) => preValue - nextValue,
            '=': (preValue, nextValue) => nextValue
        }

        if (value == null) {
            //no previous value, and they hit an operator key
            this.setState({
                value: nextValue
            })
        } else if(operator){
            const currentValue = value || 0
            const computedValue= operations[operator](currentValue, nextValue)

            this.setState({
                value: computedValue,
                displayValue: String(computedValue)
            })
        }


        this.setState({
            //Need to remember the operator we clicked
            waitingForOperand: true,
            operator: nextOperator
        })
    }

    render(){
        const {displayValue} = this.state
        return(
            <div className="calculator">
                <div className="calculator-display">{displayValue}</div>
                <div className="calculator-keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                            <button className="calculator-key key-clear" onClick={()=>this.clearDisplay()}>AC</button>
                            <button className="calculator-key key-sign" onClick={()=>this.toggleSign()}>+/-</button>
                            <button className="calculator-key key-percent" onClick={()=>this.inputPercent()}>%</button>
                        </div>
                        <div className="digit-keys">
                            <button className="calculator-key key-0" onClick={()=> this.inputDigit(0)}>0</button>
                            <button className="calculator-key key-dot" onClick={() => this.inputDot()}>● </button>
                            <button className="calculator-key key-1"onClick={()=> this.inputDigit(1)}>1</button>
                            <button className="calculator-key key-2"onClick={()=> this.inputDigit(2)}>2</button>
                            <button className="calculator-key key-3"onClick={()=> this.inputDigit(3)}>3</button>
                            <button className="calculator-key key-4"onClick={()=> this.inputDigit(4)}>4</button>
                            <button className="calculator-key key-5"onClick={()=> this.inputDigit(5)}>5</button>
                            <button className="calculator-key key-6"onClick={()=> this.inputDigit(6)}>6</button>
                            <button className="calculator-key key-7"onClick={()=> this.inputDigit(7)}>7</button>
                            <button className="calculator-key key-8"onClick={()=> this.inputDigit(8)}>8</button>
                            <button className="calculator-key key-9"onClick={()=> this.inputDigit(9)}>9</button>
                        </div>
                    </div>
                    <div className="operator-keys"> 
                        <button className="calculator-key key-divide" onClick={()=>this.preformOperation('/')}>/</button>
                        <button className="calculator-key key-muiltiply" onClick={()=>this.preformOperation('*')}>x</button>
                        <button className="calculator-key key-subtract" onClick={()=>this.preformOperation('-')}>-</button>
                        <button className="calculator-key key-add" onClick={()=>this.preformOperation('+')}>+</button>
                        <button className="calculator-key key-equals" onClick={()=>this.preformOperation('=')}>=</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;