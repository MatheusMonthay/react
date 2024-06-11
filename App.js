import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import BookScreen from "./screens/BookScreen";
import ChapterScreen from "./screens/ChapterScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Bem-vindo!" }}
        />
        <Stack.Screen
          name="Books"
          component={BookScreen}
          options={{ title: "Livros" }}
        />
        <Stack.Screen
          name="Chapter"
          component={ChapterScreen}
          options={({ route }) => ({ title: `${route.params.abbrev} ${route.params.chapter}` })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
