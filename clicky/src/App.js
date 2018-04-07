import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import superheros from "./superheros.json";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";


let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to earn points!";
class App extends Component {
  
  state = {
    //matches,
    superheros,
    correctGuesses,
    bestScore,
    clickMessage
};


setClicked = id => {

  // Make a copy of the state matches array to work with
  const matches = this.state.matches;

  // Filter for the clicked match
  const clickedMatch = matches.filter(match => match.id === id);

  // If the matched image's clicked value is already true, 
  // do the game over actions
  if (clickedMatch[0].clicked){

      console.log ("Correct Guesses: " + correctGuesses);
      console.log ("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage = "Dang! You already clicked on that one! Now you have to start over!"

      for (let i = 0 ; i < matches.length ; i++){
          matches[i].clicked = false;
      }

      this.setState({clickMessage});
      this.setState({ correctGuesses });
      this.setState({matches});

  // Otherwise, if clicked = false, and the user hasn't finished
  } else if (correctGuesses < 11) {

      // Set its value to true
      clickedMatch[0].clicked = true;

      // increment the appropriate counter
      correctGuesses++;
      
      clickMessage = "Great! You haven't click on that one yet! Keep going!";

      if (correctGuesses > bestScore){
          bestScore = correctGuesses;
          this.setState({ bestScore });
      }

      // Shuffle the array to be rendered in a random order
      matches.sort(function(a, b){return 0.5 - Math.random()});

      // Set this.state.matches equal to the new matches array
      this.setState({ matches });
      this.setState({correctGuesses});
      this.setState({clickMessage});
  } else {

      // Set its value to true
      clickedMatch[0].clicked = true;

      // restart the guess counter
      correctGuesses = 0;

      // Egg on the user to play again
      clickMessage = "Try and do it again!";
      bestScore = 12;
      this.setState({ bestScore });
      
      for (let i = 0 ; i < matches.length ; i++){
          matches[i].clicked = false;
      }

      // Shuffle the array to be rendered in a random order
      matches.sort(function(a, b){return 0.5 - Math.random()});

      // Set this.state.matches equal to the new matches array
      this.setState({ matches });
      this.setState({correctGuesses});
      this.setState({clickMessage});

  }
};
  render() {
    return (
         <Wrapper>
               <Title>To boldly click where no one has clicked before!</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>

                {this.state.superheros.map(superhero => (
                    <superhero
                        setClicked={this.setClicked}
                        id={superhero.id}
                        key={superhero.id}
                        image={superhero.image}
                    />
                ))}
            </Wrapper>
    );
  }
}

export default App;
