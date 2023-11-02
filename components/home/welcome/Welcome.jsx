import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { COLORS, icons, SIZES } from '../../../constants'
import { jobTypes } from '../../../constants/constants'

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeJobType, setActiveJobType] = useState(jobTypes[0]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello, Sheila! 👋🏻</Text>
        <Text style={styles.welcomeMessage}>Find your next raket</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput} 
            value={searchTerm} 
            onChangeText={(text)=>setSearchTerm(text)} 
            placeholder="Search for jobs..."
            placeholderTextColor={COLORS.gray2}
          />
        </View>
        <TouchableOpacity 
          style={styles.searchBtn} 
          onPress={() => { if (searchTerm) router.push(`/search/${searchTerm}`)}}
        >
          <Image source={icons.search} resizeMode='contain' style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.tabsContainer}>
        <FlatList 
          horizontal
          data={jobTypes}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.tab(activeJobType, item)}
              onPress={()=>{
                setActiveJobType(item)
                router.push(`search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View> */}
    </View>
  )
}

export default Welcome