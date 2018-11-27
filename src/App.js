import React, { Component } from 'react'
import './App.css'
import words from './words.json'
// import Button from './Button.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chosenLetters: [],
      generatedWord: '',
      keyboard: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
      ],
      snowmanStep: 0,
      newGame: true
    }
  }

  componentDidMount() {
    this.generateRandomWord()
  }

  generateRandomWord = () => {
    let randomNumber = Math.floor(Math.random() * words.length)
    let randomWord = words[randomNumber]
    this.setState({
      generatedWord: randomWord
    })
    console.log(`"${randomWord}" is the word of the game`)
  }

  letterClick = event => {
    this.state.chosenLetters.push(event.target.value)

    let wordAsAnArray = this.state.generatedWord.split('')
    wordAsAnArray.map(letter => {
      if (event.target.value === letter) {
        this.setSnowmanImage()
      }
    })

    this.setState(
      {
        chosenLetters: this.state.chosenLetters
      },
      () => {
        console.log(this.state.chosenLetters)
      }
    )

    this.setState({
      newGame: false
    })

    // // this.state.chosenLetters.push(event.target.value)
    // let wordAsAnArray = this.state.generatedWord.split('')
    // wordAsAnArray.map(letter => {
    //   if (event.target.value === letter) {
    //     this.setSnowmanImage()
    //     this.state.correctLetters.push(this.state.generatedWord.indexOf(letter), 1, letter)
    //   }
    // })
    // console.log(this.state.correctLetters)
    // this.setState({
    //   correctLetters: this.state.correctLetters,
    //   newGame: false
    // })
    // this.gamePrompt()
  }

  gamePrompt = () => {
    if (this.state.newGame === true) {
      return <h3>Select a Letter to Begin</h3>
    } else {
      return
    }
  }

  setSnowmanImage = () => {
    this.setState({
      snowmanStep: this.state.snowmanStep + 1
    })
  }

  gameCompleteHeader = () => {
    let completedWord = this.state.chosenLetters
    if (this.state.generatedWord === completedWord.join('')) {
      return (
        <p key="game-complete" className="game-complete-header">
          Hey, you did it!
        </p>
      )
    }
  }

  newGameButton = () => {
    let completedWord = this.state.chosenLetters
    if (this.state.generatedWord === completedWord.join('')) {
      return (
        <button key="play-again" onClick={this.resetGame} className="new-game-button">
          Play Again
        </button>
      )
    }
  }

  resetGame = () => {
    this.generateRandomWord()
    this.setState({
      snowmanStep: 0,
      chosenLetters: [],
      newGame: true
    })
  }

  render() {
    return (
      <div>
        <h1>Build A Snowman</h1>
        {this.gamePrompt()}
        {this.gameCompleteHeader()}
        <div className="reset-container">{this.newGameButton()}</div>
        <div>
          <img
            className="snowman-image"
            src={`./snowman_images/step_${this.state.snowmanStep}.png`}
            alt={`Snowman step ${this.state.snowmanStep}`}
          />

          <p className="word">
            {this.state.generatedWord.split('').map(letter => {
              let letterToShow = this.state.chosenLetters.includes(letter) ? letter : '_'
              return <span key="letter-to-show">{letterToShow.toUpperCase()}</span>
            })}
          </p>

          <section className="keyboard">
            {this.state.keyboard.map((row, rowIndex) => {
              return (
                <div key={rowIndex}>
                  {row.map((letter, letterIndex) => {
                    return (
                      <button
                        key={letterIndex}
                        onClick={this.letterClick}
                        disabled={this.state.chosenLetters.includes(letter)}
                        value={letter}
                      >
                        {letter}
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </section>
        </div>
      </div>
    )
  }
}

export default App
