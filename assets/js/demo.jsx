import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Game/>, root);
}

class Tile extends React.Component {

    render() {
        return (
            <button className= {this.props.correctness ? "tile-correct": this.props.isClicked? "tile2":"tile"}
                    onClick={() => this.props.onClick()}
                    disabled={this.props.isDisabled}>
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
            isDisabled:false,
            isClicked:Array(16).fill(false),
            corrects: Array(16).fill(false),
            scores: 0,
        };
    }

    handleClick(i) {
        const corrects = this.state.corrects.slice();

        if(this.state.letters[i] === this.state.letters[this.state.lastClicked] && i !==this.state.lastClicked) {
            corrects[i] = true;
            corrects[this.state.lastClicked] = true;
            this.setState({
                letters: this.state.letters,
                lastClicked: i,
                isDisabled: this.state.isDisabled,
                isClicked: this.state.isClicked,
                corrects: corrects,
                scores: this.state.scores + 10,
            });

        } else {
            let clicked = this.state.isClicked.slice();
            clicked[i] = true;
            this.setState({
                letters: this.state.letters,
                lastClicked: i,
                isDisabled: true,
                isClicked: clicked,
                correct: this.state.correct,
                scores: this.state.scores - 1,
            });

            setTimeout(()=>{
                clicked = Array(16).fill(false);
                this.setState({
                    letters: this.state.letters,
                    lastClicked: i,
                    isDisabled: false,
                    isClicked: clicked,
                    correct: this.state.correct,
                    scores: this.state.scores,
                });
            },1000);
        }
    }

    handleRestartClick() {

        let shuffledLetters = this.state.letters;
        shuffledLetters.sort(()=>{return Math.random()-0.5;});
        this.setState({
            letters: shuffledLetters,
            lastClicked: null,
            isDisabled: this.state.isDisabled,
            isClicked: this.state.isClicked,
            corrects: Array(16).fill(false),
            scores: 0,
        });
    }

    renderTile(i) {
        return <Tile value={this.state.letters[i]}
                     onClick={() => this.handleClick(i)}
                     isDisabled={this.state.isDisabled}
                     isClicked={this.state.isClicked[i]}
                     correctness={this.state.corrects[i]}/>;
    }

    renderRestartButton() {
        return <RestartButton
            onClick={() => this.handleRestartClick()}/>;
    }

    render() {
        const scores = 'Scores: ' + this.state.scores;

        return (
            <div className="game-board">
                <div>{scores}</div>
                <div className="tile-table">
                    <table>
                        <tbody>
                        <tr>
                            <td>{this.renderTile(0)}</td>
                            <td>{this.renderTile(1)}</td>
                            <td>{this.renderTile(2)}</td>
                            <td>{this.renderTile(3)}</td>
                        </tr>
                        <tr>

                            <td>{this.renderTile(4)}</td>
                            <td>{this.renderTile(5)}</td>
                            <td>{this.renderTile(6)}</td>
                            <td>{this.renderTile(7)}</td>
                        </tr>
                        <tr>
                            <td>{this.renderTile(8)}</td>
                            <td>{this.renderTile(9)}</td>
                            <td>{this.renderTile(10)}</td>
                            <td> {this.renderTile(11)}</td>
                        </tr>
                        <tr>
                            <td>{this.renderTile(12)}</td>
                            <td> {this.renderTile(13)}</td>
                            <td> {this.renderTile(14)}</td>
                            <td>{this.renderTile(15)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>{this.renderRestartButton()}</div>
                <p>Rules: every click on the tile will deduct 1 points from the totall score.<br/>
                    find a match will get 10 points.</p>

            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <Board />
            </div>
        );
    }
}

