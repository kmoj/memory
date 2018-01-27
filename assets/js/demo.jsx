import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Game side={0}/>, root);
}

class Tile extends React.Component {
    render() {
        return (
            <button className= {this.props.correctness? "tile-correct":"tile"} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
}

class RestartButton extends React.Component {
    render() {
        return (
            <button onClick={() => this.props.onClick()}>
                Restart
            </button>
        )
    }
}

class Board extends React.Component {

    constructor() {
        var letters = ['A','B','D','G','E','F','H','C','A','B','D','E','F','H','G','C'];
        super();
        this.state = {
            letters: letters,
            lastClicked: null,
            corrects: Array(16).fill(false),
            scores: 0,
        };
    }

    handleClick(i) {
        //var letters = ['A','B','D','G','E','F','H','C','A','B','D','E','F','H','G','C'];
        const corrects = this.state.corrects.slice();

        if(this.state.letters[i] === this.state.letters[this.state.lastClicked] && i !==this.state.lastClicked) {
            corrects[i] = true;
            corrects[this.state.lastClicked] = true;
            this.setState({
                letters: this.state.letters,
                lastClicked: i,
                corrects: corrects,
                scores: this.state.scores + 10,
            });

        } else {
            this.setState({
                letters: this.state.letters,
                lastClicked: i,
                correct: this.state.correct,
                scores: this.state.scores - 1,
            });
        }
    }

    handleRestartClick() {

        let shuffledLetters = this.state.letters;
         shuffledLetters.sort(function(){return Math.random()-0.5;});
            this.setState({
                letters: shuffledLetters,
                lastClicked: null,
                corrects: Array(16).fill(false),
                scores: 0,
            });
    }

    renderTile(i) {
        return <Tile value={this.state.letters[i]}
                     onClick={() => this.handleClick(i)}
                     correctness={this.state.corrects[i]}/>;
    }

    renderRestartButton() {
        return <RestartButton
                     onClick={() => this.handleRestartClick()}/>;
    }

    render() {
        const status = 'Scores: ' + this.state.scores;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderTile(0)}
                    {this.renderTile(1)}
                    {this.renderTile(2)}
                    {this.renderTile(3)}
                </div>
                <div className="board-row">
                    {this.renderTile(4)}
                    {this.renderTile(5)}
                    {this.renderTile(6)}
                    {this.renderTile(7)}
                </div>
                <div className="board-row">
                    {this.renderTile(8)}
                    {this.renderTile(9)}
                    {this.renderTile(10)}
                    {this.renderTile(11)}
                </div>
                <div className="board-row">
                    {this.renderTile(12)}
                    {this.renderTile(13)}
                    {this.renderTile(14)}
                    {this.renderTile(15)}
                </div>
                {this.renderRestartButton()}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

