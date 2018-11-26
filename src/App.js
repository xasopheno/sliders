import 'rc-slider/assets/index.css';
import React, {Component} from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

const style = {
  sliderContainer: {
    margin: 50,
  },
  inputContainer: {
    margin: "10px",
  },
  newButton: {
    backgroundColor: "bisque",
    width: "100px",
    padding: "20px",
    textAlign: "center",
    margin: 'auto 10px'
  },
  deleteButton: {
    backgroundColor: "bisque",
    width: "50px",
    padding: "10px",
    textAlign: "center",
    margin: 'auto 0',
    marginTop: '40px'
  },
  sliderLabelContainer: {display: 'flex', flexDirection: 'column'},
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: {
        title: '',
        left: '',
        right: ''
      },
      sliders: [],
      pointsPossible: 100,
      score: 0
    };
  }

  handleChange = (value, i) => {
    let sliders = [...this.state.sliders];
    sliders[i].value = value;
    this.setState({
      sliders,
    });
  };

  renderSliders = () => {
    return (
      <div>
        {
          this.state.sliders.map((slider, i) => {
            return this.renderSlider(slider, i)
          })
        }
      </div>
    )
  };

  removeSlider(i) {
    let sliders = [...this.state.sliders];
    sliders.splice(i, 1)
    this.setState({
      sliders,
    });
  }

  renderSlider = (slider, i) => {
    return (
      <div key={i} style={style.sliderContainer}>
        <div style={style.sliderLabelContainer}>
          <h3 style={{alignSelf: 'center'}}>{this.state.sliders[i].title_label}</h3>
          <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <p>{this.state.sliders[i].left_label}</p>
            <p>{this.state.sliders[i].right_label}</p>
          </div>
        </div>
        <Range
          value={this.state.sliders[i].value}
          onChange={(e) => this.handleChange(e, i)}
        />
        <div style = {{display: "flex", justifyContent: "flex-end", flexDirection: 'row'}}>
          <div onClick={() => this.removeSlider(i)}>
           <p style={style.deleteButton}>X</p>
          </div>
        </div>
      </div>
    );
  };

  titleChange = (e) => {
    this.setState({
      ...this.state,
      new: {
        ...this.state.new,
        title: e.target.value
      }
    })
  }

  leftChange = (e) => {
    this.setState({
      ...this.state,
      new: {
        ...this.state.new,
        left: e.target.value
      }
    })
  };

  rightChange = (e) => {
    this.setState({
      ...this.state,
      new: {
        ...this.state.new,
        right: e.target.value
      }
    })
  };

  newSlider() {
    let sliders = [...this.state.sliders];
    let new_slider = {
      title_label: this.state.new.title,
      left_label: this.state.new.left,
      right_label: this.state.new.right,
      value: [20, 50, 80],
    };

    sliders.push(new_slider);
    this.setState({
      new: {
        title: '',
        left: '',
        right: '',
      },
      sliders,
    });
  }

  calculateScore() {
    let sliders = [...this.state.sliders];
    let values = sliders.map((obj) => obj.value);
    let total = 0;
    let score = 0;
    values.forEach(value => {
        score += value[1] - value[0];
        total += value[2] - value[0];
    });

    return { score, total }

  }

  renderScore = () => {
    let {score, total} = this.calculateScore();

    if (total > 0) {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <p style={{alignSelf: 'center'}}>{score} / {total}</p>
          <p style={{alignSelf: 'center'}}>Score: {(score / total).toFixed(3)}</p>
        </div>
      )
    } else {
      return <div />
    }
  };

  render() {
    return (
      <div style={{backgroundColor: 'whitesmoke', height: "100%"}}>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div
            onClick={() => this.newSlider()}
            style={style.newButton}>
            New
          </div>
          <div style={style.inputContainer}>
            <p>Title</p>
            <input onChange={(e) => this.titleChange(e)} value={this.state.new.title}/>
          </div>
          <div style={style.inputContainer}>
            <p>Left Label</p>
            <input onChange={(e) => this.leftChange(e)} value={this.state.new.left}/>
          </div>
          <div style={style.inputContainer}>
            <p>Right Label</p>
            <input onChange={(e) => this.rightChange(e)}  value={this.state.new.right}/>
          </div>

        </div>
        {this.renderScore()}
        {this.renderSliders()}
      </div>
    );
  }
}

export default App


