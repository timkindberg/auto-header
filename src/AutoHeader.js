import React from "react";
import PropTypes from "prop-types";

const headerCmpInstances = new Set();

const trackHeader = hdr => {
  headerCmpInstances.add(hdr);
  figureLevels();
};
const untrackHeader = hdr => {
  headerCmpInstances.delete(hdr);
};
const figureLevels = () => {
  // Find all the auto headers in the dom with css selector
  // This ensures they are found in "tab order"
  const tabOrderHeaderEls = Array.from(
    document.querySelectorAll("[data-auto-header]")
  );

  // Now find all the React AutoHeader instances that created those dom els
  // Assign them each a header level based on their "tab order".
  tabOrderHeaderEls.forEach((el, index) => {
    const matchingCmpInstance = Array.from(headerCmpInstances).find(
      inst => inst.ref.current === el
    );

    matchingCmpInstance.setLevel(index + 1);
  });
};

export default class AutoHeader extends React.Component {
  state = { level: 1 };

  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    trackHeader(this);
  }

  componentWillUnmount() {
    untrackHeader(this);
  }

  setLevel = level => {
    this.setState({ level });
  };

  render() {
    const { children, ...rest } = this.props;
    const { level } = this.state;

    return React.createElement(
      `h${level}`,
      {
        ...rest,
        ref: this.ref,
        "data-auto-header": true
      },
      children
    );
  }
}
