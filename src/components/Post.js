import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Linking,
    Dimensions
} from 'react-native';
import {
    Avatar,
    Box,
    Button,
    HStack,
    Icon,
    Text,
    VStack
} from 'native-base';
import { firebase } from '@react-native-firebase/database';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Snackbar from 'react-native-snackbar';


const Post = ({ item, userDetails }) => {
    item = item.item;
    const [upvote, setUpvote] = useState(0);
    const [downvote, setDownvote] = useState(0);

    useEffect(() => {
        if (item.vote) {
            let upVote = 0;
            let downVote = 0;

            Object.values(item.vote).map(val => {
                if (val.upvote) {
                    upVote += 1;
                }

                if (val.downvote) {
                    downVote += 1;
                }
            });

            setUpvote(upVote);
            setDownvote(downVote);
        }
    }, [item]);

    const upVotePost = () => {
        firebase.app()
            .database('https://instatest-cccda-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
            .set({
                upvote: 1,
            })
            .then(() => Snackbar.show({
                text: 'Upvoted',
                textColor: 'white',
                backgroundColor: '#12B0E8'
            }))
    };
    const downVotePost = () => {
        firebase.app()
            .database('https://instatest-cccda-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
            .set({
                downvote: 1,
            })
            .then(() => Snackbar.show({
                text: 'Downvoted',
                textColor: 'white',
                backgroundColor: '#12B0E8'
            }))
    };


    return (
        <Box border="1" borderRadius="md" style={{
            backgroundColor: '#0F4C75',
            borderColor: '#0F4C75',
            marginVertical: 4
        }}>
            <VStack space="2">
                <Box px="4" pt="4" style={{
                    backgroundColor: 'transparent',
                }}>
                    <HStack space={2}>
                        <Avatar source={{ uri: item.userImage }} size="md" />
                        <VStack>
                            <Text
                                style={{
                                    color: '#FDCB9E'
                                }}
                            >{item.by}</Text>
                            <Text>{item.location}</Text>
                        </VStack>
                    </HStack>
                </Box>
                <Box px="4" style={{
                    alignItems: 'center'
                }}>
                    <Image
                        source={{ uri: item.picture }}
                        style={{
                            height: 250,
                            width: 300,
                        }}
                    />
                </Box>
                <Box px="4" style={{
                    backgroundColor: 'transparent',
                }}>
                    <Text
                        numberOfLines={2}
                        style={{
                            color: '#fff',
                        }}>
                        {item.description}
                    </Text>
                </Box>
                <Box px="4" pb="4" style={{
                    backgroundColor: '#0f4c75',
                }}>
                    <HStack style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <HStack space={2}>
                            <Button
                                variant="outline"
                                onPress={upVotePost}
                            >
                                <Icon
                                    name='thumbs-up'
                                    as={Entypo}
                                    style={{ fontSize: 18, color: '#fdcb9e' }}
                                />
                                <Text
                                    style={{
                                        color: '#fdcb9e',
                                    }}>
                                    {upvote}
                                </Text>
                            </Button>
                            <Button
                                variant="outline"
                                onPress={downVotePost}
                            >
                                <Icon
                                    name='thumbs-down'
                                    as={Entypo}
                                    style={{ fontSize: 18, color: '#fdcb9e' }}
                                />
                                <Text
                                    style={{
                                        color: '#fdcb9e',
                                    }}>
                                    {downvote}
                                </Text>
                            </Button>
                        </HStack>
                        <HStack space={2}>
                            <Button
                                variant="outline"
                                onPress={() => Linking.openURL(`instagram://user?username=${item.instaId}`)}
                            >
                                <Text style={{
                                    color: '#fdcb9e',
                                }}>
                                    Open In {' '}
                                    <Icon
                                        name="instagram"
                                        as={Feather}
                                        style={{ fontSize: 18, color: '#fdcb9e' }}
                                    />
                                </Text>
                            </Button>
                        </HStack>
                    </HStack>
                </Box>
            </VStack>
        </Box>
    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1b262C',
        flex: 1,
        justifyContent: 'flex-start',
        padding: 4
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: '#1b262C',
        justifyContent: 'center',
        alignItems: 'center'
    }
});