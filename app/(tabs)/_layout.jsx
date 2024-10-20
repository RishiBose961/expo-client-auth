import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import ProtectedRoute from "../../components/ProtectedRoute";
export default function RootLayout() {
  return (
    <ProtectedRoute>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="home"
                size={24}
                color={focused ? "red" : "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="user"
                size={24}
                color={focused ? "red" : "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            title: "Setting",
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="cog"
                size={24}
                color={focused ? "red" : "black"}
              />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
