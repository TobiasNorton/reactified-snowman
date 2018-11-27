import React, { Component } from 'react'
import './App.css'
import words from './words.json'
import Button from './Button.js'
import snowman_step_0 from './step_0.png'
import snowman_step_1 from './step_1.png'
import snowman_step_2 from './step_2.png'
import snowman_step_3 from './step_3.png'
import snowman_step_4 from './step_4.png'
import snowman_step_5 from './step_5.png'
import snowman_step_6 from './step_6.png'
import snowman_step_7 from './step_7.png'

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
      newGame: true,
      snowmanImages: [
        snowman_step_0,
        snowman_step_1,
        snowman_step_2,
        snowman_step_3,
        snowman_step_4,
        snowman_step_5,
        snowman_step_6,
        snowman_step_7
      ]
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

  letterClick = passedLetter => {
    this.state.chosenLetters.push(passedLetter)

    let wordAsAnArray = this.state.generatedWord.split('')
    wordAsAnArray.forEach(letter => {
      if (passedLetter === letter) {
        this.setSnowmanImage()
      }
    })

    this.setState(
      {
        chosenLetters: this.state.chosenLetters,
        newGame: false
      },
      () => {
        console.log(this.state.chosenLetters)
      }
    )
    console.log(snowman_step_0)
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
    let generatedWordArray = this.state.generatedWord.split('')
    let matchingLetters = this.state.chosenLetters.filter(letter => {
      return this.state.generatedWord.includes(letter)
    })

    if (matchingLetters.sort().join('') === generatedWordArray.sort().join('')) {
      return (
        <p key="game-complete" className="game-complete-header">
          Hey, you did it!
        </p>
      )
    }
  }

  newGameButton = () => {
    let generatedWordArray = this.state.generatedWord.split('')
    let matchingLetters = this.state.chosenLetters.filter(letter => {
      return this.state.generatedWord.includes(letter)
    })

    if (matchingLetters.sort().join('') === generatedWordArray.sort().join('')) {
      return (
        <button key="play-again" onClick={this.resetGame} className="new-game-button">
          Play Again
        </button>
      )
    }
    // console.log(`${matchingLetters} is a match`)
    // console.log(generatedWordArray.sort(), 'generated word array')
    // console.log(matchingLetters.sort(), 'matching letters')

    // let generatedWordSorted = this.state.generatedWord.sort()
    // if (this.state.chosenLetters.sort.join('').includes(generatedWordSorted)) {
    //   console.log('All letters received')
    // }

    // let completedWord = this.state.chosenLetters
    // if (this.state.generatedWord === completedWord.join('')) {
    //   return (
    //     <button key="play-again" onClick={this.resetGame} className="new-game-button">
    //       Play Again
    //     </button>
    //   )
    // }
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
            src={this.state.snowmanImages[this.state.snowmanStep]}
            alt={`Snowman step ${this.state.snowmanStep}`}
          />

          <p className="word">
            {this.state.generatedWord.split('').map((letter, index) => {
              let letterToShow = this.state.chosenLetters.includes(letter) ? letter : '_'
              return <span key={index}>{letterToShow.toUpperCase()}</span>
            })}
          </p>

          <section className="keyboard">
            {this.state.keyboard.map((row, rowIndex) => {
              return (
                <div key={rowIndex}>
                  {row.map((letter, letterIndex) => {
                    return (
                      <Button
                        key={letterIndex}
                        disabled={this.state.chosenLetters.includes(letter)}
                        letterClick={this.letterClick}
                        value={letter}
                      />
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
