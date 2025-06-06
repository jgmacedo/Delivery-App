"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import tw from "twrnc"
import { MapPin, Phone, Package, CheckCircle, Clipboard, Camera } from "lucide-react-native"

import { useDelivery } from "../context/DeliveryContext"
import { useTheme } from "../context/ThemeContext"

export default function DeliveryDetailsScreen() {
  const navigation = useNavigation()
  const { currentDelivery, completeDelivery } = useDelivery()
  const { isDark } = useTheme()
  const [signature, setSignature] = useState("")
  const [notes, setNotes] = useState("")

  const bgColor = isDark ? tw`bg-gray-900` : tw`bg-gray-50`
  const textColor = isDark ? tw`text-white` : tw`text-gray-900`
  const cardBg = isDark ? tw`bg-gray-800` : tw`bg-white`

  if (!currentDelivery) {
    return (
      <SafeAreaView style={[tw`flex-1 justify-center items-center p-4`, bgColor]}>
        <Text style={[tw`text-lg mb-4 text-center`, textColor]}>No active delivery found</Text>
        <TouchableOpacity
          style={tw`bg-blue-600 py-3 px-6 rounded-full`}
          onPress={() => navigation.navigate("Scanner" as never)}
        >
          <Text style={tw`text-white font-medium`}>Scan Delivery QR Code</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  const handleCompleteDelivery = () => {
    if (!signature.trim()) {
      Alert.alert("Error", "Recipient signature is required")
      return
    }

    Alert.alert("Confirm Delivery", "Are you sure you want to mark this delivery as complete?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Complete",
        onPress: () => {
          completeDelivery(currentDelivery.id)
          Alert.alert("Success", "Delivery marked as complete!")
          navigation.navigate("Home" as never)
        },
      },
    ])
  }

  return (
    <SafeAreaView style={[tw`flex-1`, bgColor]} edges={["bottom"]}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <View style={[tw`p-4 rounded-lg mb-4`, cardBg]}>
            <Text style={[tw`text-xl font-bold mb-4`, textColor]}>Recipient Information</Text>

            <View style={tw`flex-row items-center mb-3`}>
              <View style={tw`w-8`}>
                <Clipboard size={20} color={isDark ? "#60a5fa" : "#2563eb"} />
              </View>
              <Text style={[tw`flex-1`, textColor]}>{currentDelivery.recipient}</Text>
            </View>

            <View style={tw`flex-row items-center mb-3`}>
              <View style={tw`w-8`}>
                <MapPin size={20} color={isDark ? "#60a5fa" : "#2563eb"} />
              </View>
              <Text style={[tw`flex-1`, textColor]}>{currentDelivery.address}</Text>
            </View>

            <View style={tw`flex-row items-center`}>
              <View style={tw`w-8`}>
                <Phone size={20} color={isDark ? "#60a5fa" : "#2563eb"} />
              </View>
              <Text style={[tw`flex-1`, textColor]}>{currentDelivery.phone}</Text>
            </View>
          </View>

          <View style={[tw`p-4 rounded-lg mb-4`, cardBg]}>
            <Text style={[tw`text-xl font-bold mb-4`, textColor]}>Package Items</Text>

            {currentDelivery.items.map((item, index) => (
              <View key={index} style={tw`flex-row items-center mb-3 last:mb-0`}>
                <View style={tw`w-8`}>
                  <Package size={20} color={isDark ? "#60a5fa" : "#2563eb"} />
                </View>
                <Text style={[tw`flex-1`, textColor]}>
                  {item.name} x{item.quantity}
                </Text>
              </View>
            ))}
          </View>

          <View style={[tw`p-4 rounded-lg mb-4`, cardBg]}>
            <Text style={[tw`text-xl font-bold mb-4`, textColor]}>Delivery Confirmation</Text>

            <View style={tw`mb-4`}>
              <Text style={[tw`text-base mb-2`, textColor]}>Recipient Signature</Text>
              <TextInput
                style={[
                  tw`border rounded-lg p-3 mb-1`,
                  isDark ? tw`border-gray-700 bg-gray-800 text-white` : tw`border-gray-300 bg-white text-black`,
                ]}
                placeholder="Recipient's name"
                placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                value={signature}
                onChangeText={setSignature}
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={[tw`text-base mb-2`, textColor]}>Delivery Notes (Optional)</Text>
              <TextInput
                style={[
                  tw`border rounded-lg p-3 mb-1 h-24`,
                  isDark ? tw`border-gray-700 bg-gray-800 text-white` : tw`border-gray-300 bg-white text-black`,
                ]}
                placeholder="Add any notes about this delivery"
                placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                multiline
                textAlignVertical="top"
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            <View style={tw`flex-row items-center mb-4`}>
              <TouchableOpacity style={tw`flex-row items-center bg-gray-200 dark:bg-gray-700 p-3 rounded-lg`}>
                <Camera size={20} color={isDark ? "#60a5fa" : "#2563eb"} />
                <Text style={[tw`ml-2`, isDark ? tw`text-white` : tw`text-gray-800`]}>Take Photo</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={tw`bg-green-600 py-4 px-6 rounded-lg items-center flex-row justify-center`}
              onPress={handleCompleteDelivery}
            >
              <CheckCircle size={20} color="white" />
              <Text style={tw`text-white font-bold ml-2`}>Complete Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
