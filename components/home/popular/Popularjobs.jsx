import React, {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'

const Popularjobs = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
            data={[1,2,3]}
            keyExtractor={item => item?.job_id}
            renderItem={({item}) => (
              <PopularJobCard item={item}/>
            )}
            contentContainerStyle={{
              columnGap: SIZES.medium
            }}
          />
        }
      </View>
    </View>
  )
}

export default Popularjobs