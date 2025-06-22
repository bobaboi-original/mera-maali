import { Stack } from 'expo-router';

export default function ToolsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="light-meter" />
      <Stack.Screen name="soil-meter" />
    </Stack>
  );
}