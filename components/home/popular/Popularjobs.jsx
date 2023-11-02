import React, {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'

const Popularjobs = () => {
  const router = useRouter();
  const {data, error, isLoading} = useFetch('search', {query: 'React native developer', num_pages: 1});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {
          isLoading ? 
          <ActivityIndicator size='large' color={COLORS.primary} />
          :
          error ?
          <Text>Something went wrong.</Text>
          :
          <FlatList
            horizontal
            data={data}
            keyExtractor={item => item?.job_id}
            renderItem={({item}) => (
              <PopularJobCard item={item}/>
            )}
            contentContainerStyle={{
              columnGap: SIZES.medium
            }}
            showsHorizontalScrollIndicator={false}
          />
        }
      </View>
    </View>
  )
}

export default Popularjobs