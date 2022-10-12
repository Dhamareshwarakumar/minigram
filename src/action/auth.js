import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';


export const signUp = data => async (dispatch) => {
    const { name, instaUserName, bio, email, password, country, image } = data;

    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => {
            console.log(data);
            console.log('User account created :)');

            database()
                .ref('/users/' + data.user.uid)
                .set({
                    name,
                    instaUserName,
                    bio,
                    country,
                    image,
                    uid: data.user.uid,
                })
                .then(() => {
                    console.log('Data Set success');
                    Snackbar.show({
                        text: 'Account Created Successfully',
                        textColor: 'white',
                        backgroundColor: '#1FAA59'
                    });
                })
                .catch(error => Snackbar.show({
                    text: error.message,
                    textColor: 'white',
                    backgroundColor: '#FF6263'
                }))
        })
        .catch(error => Snackbar.show({
            text: 'Signup Failed',
            textColor: 'white',
            backgroundColor: '#FF6263'
        }));
};


export const signIn = data => async (dispatch) => {
    console.log(data);
    const { email, password } = data;

    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            Snackbar.show({
                text: 'Login Success',
                textColor: 'white',
                backgroundColor: '#1FAA59'
            });
        })
        .catch(error => Snackbar.show({
            text: error.message,
            textColor: 'white',
            backgroundColor: '#FF6263'
        }));
};


export const signOut = () => async (dispatch) => {
    auth()
        .signOut()
        .then(() => {
            Snackbar.show({
                text: 'Logout Success',
                textColor: 'white',
                backgroundColor: '#1FAA59'
            });
        })
        .catch(error => Snackbar.show({
            text: error.message,
            textColor: 'white',
            backgroundColor: '#FF6263'
        }));
};