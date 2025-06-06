"use client"
import { View, Text, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "twrnc"
import { CheckCircle, Package } from "lucide-react-native"

import { useDelivery, type Delivery } from "../context/DeliveryContext"
import { useTheme } from "../context/ThemeContext"

export default function HistoryScreen() {
  const { deliveryHistory } = useDelivery()
  const { isDark } = useTheme()

  const bgColor = isDark ? tw`bg-gray-900` : tw`bg-gray-50`
  const textColor = isDark ? tw`text-white` : tw`text-gray-900`
  const cardBg = isDark ? tw`bg-gray-800` : tw`bg-white`

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderDeliveryItem = ({ item }: { item: Delivery }) => (
    <View style={[tw`p-4 rounded-lg mb-4`, cardBg]}>
      <View style={tw`flex-row items-center mb-2`}>
        <View style={tw`w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center mr-2`}>
          <CheckCircle size={16} color={isDark ? "#4ade80" : "#16a34a"} />
        </View>
        <Text style={[tw`text-lg font-semibold`, textColor]}>{item.recipient}</Text>
        <Text style={tw`ml-auto text-xs text-gray-500 dark:text-gray-400`}>{formatDate(item.timestamp)}</Text>
      </View>

      <Text style={[tw`text-sm mb-2 text-gray-500 dark:text-gray-400`]}>{item.address}</Text>

      <View style={tw`flex-row flex-wrap`}>
        {item.items.map((packageItem, index) => (
          <View
            key={index}
            style={tw`flex-row items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 mr-2 mb-2`}
          >
            <Package size={12} color={isDark ? "#9ca3af" : "#4b5563"} />
            <Text style={tw`text-xs ml-1 text-gray-600 dark:text-gray-300`}>
              {packageItem.name} ({packageItem.quantity})
            </Text>
          </View>
        ))}
      </View>
    </View>
  )

  return (
    <SafeAreaView style={[tw`flex-1`, bgColor]}>
      <View style={tw`p-4`}>
        <Text style={[tw`text-2xl font-bold mb-6`, textColor]}>Delivery History</Text>

        {deliveryHistory.length === 0 ? (
          <View style={[tw`p-6 rounded-lg items-center justify-center`, cardBg]}>
            <Text style={[tw`text-lg text-center`, textColor]}>No completed deliveries yet</Text>
          </View>
        ) : (
          <FlatList
            data={deliveryHistory}
            renderItem={renderDeliveryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`pb-4`}
          />
        )}
      </View>
    </SafeAreaView>
  )
}
