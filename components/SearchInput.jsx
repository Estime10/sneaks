import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, search, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className="border-2 border-gray-100 rounded-lg w-full h-16 px-4 focus:border-gray-400 items-center flex-row space-x-4">
          <TextInput
            className="mt-0.5 text-base text-primary flex-1 font-pregular"
            value={value}
            placeholder="Search"
            onChangeText={handleChangeText}
            placeholderTextColor="#99A3A4"
          />
          
            <TouchableOpacity>
              <Image
                source={icons.search}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>  
        </View>
    )
}

export default SearchInput