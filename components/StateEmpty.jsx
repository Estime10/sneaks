import { View, Text, Image } from "react-native";
import { images } from "../constants";


const StateEmpty = ({ title, subtitle }) => {
return (
    <View className="flex justify-center items-center px-4">
    <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
    />
    <Text className="text-xl capitalize font-psemibold text-gray-400">{title}</Text>
    <Text className="text-sm text-center font-pmedium text-primary mt-2">{subtitle}</Text>
	</View>
);
};

export default StateEmpty;