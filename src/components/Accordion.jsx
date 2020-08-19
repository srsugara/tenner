import React from 'react';
import './Accordion.css';

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      height: 0,
    };

    this.toggleCardState = this.toggleCardState.bind(this);
  }

  toggleCardState(e) {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { title, children } = this.props;
    const { expanded } = this.state;

    return (
      <div className="column">
        <div className={'card ' + (expanded ? 'expanded' : 'not-expanded')}>
          <header className="card-header" onClick={this.toggleCardState}>
            <p className="card-header-title">{title}</p>
            <a href="#/" style={{textDecoration: 'none'}} className="card-header-icon">
              <span className="icon has-text-black">
                {'>'}
              </span>
            </a>
          </header>
          <div
            className="card-content"
            style={{ maxHeight: this.state.height }}
            ref={(content) => (this.content = content)}
          >
            <div className="content">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Accordion;
