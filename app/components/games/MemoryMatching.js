import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import TileGrid from './TileGrid';
import Orientation from 'react-native-orientation';
import Board from './Board';
import Card from './Card';
import ScoreBoard from './ScoreBoard';

export default class MemoryMatching extends Component {
  constructor(props) {
    super(props);
    this.state = {board: new Board(4 , 4), players: 1}
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }

  onRestartPress() {
    alert("RestartGame!!!");
  }

  makeSinglePlayer() {
    alert("makeSinglePlayer!!!");
  }

  isGameOver() {
    var board = this.state.board,
        totalScore = board.score[0] + board.score[1],
        maxScore = board.maxScore,
        msg;

    if (totalScore < maxScore) {
        return false;
    }

    if (this.state.players === 1) {
        msg = 'Hey!! You\'ve done it!';
      }

    Alert.alert(
        'Game Over',
        msg,
        [
          {text: 'Alright!'},
          {text: 'Start new'}
      ]
    );

    return true;
  }

  getScoreboard() {
      var board = this.state.board;

      if (this.state.players === 1) {
        return <ScoreBoard board={board}/>;
      }
  }


handleCardPress(url: string, row: number, col: number) {
  var board = this.state.board;
  var previous = board.selected;
  var selected = this.refs['card' + row + col];
  var current = {
      url: url,
      node: selected
  }

  if (!previous) {
      // first card
      board.selected = current;
  } else if (previous.url === url) {
      // successful hit
      previous.node.setPaired();
      selected.setPaired();

      this.setState({board: board.pair()});
  } else {
      // missed hit
      board.miss(true);

      setTimeout(
          () => {
              selected.hide();
              previous.node.hide();
              this.setState({board: board});
          },
        100
      );
  }
}

onCardHide() {
    this.state.board.unlock();
  }

  canShow() {
    return !this.state.board.isLocked;
  }

  render() {
  
    var board = this.state.board;
    console.log(this.state.board);
    var rows = board.grid.map((cards, row) =>
    <View key={'row' + row} ref={'row' + row} style={styles.row}>
        {cards.map((cardCfg, col) =>
          <Card
            key={'col' + col}
            ref={'card' + row + col}
            img={cardCfg.url}
            onPress={this.handleCardPress.bind(this, cardCfg.url, row, col)}
            onHide={this.onCardHide}
            canShow={this.canShow}
            cardCfg={cardCfg}
          />
        )}
      </View>
    );
    

    return (
      <View style={styles.container}>

        <View style={styles.board}>
          {rows}
        </View>

        {this.getScoreboard()}

        <TouchableHighlight
            onPress={this.onRestartPress}
            underlayColor="transparent"
            activeOpacity={0.5}>
            <Text style={styles.buttonText}>🔄 Restart</Text>
          </TouchableHighlight>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F9CB',
    width: '100%',
    height: '100%'
  },
  title: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 39,
    marginBottom: 0,
    color: '#535659',
  },
  buttonText: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 16,
    marginTop: 25,
    color: '#535659',
  },
  playerToggleButtons: {
    flexDirection: 'row',
  },
  board: {
    padding: 5,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  }
});