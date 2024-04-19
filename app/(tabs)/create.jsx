import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';
import * as DocumentPicker from 'expo-document-picker';

function Create() {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    prompt: '',
    image: null,
  });

  const openImagePicker = async (slectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    });
    if(!result.canceled){
      if(slectType === 'postImage'){
        setForm({...form, image: result});
      }
    }
  }


  const submit = () => {
    
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
          <TouchableOpacity onPress={() => openImagePicker
            ('postImage')}>
            {form.image ? (
              <Image
                source={{ uri: form.postImage.uri }}
                className="w-full h-40 rounded-2xl"
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
          value={form.title}
          placeholder="Give your post a description..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
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
