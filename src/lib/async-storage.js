import AsyncStorage from '@react-native-async-storage/async-storage';

const favoriteKey = '@favorite';

async function getFavorites() {
  try {
    const values = await AsyncStorage.getItem(favoriteKey);
    return values != null ? JSON.parse(values) : [];
  } catch (error) {
    console.error(error);
  }
}

export const asyncStorage = {
  getFavorites: async () => {
    return await getFavorites();
  },
  setFavoriteItem: async (item) => {
    try {
      const values = await getFavorites();

      await AsyncStorage.setItem(
        favoriteKey,
        JSON.stringify([...values, item])
      );
    } catch (error) {
      console.error(error);
    }
  },
  removeFavoriteItem: async ({ id }) => {
    try {
      const values = await getFavorites();

      await AsyncStorage.setItem(
        favoriteKey,
        JSON.stringify(values.filter((item) => item.id !== id))
      );
    } catch (error) {
      console.error(error);
    }
  },
};
