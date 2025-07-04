import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Alert } from "react-native";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
export const config = {
  platform: "tech.unknownbug.splitly",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

class AuthServices {
  account: Account;
  avatar: Avatars;

  constructor() {
    this.account = new Account(client);
    this.avatar = new Avatars(client);
  }

  async loginOAuth(provider: string) {
    try {
      const deepLink = Linking.createURL("/");
      // Change 'splitly' to your app's scheme

      let response: void | URL = undefined;
      if (provider === "google") {
        response = await this.account.createOAuth2Token(
          OAuthProvider.Google,
          deepLink,
          deepLink
        );
      } else if (provider === "github") {
        response = await this.account.createOAuth2Token(
          OAuthProvider.Github,
          deepLink,
          deepLink
        );
      }

      if (!response) throw new Error("Failed to login");

      const browserResult = await openAuthSessionAsync(
        response.toString(),
        deepLink
      );

      if (browserResult.type != "success") throw new Error("Failed to login");

      const url = new URL(browserResult.url);

      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();

      if (!secret || !userId) throw new Error("Failed to login");

      const session = await this.account.createSession(userId, secret);

      if (!session) throw new Error("Failed to create session");
    } catch (err) {
      console.log(err);
      Alert.alert("Failed to login");
    }
  }

  async getUser() {
    try {
      const res = await this.account.get();
      return {
        user: res,
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }
}

export const authServices = new AuthServices();
