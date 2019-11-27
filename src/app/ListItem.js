import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #cccccc;
    height: 100%;
`;

const Index = styled.div`
    flex: 150px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 25px;
    font-weight: bolder;
    margin: 5px 0 5px 5px;
    border-left: 5px solid orangered;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: orangered;
    margin-bottom: 10px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 10px;
`;

export function ListItem(props) {
  return (
    <Wrapper style={props.style}>
      <Index>
        {props.item.index}
      </Index>
      <Body>
        <Title>
          {props.item.name}
        </Title>
        <div>
          {props.item.description}
        </div>
      </Body>
    </Wrapper>
  )
}