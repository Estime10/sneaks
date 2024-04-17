import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

function SignIn() {
  const { setUser, setIsLoggedIn }= useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

   const submit = async () => {
    if (!form.email || !form.password) {
    Alert.alert('Error', 'Please fill all fields');
    }
    setSubmitting(true);
    try {
     await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center px-4 my-6 h-full">
          <Image
            source={images.logo}
            className="w-[145px] h-[110px] relative -left-10"
            resizeMode="contain"
          />
          <Text className="text-lg uppercase text-primary text-semibold font-psemibold">log into sneaks</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyle="mt-6"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-4 flex-row">
            <Text className="text-primary font-plight">
              Don't have an account? <Text className="text-primary font-psemibold">
                <Link href="/sign-up" >
                Sign Up
                </Link>
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn;
