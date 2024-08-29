import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { CheckBox } from 'react-native-elements'
import trash from '../../../assets/images/trash.png'

const { width } = Dimensions.get("window");

export const Task = ({tareas, handleDeleted}) => {
  return (
    <View>
      {tareas.map((goal, index) => (
        <View style={styles.tasksContainer} key={index}>
          <Text style={styles.task}>{goal.importance}° {goal.text}</Text>
          <TouchableOpacity onPress={() => handleDeleted(goal.index)} style={styles.buttons}>
              <Image style={{ width: 20, height: 20,}} source={trash}/>
            </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    width: 20,
    height: 20,
  },
  tasksContainer: {
    flexDirection: "row",
    marginVertical: 5,
    width:300,
    padding: 10,
    borderRadius:10,
    justifyContent:"center"
  },
  task: {
    textAlignVertical:"center",
    marginRight: 4,
    fontSize: 18,
    textAlign:"left",
    width: 250,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: 100,
    alignItems: "center",
  },
  completedContainerTask: {
    backgroundColor:"#f7f7f73f"
  }
})
