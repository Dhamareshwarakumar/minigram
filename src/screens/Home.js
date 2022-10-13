import React, { useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    Box,
    Text,
} from 'native-base';
import { connect } from 'react-redux';
import { getPosts } from '../action/post';
import PropTypes from 'prop-types';

import Post from '../components/Post';
import EmptyContainer from '../components/EmptyContainer';


const Home = ({ getPosts, postState, userDetails }) => {
    userDetails = userDetails.user
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    if (postState.loading) {
        return <EmptyContainer />
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={postState.posts}
                keyExtractor={item => item.id}
                renderItem={item => (
                    <Post item={item} userDetails={userDetails} key={item.id} />
                )}
                ListEmptyComponent={() => (
                    <Box style={styles.emptyContainer}>
                        <Text>No Posts Found</Text>
                    </Box>
                )}
            />
        </SafeAreaView>
    );
};

Home.propTypes = {
    postState: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    userDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    userDetails: state.auth,
    postState: state.post
});

export default connect(mapStateToProps, { getPosts })(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b262c',
        justifyContent: 'flex-start',
        padding: 4
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: '#1b262c',
        justifyContent: 'center',
        alignItems: 'center'
    }
});