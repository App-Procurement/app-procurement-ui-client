import React from "react";

class MultiColorProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const parent = this.props;
    let bars =
      parent.readings &&
      parent.readings.length &&
      parent.readings.map(function (item, i) {
        if (item.value > 0) {
          return (
            <div
              className="bar"
              style={{ backgroundColor: item.color, width: item.value + "%" }}
              key={i}
            ></div>
          );
        }
      }, this);

    return (
      <div className="multicolor-bar">
        <div className="bars">{bars == "" ? "" : bars}</div>
      </div>
    );
  }
}

export default MultiColorProgressBar;
