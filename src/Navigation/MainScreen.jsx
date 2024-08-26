import { StyleSheet, ScrollView } from 'react-native';
import TodayScreen from '../screens/TodayScreen';
import SavedsScreen from '../screens/SavedsScreen';

const MainScreen = () => {
  return (
    <>
      <ScrollView style={styles.scrollView} horizontal pagingEnabled>
        <TodayScreen />
        <SavedsScreen />
      </ScrollView>
    </>
  )
}

export default MainScreen

const styles = StyleSheet.create({});
