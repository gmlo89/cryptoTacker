import AsyncStorage from '@react-native-community/async-storage';

class Storage {

    static instance = new Storage();


    store = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (err) {
            console.log('storage error', err)
            return false;
        }
    }


    get = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (err) {
            console.log('storage error ', err);

            throw Error(err);
        }
    }


    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (err) {
            console.log('storage getallkeys', err);
            throw Error(err);
        }
    }


    multiGet = async (key) => {
        try {
            return await AsyncStorage.multiGet(key);
        } catch (err) {
            console.log('storage multiget', err);
            throw Error(err);
        }
    }



    remove = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (err) {
            console.log('error remove storage', err);
            return false;
        }
    }
}


export default Storage;