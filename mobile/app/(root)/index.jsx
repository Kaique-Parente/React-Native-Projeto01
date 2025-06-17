import { styles } from "@/assets/styles/home.styles.js"
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from "@expo/vector-icons"
import { Image } from 'expo-image'
import { useRouter } from "expo-router"
import { Text, TouchableOpacity, View } from 'react-native'
import BalanceCard from "../../components/BalanceCard"
import { SignOutButton } from "../../components/SignOutButton"

export default function Page() {
  const { user } = useUser()
  const router = useRouter();

  const summary = {
    balance: 2504.50,
    income: 1300.00,
    expenses: 800.50
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              contentFit="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split('@')[0]}
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={20} color="#FFF"/>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary}/>
      </View>
    </View>
  )
}