import React from 'react';

import {Filter} from "./Filter";

import {List, AutoSizer} from 'react-virtualized';
import {debounce} from "../utils/debounce";

import {ListItem} from "./ListItem";
import data from "../utils/dataGenerator";

class App extends React.Component {
  state = {
    filteredData: data,
  };

  filter = debounce((value) => {
    if (!value) {
      this.setState({
        filteredData: data
      })

    } else {
      const filteredData = data.filter(item => {
        return (item.name.search(value) !== -1) || ((item.index + "").search(value) !== -1) || (item.description.search(value) !== -1)
      });

      this.setState({
        filteredData: filteredData
      })
    }
  }, 400);

  rowRenderer = ({index, key, style}) => {
    const item = this.state.filteredData[index];

    return (
      <ListItem key={key} style={style} item={item}/>
    );
  };

  render() {
    return (
      <>
        <AutoSizer>
          {({height, width}) => (
            <List
              height={height}
              rowCount={this.state.filteredData.length}
              rowHeight={100}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
        <Filter filter={this.filter}/>
      </>
    );
  }
}

export default App;
