import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authServices } from "../../lib/appwrite";

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => {
          authServices.logout();
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
