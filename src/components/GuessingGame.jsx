import React, { useState } from 'react';

const GuessingGame = () => {
  const [numberToGuess, setNumberToGuess] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Notificaciones');
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [guessNumber, setGuessNumber] = useState('?');
  const [isFinished, setIsFinished] = useState(false);
  const [isOK, setIsOK] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  const handleGuess = (event) => {
    event.preventDefault();
    const guessedNumber = parseInt(guess);
    
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 20) {
      setMessage('Por favor ingresa un número válido entre 1 y 20.');
      return;
    }

    if (guessedNumber === numberToGuess) {
      setMessage(`¡Felicidades! Adivinaste el número ${numberToGuess}`);
      setGuessNumber(numberToGuess);
      setIsFinished(true);
      setIsOK(true);
      if (score > highScore) {
        setHighScore(score);
      }
    } else if (guessedNumber > numberToGuess) {
      setMessage('El número es más bajo.');
      setScore(prev => prev - 1);
    } else {
      setMessage('El número es más alto.');
      setScore(prev => prev - 1);
    }

    if (score - 1 === 0) {
      setMessage(`Perdiste. El número era ${numberToGuess}.`);
      setIsFinished(true);
      setIsOK(false);
    }
  };

  const resetGame = () => {
    setIsFinished(false);
    setIsOK(false);
    setGuessNumber('?');
    setMessage('Notificaiones');
    setNumberToGuess(generateRandomNumber());
    setScore(20);
    setGuess('');
  };

  return (
    <div className="game-container">
      <h1 className="title">Juego de Adivinar Número <span className='range'>entre 1 y 20</span></h1>
      
      <div className="game-panel">

        <div className="container-gues-number">
          <span className="guess-number" title="Aquí verás el número si lo adivinas">{guessNumber}</span>
        </div>

        <div className="score-panel">
          <p>Puntaje: {score}</p>
          <p>Puntaje más alto: {highScore}</p>
        </div>

        <form className="guess-panel" onSubmit={handleGuess}>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Ingresa tu adivinanza"
          />
          <button disabled={ isFinished }>Adivinar</button>
        </form>
      </div>

      <div className={`container-result ${isFinished ? (isOK ? 'success' : 'danger') : 'regular'}`}>
        <p className="result-message">{message}</p>
      </div>
      { isFinished && <button className='reset-button' id="reset" onClick={ resetGame }>Reiniciar</button> }
    </div>
  );
};

export default GuessingGame;
