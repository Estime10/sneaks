import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

const Users = ({users}) => {
  return (
	  <FlatList
		horizontal
		showsHorizontalScrollIndicator={false}
		data={users}
		keyExtractor={(item) => item.$id}
		renderItem={({ item }) => (
			<View className="flex-1">
				<View className="flex-col items-center justify-center py-2 mr-5">
					<View className="w-[46px] h-[46px] rounded-lg border 
				  border-gray-400 justify-center items-center p-0.5">
					  <Image
						  source={{ uri: item.avatar }}
						  className="w-full h-full rounded-lg"
						  resizeMode="cover"
					  />
				  </View>
					<Text
						className="font-psemibold text-xs pt-2 w-14 text-center"
						numberOfLines={1} ellipsizeMode='tail'>
						{item.username}
					</Text>
				</View>
			</View>
		)}
	  />
  )
}

export default Users