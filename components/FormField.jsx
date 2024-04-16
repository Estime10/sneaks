import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-primary font-pmedium">{title}</Text>
        <View className="border-2 border-gray-300 rounded-lg w-full h-16 px-4 focus:border-gray-400 items-center flex-row">
          <TextInput
           
            className="flex-1 text-primary font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            placeholderTextColor="#BDBDBD"
            secureTextEntry={title === 'Password' && !showPassword}
          />
          {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>  
          )}
        </View>
      </View>
    )
}

export default FormField