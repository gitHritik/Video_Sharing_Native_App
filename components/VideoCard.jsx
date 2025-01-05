import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { WebView } from "react-native-webview";
import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);
  const [error, setError] = useState(null);

  // Add autoplay to the Vimeo URL
  const videoUrl = `${video}?autoplay=1`; // Modify the URL with autoplay

  const handleVideoEnd = () => {
    setPlay(false); // Reset to thumbnail when the video ends
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <View style={{ width: "100%", height: 240, marginTop: 12 }}>
          <WebView
            source={{ uri: videoUrl }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
            }}
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo
            injectedJavaScript={`document.querySelector('video').addEventListener('ended', function() {
              window.ReactNativeWebView.postMessage("videoEnded");
            });`}
            onMessage={(event) => {
              if (event.nativeEvent.data === "videoEnded") {
                handleVideoEnd();
              }
            }}
            onError={(err) => {
              setError("Failed to load video.");
              console.error("Video error:", err);
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      {error && (
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default VideoCard;
