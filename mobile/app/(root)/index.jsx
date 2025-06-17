import { styles } from "@/assets/styles/home.styles.js"
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from "@expo/vector-icons"
import { Image } from 'expo-image'
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import BalanceCard from "../../components/BalanceCard"
import NoTransactionFound from "../../components/NoTransactionFound"
import PageLoader from "../../components/PageLoader"
import { SignOutButton } from "../../components/SignOutButton"
import TransactionItem from "../../components/TransactionItem"

export default function Page() {
  const { user } = useUser()
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  const summary = {
    balance: 2504.50,
    income: 1300.00,
    expenses: 800.50
  }

  const transactions = [
    {
      id: "1",
      title: "Pizzaria do Zé",
      category: "Food & Drinks",
      amount: "-45.90",
      created_at: "2025-06-10T19:30:00Z"
    },
    {
      id: "2",
      title: "Salário",
      category: "Income",
      amount: "3500.00",
      created_at: "2025-06-05T08:00:00Z"
    },
    {
      id: "3",
      title: "Netflix",
      category: "Entertainment",
      amount: "-39.90",
      created_at: "2025-06-01T22:00:00Z"
    },
    {
      id: "4",
      title: "Conta de Luz",
      category: "Bills",
      amount: "-120.75",
      created_at: "2025-06-07T15:45:00Z"
    },
    {
      id: "5",
      title: "Uber para casa",
      category: "Transportation",
      amount: "-18.50",
      created_at: "2025-06-11T23:00:00Z"
    },
    {
      id: "6",
      title: "Compra na Amazon",
      category: "Shooping", // com S maiúsculo pra bater com seu ícone
      amount: "-250.00",
      created_at: "2025-06-09T13:15:00Z"
    },
    {
      id: "7",
      title: "Freelance Site",
      category: "Income",
      amount: "1200.00",
      created_at: "2025-06-12T10:00:00Z"
    },
    {
      id: "8",
      title: "Outros gastos",
      category: "Other",
      amount: "-60.00",
      created_at: "2025-06-03T16:30:00Z"
    }
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    //await loadData();

    await new Promise(resolve => setTimeout(resolve, 2000)); // espera 2 segundos
    setRefreshing(false);
  }

  const handleDelete = (id) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive" }
    ])
  }

  //Página de refresh
  if(refreshing) return <PageLoader/>

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
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

        <FlatList
          style={styles.transactionsList}
          contentContainerStyle={styles.transactionsListContent}
          data={transactions}
          renderItem={({ item }) => (
            <TransactionItem item={item} onDelete={handleDelete} />
          )}
          ListEmptyComponent={<NoTransactionFound />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
            />
          }

        />


      </View>
    </View>
  )
}