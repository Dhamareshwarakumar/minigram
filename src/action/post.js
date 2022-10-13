import { firebase } from '@react-native-firebase/database';
import { SET_POST, ERROR_POST } from './action.types';


export const getPosts = () => async (dispatch) => {
    try {
        firebase.app()
            .database('https://instatest-cccda-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref('/posts/')
            .on('value', snapshot => {
                console.log('[postAction][getPosts]: ', snapshot.val());
                if (snapshot.val()) {
                    dispatch({
                        type: SET_POST,
                        payload: Object.values(snapshot.val())
                    })
                } else {
                    dispatch({
                        type: SET_POST,
                        payload: []
                    });
                }
            })
    } catch (error) {
        dispatch({
            type: ERROR_POST
        });
    };
};