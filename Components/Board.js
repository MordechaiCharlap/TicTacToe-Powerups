import React, { Component } from "react";
import Square from "./Square";
import { View, StyleSheet, Text, Pressable } from "react-native";
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      turn: true,
      squares: Array(9).fill(null),
    };
  }
  message() {
    if (this.state.isActive == true) {
      return `${this.state.turn == true ? "X" : "O"}'s turn`;
    } else if (this.state.isActive == false) {
      return `${this.state.turn == true ? "X" : "O"} won the game`;
    } else if (this.state.isActive == null) {
      return "It's a tie!";
    }
  }
  checkWin(squaresClone) {
    const squares = squaresClone;
    if (
      (squares[0] == squares[1] &&
        squares[0] == squares[2] &&
        squares[0] != null) ||
      (squares[3] == squares[4] &&
        squares[3] == squares[5] &&
        squares[3] != null) ||
      (squares[6] == squares[7] &&
        squares[6] == squares[8] &&
        squares[6] != null) ||
      (squares[0] == squares[3] &&
        squares[0] == squares[6] &&
        squares[0] != null) ||
      (squares[1] == squares[4] &&
        squares[1] == squares[7] &&
        squares[1] != null) ||
      (squares[2] == squares[5] &&
        squares[2] == squares[8] &&
        squares[2] != null) ||
      (squares[0] == squares[4] &&
        squares[0] == squares[8] &&
        squares[0] != null) ||
      (squares[2] == squares[4] &&
        squares[2] == squares[6] &&
        squares[2] != null)
    ) {
      this.setState({ isActive: false });
      this.props.onWinnerChosen(this.state.turn);
    } else {
      if (squaresClone.every((square) => square != null)) {
        this.setState({ isActive: null });
      } else {
        this.setState({ turn: !this.state.turn });
      }
    }
  }
  handleClick(i) {
    if (this.state.isActive) {
      if (this.state.squares[i] == null) {
        const squaresClone = this.state.squares.slice();
        if (this.state.turn) squaresClone[i] = "X";
        else squaresClone[i] = "O";
        this.setState(
          {
            squares: squaresClone,
          },
          this.checkWin(squaresClone)
        );
      }
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        pressed={() => this.handleClick(i)}
      ></Square>
    );
  }
  renderBoard() {
    return (
      <View>
        <View style={styles.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    );
  }
  startOverButton() {
    if (this.state.isActive == null)
      return (
        <Pressable
          style={styles.startOverButton}
          onPress={() => this.handleStartOver()}
        >
          <Text style={styles.startOverText}>Start over!</Text>
        </Pressable>
      );
    else
      return (
        <Pressable
          style={styles.startOverButtonInvisible}
          onPress={() => this.handleStartOver()}
        >
          <Text style={styles.startOverText}>Start over!</Text>
        </Pressable>
      );
  }
  handleStartOver() {
    this.setState({
      isActive: true,
      turn: !this.state.turn,
      squares: this.state.squares.fill(null),
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.message()}</Text>
        {this.renderBoard()}
        {this.startOverButton()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  boardRow: {
    flex: 1,
    flexDirection: "row",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  startOverButton: {
    margin: 10,
    backgroundColor: "#1e3755",
    borderWidth: 1,
    borderColor: "black",
  },
  startOverButtonInvisible: {
    visibility: "hidden",
    margin: 10,
    backgroundColor: "#1e3755",
    borderWidth: 1,
    borderColor: "black",
  },
  startOverText: {
    color: "white",
  },
});
export default Board;
