import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "black" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Groups",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={18} name="home" color={color} />
          ),
          headerShown: false, // Hide header for the index screen
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={18} name="users" color={color} />
          ),
          headerShown: false, // Hide header for the index screen
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={18} name="bell" color={color} />
          ),
          headerShown: false, // Hide header for the index screen
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={18} name="cog" color={color} />
          ),
          headerShown: false, // Hide header for the index screen
        }}
      />
    </Tabs>
  );
}
