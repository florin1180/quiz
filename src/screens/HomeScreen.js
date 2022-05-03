import React, { Component } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'

class HttpExample extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true, 
      dataSource: null,
      question: null,
    }
  }

  getData(){
    setTimeout(() => {
      fetch('https://diacut.ro/PPL/get_question.php?id=1', {
          method: 'GET'
      })
      .then((response) => response.json()
      )
      .then(responseJson => {
          console.log('responseJson: '+responseJson);
          
          let q = responseJson.rsp[1];
          let qj = q.replace(/(?:\\r)?\\n/g, '\n');
          console.log(qj);

          this.setState({
            isLoading: false,
            dataSource: responseJson,
            question: qj,
          });
      })
      .catch((error) => {
          console.error(error);
      });
    }, 1000)
  }

  componentDidMount = () => {
    this.getData();
  }
   
  render() {

        if (this.state.isLoading === true) {
          return (
            <Text style={styles.loading}>
              Loading...
            </Text>
          );
        }

        return (
         <View style={styles.container}>

            <Text style={styles.question}>
              {this.state.dataSource === null ? 'dataSource empty' : this.state.dataSource.rsp[0]+'. '+this.state.question}
            </Text>

            <FlatList 
              data={this.state.dataSource.rsp[2]}
              keyExtractor={(item, index) => String(index)}
              renderItem={({item, index}) => 
                <Text style={[styles.answer_blocks, styles.shadowProp]}>{index+1}. {item}</Text>  
              }
            />
            
         </View>
      )
   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#eaeaea"
  },
  loading: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "normal"
  },
  question: {
    marginTop: 16,
    paddingLeft: 10, 
    paddingRight: 10,
    paddingVertical: 8,
    color: "#000000",
    textAlign: "left",
    fontSize: 19,
    fontWeight: "bold"
  },
  answer_blocks: {
    marginTop: 15,
    paddingLeft: 10, 
    marginLeft: 10, 
    paddingRight: 10,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    color: "#000000",
    textAlign: "left",
    fontSize: 13,
    paddingHorizontal: 25,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  }
});

export default HttpExample