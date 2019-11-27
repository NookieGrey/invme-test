import React from 'react';

import {Filter} from "./Filter";

import {List, AutoSizer} from 'react-virtualized';
import {debounce} from "../utils/debounce";

import {ListItem} from "./ListItem";

class App extends React.Component {
  state = {
    filteredData: [],
    defaultData: [],
  };

  componentDidMount() {
    let url = process.env.PUBLIC_URL + '/data.json';

    fetch(url)
      .then(res => res.json())
      .then((out) => {
        this.setState({
          filteredData: out,
          defaultData: out,
        })
      })
      .catch(err => { console.error(err) });
  }

  filter = debounce((value) => {
    if (!value) {
      this.setState({
        filteredData: this.state.defaultData
      })

    } else {
      const filteredData = this.state.defaultData.filter(item => {
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
