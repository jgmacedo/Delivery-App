"use client"
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "twrnc"
import { Moon, Sun, Smartphone, LogOut, User, Bell } from "lucide-react-native"

import { useTheme } from "../context/ThemeContext"

export default function SettingsScreen() {
  const { isDark, themeMode, setThemeMode } = useTheme()

  const bgColor = isDark ? tw`bg-gray-900` : tw`bg-gray-50`
  const textColor = isDark ? tw`text-white` : tw`text-gray-900`
  const cardBg = isDark ? tw`bg-gray-800` : tw`bg-white`

  return (
    <SafeAreaView style={[tw`flex-1`, bgColor]}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <Text style={[tw`text-2xl font-bold mb-6`, textColor]}>Settings</Text>

          <View style={[tw`rounded-lg mb-6 overflow-hidden`, cardBg]}>
            <View style={tw`p-4 border-b border-gray-200 dark:border-gray-700`}>
              <Text style={[tw`text-lg font-semibold mb-4`, textColor]}>Appearance</Text>

              <View style={tw`flex-row items-center justify-between mb-4`}>
                <View style={tw`flex-row items-center`}>
                  <Sun size={20} color={isDark ? "#9ca3af" : "#4b5563"} />
                  <Text style={[tw`ml-3`, textColor]}>Light Mode</Text>
                </View>
                <Switch
                  value={themeMode === "light"}
                  onValueChange={(value) => setThemeMode(value ? "light" : "dark")}
                  trackColor={{ false: "#767577", true: "#2563eb" }}
                  thumbColor="#ffffff"
                />
              </View>

              <View style={tw`flex-row items-center justify-between mb-4`}>
                <View style={tw`flex-row items-center`}>
                  <Moon size={20} color={isDark ? "#9ca3af" : "#4b5563"} />
                  <Text style={[tw`ml-3`, textColor]}>Dark Mode</Text>
                </View>
                <Switch
                  value={themeMode === "dark"}
                  onValueChange={(value) => setThemeMode(value ? "dark" : "light")}
                  trackColor={{ false: "#767577", true: "#2563eb" }}
                  thumbColor="#ffffff"
                />
              </View>

              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center`}>
                  <Smartphone size={20} color={isDark ? "#9ca3af" : "#4b5563"} />
                  <Text style={[tw`ml-3`, textColor]}>Use System Settings</Text>
                </View>
                <Switch
                  value={themeMode === "system"}
                  onValueChange={(value) => setThemeMode(value ? "system" : isDark ? "dark" : "light")}
                  trackColor={{ false: "#767577", true: "#2563eb" }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>

            <View style={tw`p-4 border-b border-gray-200 dark:border-gray-700`}>
              <Text style={[tw`text-lg font-semibold mb-4`, textColor]}>Notifications</Text>

              <View style={tw`flex-row items-center justify-between mb-4`}>
                <View style={tw`flex-row items-center`}>
                  <Bell size={20} color={isDark ? "#9ca3af" : "#4b5563"} />
                  <Text style={[tw`ml-3`, textColor]}>Push Notifications</Text>
                </View>
                <Switch value={true} trackColor={{ false: "#767577", true: "#2563eb" }} thumbColor="#ffffff" />
              </View>
            </View>

            <View style={tw`p-4`}>
              <Text style={[tw`text-lg font-semibold mb-4`, textColor]}>Account</Text>

              <TouchableOpacity style={tw`flex-row items-center py-2`}>
                <User size={20} color={isDark ? "#9ca3af" : "#4b5563"} />
                <Text style={[tw`ml-3`, textColor]}>Profile Information</Text>
              </TouchableOpacity>

              <TouchableOpacity style={tw`flex-row items-center py-2 mt-2`}>
                <LogOut size={20} color="#ef4444" />
                <Text style={tw`ml-3 text-red-500`}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[tw`p-4 rounded-lg`, cardBg]}>
            <Text style={[tw`text-center text-gray-500 dark:text-gray-400`]}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
