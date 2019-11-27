import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: fixed;
    right: 25px;
    top: 5px;
    background: orangered;
    padding: 10px;
    display: flex;
    
    ${props => {
      if (!props.visible) {
        return `
        & ${Title}, & ${Input} {
          display: none;
        }
        `
      }  
    }}
`;

const Title = styled.label`
    color: #ffffff;
    line-height: 20px;
    height: 20px;
`;

const Input = styled.input`
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 3px;
    height: 20px;
    line-height: 20px;
    margin: 0 10px;
    outline: none;
`;

const Button = styled.button`
    background: #ffffff;
    outline: none;
    border: 1px solid dodgerblue;
    border-radius: 3px;
    width: 30px;
    height: 20px;
    text-align: center;
`;

export class Filter extends React.Component {
  state = {
    visible: true
  };

  toggleVisible = () => {
    this.setState({visible: !this.state.visible})
  };

  onChange = (event) => {
    this.props.filter(event.target.value)
  };

  render() {
    return (
      <Wrapper visible={this.state.visible}>
        <Title htmlFor="search">
          filter
        </Title>
        <Input
          type="search"
          id="search"
          onChange={this.onChange}
        />
        <Button type="button" onClick={this.toggleVisible}>
          &#128065;
        </Button>
      </Wrapper>
    )
  }
}