import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';

function SignUp() {
  const { setUser, setIsLoggedIn }= useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
    Alert.alert('Error', 'Please fill all fields');
    }
    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);

      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message);
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
          <Text className="text-lg uppercase text-primary text-semibold font-psemibold">
            Register into sneaks
          </Text>
            
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-4"
          />
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
            title="Sign up"
            handlePress={submit}
            containerStyle="mt-6"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-4 flex-row">
            <Text className="text-primary font-plight">
              Have an account yet ? <Text className="text-primary font-psemibold">
                <Link href="/sign-in" >
                Sign In
                </Link>
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;