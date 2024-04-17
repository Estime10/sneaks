import { useState } from 'react'
import { View, Text, FlatList, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

const zoomIn = {
	0: {
		scale: 0.9,
	},
	1: {
		scale: 1.1,
	},
}

const zoomOut = {
	0: {
		scale: 1.1,
	},
	1: {
		scale: 0.9,
	},
}

const TrendingItem = ({ activeItem, item }) => {
  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      delay={500}
      className="w-40 h-40 bg-gray-200 rounded-lg mr-2 mt-4">
      <Image
        source={{ uri: item.postImage }}
        className="w-full h-full rounded-lg overflow-hidden shadow-lg shadow-black/40"
        resizeMode="cover"
      />
    </Animatable.View>
  )
}


const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
		horizontal
		showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending