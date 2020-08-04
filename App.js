import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Direction,
  TouchableOpacity,
  Alert,
  Button,

} from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';


export default class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      counter: 0,
      scoreX: 0,
      scoreO: 0,
    }
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      counter: 0,

    });
  }

  //  1 - player 1 wins
  // -1 - plawer 2 wins
  //  0 - no one wins
  getWinner = () => {
    const NUM_TILES = 3;
    arr = this.state.gameState;
    var sum;

    //checking rows
    for(var i=0; i<NUM_TILES; i++){

      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum == 3) return 1;
      else if(sum == -3) return -1;
    }

    //checking collums
    for(var i=0; i<NUM_TILES; i++){
      
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum == 3) return 1;
      else if(sum == -3) return -1;
    }

    //checking diag 1
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum == 3) return 1;
    else if(sum == -3) return -1;

    //checking diag 2
    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if(sum == 3) return 1;
    else if(sum == -3) return -1;

    //no winners
    return 0;
  }

  onTilePress(row, col){

    //if not blank, u cant change the tile
    var value = this.state.gameState[row][col];
    if (value !== 0) return;

    //grab current player
    var currentPlayer = this.state.currentPlayer;

    // set the titles
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    //switching player 
    this.setState({currentPlayer: this.state.currentPlayer * -1});

    //cheking for winners
    var winner = this.getWinner();
    if(winner == 1){
        Alert.alert("Player X is the winner!");
        this.state.scoreX = this.state.scoreX + 1;
        //Alert.alert({thisscoreO});
        //this.scoreO++;
        this.initializeGame();
    }
    else if(winner == -1){ 
        Alert.alert("Player O is the winner!");
        this.state.scoreO = this.state.scoreO + 1;
       // Alert.alert({scoreX});
        this.initializeGame();
    }
    else if(this.counter == 8){
        Alert.alert("No one won!");
        this.initializeGame();
    } 

  }

  onNewGamePress = () =>{
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    var value =  this.state.gameState[row][col];

    switch(value){
      case 1: return <Icon name='close' style={styles.tileX} />;
      case -1: return <Icon name='circle-outline' style={styles.tileO} />;
      default: return <View/>;
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.score}>
            <Text style={styles.title}>Player X</Text>
            <Text style={styles.title}>Player O</Text>
        </View>
        <View style={styles.score}>
            <Text style={styles.results}>{this.state.scoreX}</Text>
            <Text style={styles.results}>{this.state.scoreO}</Text>
        </View>
        
        <View style={{paddingTop: 30}} />
        
        <View style={{flexDirection:'row'}}>

          <TouchableOpacity 
          onPress={()=> this.onTilePress(0, 0)} 
          style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}
          >
              {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=> this.onTilePress(0, 1)} 
          style={[styles.tile, {borderTopWidth: 0}]}
          >
              {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=> this.onTilePress(0, 2)} 
          style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0}]}
          >
              {this.renderIcon(0, 2)} 
          </TouchableOpacity>

        </View>
        <View style={{flexDirection:'row'}}>

          <TouchableOpacity 
          onPress={()=> this.onTilePress(1, 0)} 
          style={[styles.tile, {borderLeftWidth: 0}]}
          >
              {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=> this.onTilePress(1, 1)} 
          style={styles.tile}
          >
              {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=> this.onTilePress(1, 2)} 
          style={[styles.tile, {borderRightWidth: 0}]}
          >
              {this.renderIcon(1, 2)}
          </TouchableOpacity>

        </View>
        <View style={{flexDirection:'row'}}>

          <TouchableOpacity 
          onPress={()=> this.onTilePress(2, 0)} 
          style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}
          >
              {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=> this.onTilePress(2, 1)} 
          style={[styles.tile, {borderBottomWidth: 0}]}
          >
              {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=> this.onTilePress(2, 2)} 
          style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0}]}
          >
              {this.renderIcon(2, 2)}  
          </TouchableOpacity>

        </View>

        <View style={{paddingTop: 50}} />
        <Button title='New Game' onPress={this.onNewGamePress} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
    alignItems: 'center',
    justifyContent: 'center',

  },

  text: {

    textAlign:'center',
    color:'gray',
    backgroundColor:'#89cff0',
    fontSize:25,
    padding:15,
    
    //alignItems: 'left',
    //justifyContent: 'left',
  },

  tile:{
    borderWidth: 4,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',

  },

  tileX:{
    color: 'red',
    fontSize: 90,

  },

  tileO: {
    color: 'blue',
    fontSize: 75,

  },

  score:{
    flexDirection: 'row',

  },

  title:{
    height:100,
    textAlign:'center',
    width:'50%',
    fontSize:35,
    marginTop:24,
    color:'#404040',
  },

  results:{

    height:80,
    textAlign:'center',
    width:'50%',
    fontSize:35,
    //marginTop:24,
    marginBottom: 10,
    color:'gray',
    
  },

});
