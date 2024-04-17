import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const PostCard = ({ post: { title, prompt, postImage, postCreator: { username,avatar } } }) => {
  return (
	  <View className="flex-col items-center px-4 mb-14">
		  <View className="flex-row gap-3 items-start">
			  <View className="justify-center items-center flex-row flex-1">
				  <View className="w-[46px] h-[46px] rounded-lg border 
				  border-gray-400 justify-center items-center p-0.5">
					  <Image
						  source={{ uri: avatar }}
						  className="w-full h-full rounded-lg"
						  resizeMode="cover"
					  />
				  </View>
				  <View className="justify-center flex-1 ml-3 gap-y-1">
					  <Text className="text-primary font-psemibold" numberOfLines={1}>
						  {title}
					  </Text>
					  <Text className="text-primary font-pregular" numberOfLines={1}>
						  {username}
					</Text>
				  </View>
			  </View>
			  <View className="pt-2">
				  <Image
					  source={icons.menu}
					  className="w-5 h-5"
					  resizeMode='contain'
				  />
			  </View>
		  </View>

		  <View className="mt-3 w-full h-60 rounded-xl relative justify-center items-center">
			  <Image
				  source={{ uri: postImage }}
				  className="w-full h-full rounded-xl"
				  resizeMode='cover'
			  />
		  </View>
		  <View className="flex-row gap-3 items-start pt-3">
			  <View className="justify-center items-center flex-row flex-1">
				  <View className="justify-center flex-1 ml-2 gap-y-1">
					  <Text className="text-primary font-psemibold" >
						  {prompt}
					  </Text>
				  </View>
			  </View>
		  </View>
	  </View>
	  
  )
}

export default PostCard