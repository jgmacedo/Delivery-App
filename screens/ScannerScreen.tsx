"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Camera } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "twrnc"
import { X } from "lucide-react-native"

import { useDelivery } from "../context/DeliveryContext"
import { useTheme } from "../context/ThemeContext"

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const navigation = useNavigation()
  const { loadDeliveryFromQR } = useDelivery()
  const { isDark } = useTheme()

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    setScanned(true)

    try {
      const success = loadDeliveryFromQR(data)

      if (success) {
        Alert.alert("Success", "Delivery details loaded successfully", [
          {
            text: "View Details",
            onPress: () => navigation.navigate("DeliveryDetails" as never),
          },
        ])
      } else {
        Alert.alert(
          "Invalid QR Code",
          "This QR code does not contain valid delivery information or the delivery has already been completed.",
          [
            {
              text: "Try Again",
              onPress: () => setScanned(false),
            },
          ],
        )
      }
    } catch (error) {
      Alert.alert("Error", "Failed to process QR code. Please try again.", [
        {
          text: "OK",
          onPress: () => setScanned(false),
        },
      ])
    }
  }

  if (hasPermission === null) {
    return (
      <SafeAreaView style={[tw`flex-1 justify-center items-center`, isDark ? tw`bg-gray-900` : tw`bg-gray-50`]}>
        <Text style={isDark ? tw`text-white` : tw`text-black`}>Requesting camera permission...</Text>
      </SafeAreaView>
    )
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={[tw`flex-1 justify-center items-center p-4`, isDark ? tw`bg-gray-900` : tw`bg-gray-50`]}>
        <Text style={[tw`text-lg text-center mb-4`, isDark ? tw`text-white` : tw`text-black`]}>
          Camera access is required to scan QR codes
        </Text>
        <TouchableOpacity style={tw`bg-blue-600 py-3 px-6 rounded-full`} onPress={() => navigation.goBack()}>
          <Text style={tw`text-white font-medium`}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <View style={tw`flex-1`}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-row justify-end p-4`}>
          <TouchableOpacity style={tw`bg-black/50 rounded-full p-2`} onPress={() => navigation.goBack()}>
            <X size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`w-64 h-64 border-2 border-white rounded-lg`} />
          <Text style={tw`text-white text-lg mt-4 text-center px-6`}>
            Position the QR code within the frame to scan
          </Text>
        </View>

        {scanned && (
          <View style={tw`absolute bottom-0 left-0 right-0 p-4 items-center`}>
            <TouchableOpacity style={tw`bg-blue-600 py-3 px-6 rounded-full`} onPress={() => setScanned(false)}>
              <Text style={tw`text-white font-medium`}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  )
}
