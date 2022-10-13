import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { getPosts } from '../action/post';


const Test = ({ authState, getPosts, postState }) => {
    console.log('[TestScreen][authState]', authState);
    console.log('[TestScreen][postState]', postState);

    useEffect(() => {
        getPosts();
    }, []);
    return (
        <View>
            <Text>This is Testing Page for Redux Subscription</Text>
        </View>
    );
};

const mapStateToProps = state => ({
    authState: state.auth,
    postState: state.post
});

export default connect(mapStateToProps, { getPosts })(Test);