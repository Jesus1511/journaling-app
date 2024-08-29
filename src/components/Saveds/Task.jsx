import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { CheckBox } from 'react-native-elements'
import trash from '../../../assets/images/trash.png'

const { width } = Dimensions.get("window");

export const Task = ({tareas, complete, handleCompleted, handleDeleted}) => {
  return (
    <View style={{marginTop: complete?40:0}}>
      {tareas.map((goal, index) => (
        <View style={[styles.tasksContainer, goal.complete && styles.completedContainerTask]} key={index}>
          <Text style={[styles.task, goal.complete && styles.completedTask]}>{goal.text}</Text>
          <View style={styles.buttonsContainer}>
            <Text>{goal.importance}%</Text>
            <CheckBox checked={complete} onPress={() => handleCompleted(goal.index)}/>
            <TouchableOpacity onPress={() => handleDeleted(goal.index)} style={styles.buttons}>
              <Image style={{ width: 20, height: 20,}} source={trash}/>
            </TouchableOpacity>
          </View>
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
    width: 330,
    marginVertical: 5,
    padding: 10,
    borderRadius:10,
    backgroundColor: "#f7f7f7"
  },
  task: {
    textAlignVertical:"center",
    width: 185,
    marginRight: 4,

  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#d0d0d0',
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
