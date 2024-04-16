// import { StatusBar } from 'expo-status-bar';
import {
  Image, ScrollView, Text, View
} from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) 
    return <Redirect href="/home" />;
    
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={
        { height: '100%' }
      }
      >
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[300px] h-[284px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl font-bold uppercase text-primary">Welcome to</Text>
            <Text className="text-3xl text-center font-bold uppercase text-gray-400 mt12">sneaks</Text>
            <Text className="text-center text-gray-400 mt-2">The ultimate sneakers app</Text>
          </View>
            <CustomButton
              title="hop into the sneaker world"
              handlePress={() => router.push('/sign-in')}
              containerStyle="mt-7 w-full"
            />
        </View>
      </ScrollView>
      {/* <StatusBar backgroundColor='#BDBDBD' style='dark' /> */}
      {/* to show or hide the time battery network */}
    </SafeAreaView>
  );
}
