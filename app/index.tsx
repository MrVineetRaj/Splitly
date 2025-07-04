import { navigate } from "expo-router/build/global-state/routing";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authServices } from "../lib/appwrite";
import "./global.css";

const EntryPage = () => {
  const handleGithubLogin = async () => {
    authServices.loginOAuth("github");
  };

  const handleGoogleLogin = async () => {
    authServices.loginOAuth("google");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await authServices.getUser();
      if (res.success) {
        console.log(res.user?.email);
        navigate("/(tabs)");
      }
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleGithubLogin}>
        <Text>Continue with Github</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoogleLogin}>
        <Text>Continue with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EntryPage;
