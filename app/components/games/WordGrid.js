import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';

var count=0,tries=0,score=0,highscore=0;
var jsontemp= [], m2key=1;

ShowAlertDialog = () =>{
    Alert.alert(
        'Game Over',
        'Do you want to go back ?',
        [
         // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
         // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.props.navigation.goBack()}
        ],
        { cancelable: false }
    )
 
}

export default class WordGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { show:false }
    }
    onButton(val) {
     this.setState({show: true});
        jsontemp=this.props.data1;
        tries++;
        if(tries===7){
    //     ShowAlertDialog();
         } 
        if(jsontemp[count]===val)
        {
            count++; 
            score++;
            console.log("your score",score);
            if(val==jsontemp[2]){
                highscore=highscore<score?score:highscore;
                console.log("your high score",highscore);
                console.log("your score",score);
            }
        }
        else{
            score--;
            console.log("your score",score);
         let flag=0;
         for(var i=0;i<=count;i++){
             if(val===jsontemp[i]){flag=1}
            }
             if(flag===0){
         this.refs.view.bounce(800);
         this.setState({show: false});
         }}
   } 

    changeGrid(val){
      switch(this.state.show){
        case false:
         return(
            <View style={styles.gridStyle}>
        <Text style={{fontSize:65,fontWeight:'bold'}}>{this.props.name}</Text>
        </View> );
        break;
         case true: 
         return(
            <View style={styles.gridStyle1}>
        <Text style={{fontSize:65,fontWeight:'bold'}}>{this.props.name}</Text>
        </View> );
    } 
    }
   
  render() {
      if(this.props.mkey===m2key)
      { m2key++;jsontemp= [];count=0,score=0,tries=0;
       }
      //count=0;
        return (
        <TouchableWithoutFeedback onPress={this.onButton.bind(this, this.props.name)}>
        <Animatable.View ref="view">
        {this.changeGrid(this.props.name)}
        </Animatable.View>
        </TouchableWithoutFeedback>
        );
    }
}
const styles = {
    gridStyle:{ 
      backgroundColor:'white', marginLeft: '4%',
      marginTop: '8%',height:140,
      width:150,borderRadius: 30,
      alignItems:'center',justifyContent:'center',
      borderColor:'grey',borderWidth:1.8
    },
    gridStyle1:{
        backgroundColor:'yellow', marginLeft: '4%', 
        marginTop: '8%', height:140,
        width:150, borderRadius: 30,
        alignItems:'center',justifyContent:'center',
        borderColor:'grey',borderWidth:1.8
    }
}
