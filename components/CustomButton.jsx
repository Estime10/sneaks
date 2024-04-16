import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

function CustomButton({
  title, handlePress, containerStyle, textStyle, isLoading
}) {
  return (

    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className={`bg-gray-300 rounded-xl min-h-[62px] justify-center
      items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold tex-xl ${textStyle}
      uppercase text-center font-bold`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
