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
import database from '@react-native-firebase/database';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';


const Home = () => {
    const item = {
        userImage: 'https://avatars.githubusercontent.com/u/46528746?v=4',
        by: 'Dhamareshwar',
        location: 'Eluru',
        picture: 'https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/7289/Beautiful%20araku%20valley%20sunset%20mountains.jpg',
        description: 'Lovely Araku..❤️😍'
    }
    const [upvote, setUpvote] = useState(56);
    const [downvote, setDownvote] = useState(2);

    const upVotePost = () => { };
    const downVotePost = () => { };


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

export default Home;

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