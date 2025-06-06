"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface DeliveryItem {
  name: string
  quantity: number
}

export interface Delivery {
  id: string
  recipient: string
  address: string
  phone: string
  items: DeliveryItem[]
  status: "pending" | "completed"
  timestamp: number
  notes?: string
}

interface DeliveryContextType {
  currentDelivery: Delivery | null
  deliveryHistory: Delivery[]
  setCurrentDelivery: (delivery: Delivery | null) => void
  completeDelivery: (id: string) => void
  loadDeliveryFromQR: (qrData: string) => boolean
}

const DeliveryContext = createContext<DeliveryContextType>({
  currentDelivery: null,
  deliveryHistory: [],
  setCurrentDelivery: () => {},
  completeDelivery: () => {},
  loadDeliveryFromQR: () => false,
})

export const useDelivery = () => useContext(DeliveryContext)

export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDelivery, setCurrentDelivery] = useState<Delivery | null>(null)
  const [deliveryHistory, setDeliveryHistory] = useState<Delivery[]>([])

  // Load delivery history from storage on app start
  useEffect(() => {
    const loadDeliveryHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem("deliveryHistory")
        if (savedHistory) {
          setDeliveryHistory(JSON.parse(savedHistory))
        }
      } catch (error) {
        console.error("Failed to load delivery history:", error)
      }
    }

    loadDeliveryHistory()
  }, [])

  // Save delivery history whenever it changes
  useEffect(() => {
    const saveDeliveryHistory = async () => {
      try {
        await AsyncStorage.setItem("deliveryHistory", JSON.stringify(deliveryHistory))
      } catch (error) {
        console.error("Failed to save delivery history:", error)
      }
    }

    if (deliveryHistory.length > 0) {
      saveDeliveryHistory()
    }
  }, [deliveryHistory])

  const completeDelivery = (id: string) => {
    if (currentDelivery && currentDelivery.id === id) {
      const completedDelivery = {
        ...currentDelivery,
        status: "completed" as const,
        timestamp: Date.now(),
      }

      setDeliveryHistory((prev) => [completedDelivery, ...prev])
      setCurrentDelivery(null)
    }
  }

  const loadDeliveryFromQR = (qrData: string): boolean => {
    try {
      const deliveryData = JSON.parse(qrData)

      // Validate the QR data has the required fields
      if (!deliveryData.id || !deliveryData.recipient || !deliveryData.address || !Array.isArray(deliveryData.items)) {
        return false
      }

      // Check if this delivery is already completed
      const isAlreadyCompleted = deliveryHistory.some((d) => d.id === deliveryData.id)
      if (isAlreadyCompleted) {
        return false
      }

      setCurrentDelivery({
        ...deliveryData,
        status: "pending",
        timestamp: Date.now(),
      })

      return true
    } catch (error) {
      console.error("Invalid QR code data:", error)
      return false
    }
  }

  return (
    <DeliveryContext.Provider
      value={{
        currentDelivery,
        deliveryHistory,
        setCurrentDelivery,
        completeDelivery,
        loadDeliveryFromQR,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  )
}
