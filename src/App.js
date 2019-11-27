import React from 'react';
import data from "./data.json";

import {List, AutoSizer} from 'react-virtualized';

let filteredData = data.slice();

class App extends React.Component{
  render() {
    return (
      <>
        <AutoSizer>
          {({height, width}) => (
            <List
              height={height}
              rowCount={filteredData.length}
              rowHeight={100}
              rowRenderer={rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
        <Filter forceUpdate={this.forceUpdate.bind(this)}/>
      </>
    );
  }
}

class Filter extends React.Component {
  state = {
    visible: true
  };

  toggleVisible = () => {
    this.setState({visible: !this.state.visible})
  };

  onChange = debounce((value) => {
    filteredData = data.filter(item => {
      return (item.name.search(value) !== -1) || ((item.index + "").search(value) !== -1) || (item.description.search(value) !== -1)
    });

    this.props.forceUpdate();

  }, 400);

  render () {
    return (
      <div className={`${this.state.visible ? "visible" : "hidden"} filter`}>
        <button onClick={this.toggleVisible}>
          &#128065;
        </button>
        <label htmlFor="search" className="filter-title">
          Filter:
        </label>
        <input type="search" id="search" onChange={(event) => this.onChange(event.target.value)}/>
      </div>
    )
  }
}

function Item(props) {
  return (
    <div>
      <div>Name: {props.item.name}</div>
      <div>Index: {props.item.index}</div>
      <div>Description: {props.item.description}</div>
    </div>
  )
}

function rowRenderer(
  {
    index, // Index of row
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    key, // Unique key within array of rendered rows
    parent, // Reference to the parent List (instance)
    style, // Style object to be applied to row (to position it);
    // This must be passed through to the rendered row element.
  }
) {
  const item = filteredData[index];

  // If row content is complex, consider rendering a light-weight placeholder while scrolling.
  // const content = isScrolling ? '...' : <Item item={item} />;

  return (
    <div key={key} style={style}>
      <Item item={item}/>
    </div>
  );
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default App;
