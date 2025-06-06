"use client"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Package, QrCode, CheckCircle } from "lucide-react-native"
import tw from "twrnc"

import { useDelivery } from "../context/DeliveryContext"
import { useTheme } from "../context/ThemeContext"

export default function HomeScreen() {
  const navigation = useNavigation()
  const { currentDelivery } = useDelivery()
  const { isDark } = useTheme()

  const bgColor = isDark ? tw`bg-gray-900` : tw`bg-gray-50`
  const textColor = isDark ? tw`text-white` : tw`text-gray-900`
  const cardBg = isDark ? tw`bg-gray-800` : tw`bg-white`

  return (
    <SafeAreaView style={[tw`flex-1`, bgColor]}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <Text style={[tw`text-2xl font-bold mb-6`, textColor]}>Delivery Dashboard</Text>

          {currentDelivery ? (
            <TouchableOpacity
              style={[tw`p-4 rounded-lg mb-4`, cardBg]}
              onPress={() => navigation.navigate("DeliveryDetails" as never)}
            >
              <View style={tw`flex-row items-center mb-2`}>
                <Package size={24} color={isDark ? "#60a5fa" : "#2563eb"} />
                <Text style={[tw`text-lg font-semibold ml-2`, textColor]}>Current Delivery</Text>
              </View>
              <Text style={[tw`text-base mb-1`, textColor]}>To: {currentDelivery.recipient}</Text>
              <Text style={[tw`text-sm text-gray-500 dark:text-gray-400`]}>{currentDelivery.address}</Text>
              <Text style={[tw`text-sm mt-2 text-blue-600 dark:text-blue-400`]}>Tap to view details</Text>
            </TouchableOpacity>
          ) : (
            <View style={[tw`p-6 rounded-lg items-center justify-center`, cardBg]}>
              <Text style={[tw`text-lg mb-4`, textColor]}>No active deliveries</Text>
              <TouchableOpacity
                style={tw`bg-blue-600 py-3 px-6 rounded-full flex-row items-center`}
                onPress={() => navigation.navigate("Scanner" as never)}
              >
                <QrCode size={20} color="white" />
                <Text style={tw`text-white font-medium ml-2`}>Scan Delivery QR Code</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={tw`mt-6`}>
            <Text style={[tw`text-xl font-semibold mb-4`, textColor]}>Quick Actions</Text>

            <View style={tw`flex-row flex-wrap`}>
              <TouchableOpacity style={[tw`w-1/2 p-2`]} onPress={() => navigation.navigate("Scanner" as never)}>
                <View style={[tw`p-4 rounded-lg items-center`, cardBg]}>
                  <QrCode size={32} color={isDark ? "#60a5fa" : "#2563eb"} />
                  <Text style={[tw`mt-2 font-medium`, textColor]}>Scan QR</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[tw`w-1/2 p-2`]} onPress={() => navigation.navigate("History" as never)}>
                <View style={[tw`p-4 rounded-lg items-center`, cardBg]}>
                  <CheckCircle size={32} color={isDark ? "#60a5fa" : "#2563eb"} />
                  <Text style={[tw`mt-2 font-medium`, textColor]}>View History</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
