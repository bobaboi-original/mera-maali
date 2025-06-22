import { Stack } from 'expo-router';

export default function ServicesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="consultation" />
      <Stack.Screen name="gardener" />
    </Stack>
  );
}