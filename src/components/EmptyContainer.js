import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {
    Box,
    Spinner
} from 'native-base';


const EmptyContainer = () => {
    return (
        <Box style={styles.EmptyContainer}>
            <Spinner size='lg' />
        </Box>
    );
};

export default EmptyContainer;

const styles = StyleSheet.create({
    EmptyContainer: {
        flex: 1,
        backgroundColor: '#1B262C',
        alignItems: 'center',
        justifyContent: 'center',
    }
});