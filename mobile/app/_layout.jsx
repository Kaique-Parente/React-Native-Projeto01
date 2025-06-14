import SafeScreen from "@/app/SafeScreen";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeScreen>
  )
}
