import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import { Home, Truck, Clock, Settings as SettingsIcon } from "lucide-react-native"

// Screens
import HomeScreen from "./screens/HomeScreen"
import ScannerScreen from "./screens/ScannerScreen"
import DeliveryDetailsScreen from "./screens/DeliveryDetailsScreen"
import HistoryScreen from "./screens/HistoryScreen"
import SettingsScreen from "./screens/SettingsScreen"

// Context
import { ThemeProvider } from "./context/ThemeContext"
import { DeliveryProvider } from "./context/DeliveryContext"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <Home size={size} color={color} />
          } else if (route.name === "Scanner") {
            return <Truck size={size} color={color} />
          } else if (route.name === "History") {
            return <Clock size={size} color={color} />
          } else if (route.name === "Settings") {
            return <SettingsIcon size={size} color={color} />
          }
        },
        tabBarActiveTintColor: "#0284c7",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scanner" component={ScannerScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <DeliveryProvider>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
              <Stack.Screen
                name="DeliveryDetails"
                component={DeliveryDetailsScreen}
                options={{ title: "Delivery Details" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </DeliveryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
