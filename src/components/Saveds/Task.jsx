import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const { width } = Dimensions.get("window");

export const Task = ({tareas, complete, handleCompleted, handleDeleted}) => {
  return (
    <View style={{marginTop: complete?40:0}}>
      {tareas.map((goal, index) => (
        <View style={[styles.tasksContainer, goal.complete && styles.completedContainerTask]} key={index}>
          <Text style={[styles.task, goal.complete && styles.completedTask]}>{goal.text}</Text>
          <View style={styles.buttonsContainer}>
            <Text>{goal.importance}%</Text>
            <TouchableOpacity onPress={() => handleCompleted(goal.index)} style={[styles.buttons, {backgroundColor: goal.complete ? "green" : "red"}]}>
              <Image />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleted(goal.index)} style={styles.buttons}>
              <Image />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "red",
    width: 20,
    height: 20,
    margin: 2
  },
  tasksContainer: {
    flexDirection: "row",
    width,
    marginVertical: 5,
    padding: 20,
    backgroundColor: "#f7f7f7"
  },
  task: {
    marginVertical: 5,
    width: "70%",
    marginRight: "4%"
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#d0d0d0',
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "28%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  completedContainerTask: {
    backgroundColor:"#f7f7f73f"
  }
})
