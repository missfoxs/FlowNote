import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from '../pages/home';
import CategoryScreen from '../pages/category';

export const Router_Name = {
    Home: 'Home',
    Category: 'Category',
}

export default function Entry() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Router_Name.Home}>
        <Stack.Screen name={Router_Name.Home} component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name={Router_Name.Category} component={CategoryScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}