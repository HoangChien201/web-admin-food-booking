import React, { useEffect, useRef, useState } from 'react'
import '../assets/css/chat.css'
import ChatItem from '../component/chat/ChatItem'
import ChatContentItem from '../component/chat/ChatContentItem'
import axios from 'axios'
import ContentChatContainer from '../component/chat/ContentChatContainer'
import { socket } from '../socket'

const Chat = (props) => {
    const { saveUser } = props
    const user = JSON.parse(localStorage.getItem('user'))

    const [messageItems, setMessageItems] = useState([])
    // const [userSendIDActive, setUserSendIDActive] = useState()
    const userSendIDActive=useRef()
    async function getMessageItemsAPI() {
        const result = await axios.get('http://192.168.0.101:9999/message/get-message-by-user-nearest/1')
        setMessageItems([...result.data])
        return result.data
    }
    useEffect(() => {
        console.log('render first');
        (async function getFirst() {
            const result = await getMessageItemsAPI()
            // setUserSendIDActive(result[0].user.id)
            userSendIDActive.current=result[0].user.id

        })()

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        //nhận tin nhắn
        socket.on(`message-${user.data.id}`, () => {
            getMessageItemsAPI()
        });
    }, [])



    async function ChatItemOnPress(value) {
        await axios.post('http://192.168.0.101:9999/message/update/' + value.message_id, { status: 2 })
        // setUserSendIDActive(value.user_send_id)
        userSendIDActive.current=value.user_send_id

        getMessageItemsAPI()

    }

    return (
        <>
            <div class="container">
                <h3 class=" text-center">Tin nhắn</h3>
                <div class="messaging">
                    <div class="inbox_msg">
                        <div class="inbox_people">
                            <div class="headind_srch">
                                <div class="recent_heading">
                                    <h4>Gần đây</h4>
                                </div>
                                <div class="srch_bar">
                                    <div class="stylish-input-group">
                                        <input type="text" class="search-bar" placeholder="Search" />
                                        <span class="input-group-addon">
                                            <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                                        </span> </div>
                                </div>
                            </div>
                            <div class="inbox_chat">
                                {
                                    messageItems.map((item) => {
                                        return (
                                            <ChatItem active={item.user.id === userSendIDActive} item={item} onPress={ChatItemOnPress} userSendIDActive={userSendIDActive.current}/>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        {
                            userSendIDActive && <ContentChatContainer userSendIDActive={userSendIDActive.current} />
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat