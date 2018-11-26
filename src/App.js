import 'rc-slider/assets/index.css';
import React, {Component} from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';

const Range = Slider.Range;


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
      <SliderContainer key={i} >
        <div style={style.sliderLabelContainer}>
          <SliderTitle>{this.state.sliders[i].title_label}</SliderTitle>
          <SliderLabelContainer>
            <p>{this.state.sliders[i].left_label}</p>
            <p>{this.state.sliders[i].right_label}</p>
          </SliderLabelContainer>
        </div>
        <Range
          value={this.state.sliders[i].value}
          onChange={(e) => this.handleChange(e, i)}
        />
        <DeleteButtonContainer>
          <DeleteButton onClick={() => this.removeSlider(i)}>
           <p>X</p>
          </DeleteButton>
        </DeleteButtonContainer>
      </SliderContainer>
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
        <ScoreContainer>
          <Score>{score} / {total}</Score>
          <Score>Score: {(score / total).toFixed(3)}</Score>
        </ScoreContainer>
      )
    } else {
      return <div />
    }
  };

  render() {
    return (
      <MainContainer>
        <NewContainer>
          <NewButton
            onClick={() => this.newSlider()}>
            <p>New</p>
          </NewButton>

          <InputContainer>
            <p>Title: </p>
            <Input onChange={(e) => this.titleChange(e)} value={this.state.new.title}/>
          </InputContainer>

          <InputContainer>
          <p>Left: </p>
            <Input onChange={(e) => this.leftChange(e)} value={this.state.new.left}/>
          </InputContainer>

          <InputContainer>
            <p>Right:</p>
            <Input onChange={(e) => this.rightChange(e)}  value={this.state.new.right}/>
          </InputContainer>
        </NewContainer>
        {this.renderScore()}
        {this.renderSliders()}
      </MainContainer>
    );
  }
}

const Input = styled.input`
    height: 30px;
    font-size: 20px;
`;

const Score = styled.h3`
  align-self: center;
  margin: 0;
  margin-top: 10px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

const SliderLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const NewContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainContainer = styled.div`
  background-color: whitesmoke;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const SliderTitle = styled.h3`
  align-self: center
`;

const SliderContainer = styled.div`
  margin: 5px 50px 5px 50px;
  
`;

const InputContainer = styled.div`
  margin: 10px
`;

const NewButton = styled.div`
    background-color: bisque;
    width: 100px;
    padding: 20px;
    text-align: center;
    margin: auto 0;
`;

const DeleteButton = styled.div`
    background-color: bisque;
    width: 50px;
    padding: 10px;
    text-align: center;
    margin: auto 0;
    margin-top: 30px;
`;

const style = {
  deleteButton: {

  },
  sliderLabelContainer: {display: 'flex', flexDirection: 'column'},
};


export default App


