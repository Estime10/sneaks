import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
	<View className={containerStyles}>
		  <Text className={`text-primary text-center font-psemibold ${titleStyles}`}>
			{title}
		  </Text>
		  <Text className="text-gray-400 text-center text-sm font-pregular">
			{subtitle}
		  </Text>
	</View>
  )
}

export default InfoBox