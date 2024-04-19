import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { createPost } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

function Create() {
  const { user} = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    prompt: '',
    image: null,
  });

const openImagePicker = async (selectType) => {
  let result = await ImagePicker.
    launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
  if (!result.canceled) {
    if (selectType === 'postImage') {
      setForm({ ...form, image: result?.assets[0] });
    }
  } 
};

  const submit = async () => {
    if(!form.title || !form.prompt || !form.image) {
      Alert.alert('All fields are required');
      return;
    }
    setUploading(true);

    try {
        await createPost({...form, userId:user.$id});


      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error 2', error.message);
    } finally {
      setForm({ title: '', prompt: '', image: null });
      setUploading(false);
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="px-4 my-10">
        <Text
          className="text-lg text-primary capitalize font-psemibold">
          upload post
        </Text>
        <FormField
          title="post title"
          value={form.title}
          placeholder="Give your post a title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />
        <View className="mt-5 space-y-2">
          <Text className="text-base font-pmedium">
            upload image
          </Text>
          <TouchableOpacity onPress={() => openImagePicker('postImage')}
          >
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                className="w-full h-72 rounded-md"
                resizeMode='cover'
              />
            ) : (
                <View className="h-64 w-full px-4 bg-gray-300 rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-gray-400 
                  justify-center items-center">
                    <Image
                      source={icons.upload}
                      className="w-8 h-8"
                      resizeMode='contain'
                    />
                  </View>
                    <Text className="text-sm text-gray-900 mt-2 font-pmedium">
                      choose an image
                    </Text>
              </View>
            )}  
          </TouchableOpacity>
        </View>
          <FormField
          title="post description"
          value={form.prompt}
          placeholder="Give your post a description..."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-5 mb-5'
        />
        <CustomButton
          title="submit & publish"
          handlePress={submit}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Create;