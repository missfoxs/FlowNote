import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/home';
import CategoryScreen from '../pages/category';
import Statistics from '../pages/statistics';
import { Icon } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 修复：区分 Stack 和 Tab 的路由名称
export const Router_Name = {
	Entry: 'Entry',
	Home: 'Home',
	Category: 'Category',
	Statistics: 'Statistics',
	// 添加 Tab 路由名称
	HomeTab: 'HomeTab',
	StatisticsTab: 'StatisticsTab',
};

// Home 相关的 Stack 导航
const HomeStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name={Router_Name.Home} component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name={Router_Name.Category} component={CategoryScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

// Statistics 相关的 Stack 导航
const StatisticsStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name={Router_Name.Statistics} component={Statistics} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

// 主 Tab 导航
export default function Entry() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: '#007AFF', // 激活颜色
					tabBarInactiveTintColor: 'gray', // 未激活颜色
				}}
			>
				<Tab.Screen
					name={Router_Name.HomeTab}
					component={HomeStackNavigator}
					options={{
						title: '首页',
						tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} />,
					}}
				/>
				<Tab.Screen
					name={Router_Name.StatisticsTab}
					component={StatisticsStackNavigator}
					options={{
						title: '统计',
						tabBarIcon: ({ color, size }) => <Icon source="chart-bar" color={color} size={size} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
