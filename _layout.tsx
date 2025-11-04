import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Luke's Weather App",
          headerStyle: {
            backgroundColor: '#4CAF50', // Background color of the bar
          },
          headerTintColor: '#FFFFFF', // Color of the title text
          headerTitleStyle: {
            fontWeight: 'bold', // Text styling for the title
            fontSize: 24,
          },
        }}
      />
    </Stack>
  );
}