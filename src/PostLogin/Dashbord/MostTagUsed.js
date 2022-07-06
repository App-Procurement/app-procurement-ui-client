import React, { Component } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { t } from 'i18next';
class MostTagUsed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MostTagData: [
        {
          LineValue: 50,
          lableName: 'quotation',
          time: '452 times',
        },
        {
          LineValue: 30,
          lableName: 'Neworder',
          time: '97 times',
        },
        {
          LineValue: 70,
          lableName: 'approved',
          time: '61 times',
        },
      ],
      otherTagName: [
        { tagName: 'pending' },
        { tagName: 'confirm' },
        { tagName: 'Waitingforapproval' },
        { tagName: 'aaaa' },
        { tagName: 'bbbbbb' },
        { tagName: 'cccccc' },
        { tagName: 'dddddddd' },
      ],
      tagLimit: 3,
      expanded: false,
      activeCategoryIndex: 0,
    };
  }
  tagLimt = () => {
    this.setState((prev) => ({ expanded: !prev.expanded }));
  };

  displyOtherTag = () => {
    const tagLimit = 3;
    const { otherTagName, expanded } = this.state;
    var count = tagLimit;
    if (expanded) {
      count = otherTagName.length;
    }
    let retData = [];
    for (let i = 0; i < count; i++) {
      const item = otherTagName[i];
      retData.push(
        <Button variant="contained" className="btn btn-secondary" key={item.tagName}>
          &#35;{item.tagName}
        </Button>
      );
    }
    return retData;
  };

  render() {
    const { MostTagData, otherTagName } = this.state;
    const BorderLinearProgress = withStyles((theme) =>
      createStyles({
        root: {
          height: 10,
          borderRadius: 5,
        },
        colorPrimary: {
          backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
          borderRadius: 5,
          backgroundImage: 'linear-gradient(to right, #6418c3 , #9f19c5)',
        },
      })
    )(LinearProgress);
    return (
      <div className="most-used">
        <div className="heading">
          <h5>{t('Most Tag Used')}</h5>
          <span>Lorem ipsum dolor sit amet</span>
        </div>
        <div className="most-progress">
          <div>
            {MostTagData.map((element) => (
              <ul key={element.lableName}>
                <li>
                  <BorderLinearProgress variant="determinate" value={element.LineValue} />
                  <div className="progress-text">
                    <span>&#35;{element.lableName}</span>
                    <p>{element.time}</p>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="other-tag">
          <div className="heading">{t('Other tag')}</div>
          <div className="tag-btn">
            {this.displyOtherTag()}
            <Button variant="contained" className="btn btn-secondary" onClick={this.tagLimt}>
              {this.state.expanded ? 'See less' : otherTagName.length - 3}
              {!this.state.expanded && '+'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default MostTagUsed;
