import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    Button,
    Icon,
    Text,
    StatusBar,
    Box,
    HStack,
    IconButton
} from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOut } from '../action/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const CustomHeader = ({ authState, signOut, navigation }) => {
    return (
        <>
            {/* <StatusBar bg="#3700B3" barStyle="light-content" /> */}
            {/* <Box safeAreaTop bg="violet.600" /> */}
            <HStack bg="#0f4c75" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
                <HStack alignItems="center">
                    <Text color="white" fontSize="20" fontWeight="bold">
                        MiniGram
                    </Text>
                </HStack>
                <HStack>
                    {authState.isAuthenticated && (
                        <>
                            <Button
                                onPress={() => navigation.navigate('AddPost')}
                            >
                                <Text style={{ coloe: '#fdcb9e' }}>Add Post</Text>
                            </Button>
                            <Button
                                onPress={() => signOut()}
                            >
                                <Icon name='log-out-outline' style={{ color: 'red' }} />
                            </Button>
                        </>
                    )}
                </HStack>
            </HStack>
        </>
    );
};

CustomHeader.propTypes = {
    authState: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authState: state.auth
});

const mapDispatchToProps = {
    signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);