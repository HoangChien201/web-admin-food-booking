import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ChatContentItem from './ChatContentItem'
import axios from 'axios';
import { socket } from '../../socket';

export default function ContentChatContainer({ userSendIDActive }) {
    const user = JSON.parse(localStorage.getItem('user'))
    const [message,setMessage]=useState('')
    const [messages, setMessages] = useState([])
    async function getMessagesByUser() {
        const result = await axios.get(`http://192.168.0.101:9999/message/get-message-by-room?user_id_receice=${user.data.id}&user_id_send=${userSendIDActive}`)
        setMessages([...result.data.reverse()])
        console.log('send');


    }

    useLayoutEffect(() => {
        getMessagesByUser()
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on(`message-${user.data.id}`, () => {
            console.log('socket render');
            getMessagesByUser()
        });
    }, [userSendIDActive])


    async function sendMessage(){
        if(message){
            socket.emit('message', {
                user_id_send: user.data.id,
                user_id_receice: userSendIDActive,
                message: message,
            });
            setMessage('')
            setTimeout(()=>{
                getMessagesByUser()
            },1000)
        }

    }

    function onChangeText(text){
        setMessage(text.target.value)
    }
    return (
        <div class="mesgs">
            <div class="msg_history" style={{display:'flex',flexDirection:'column-reverse',scrollbarWidth:'none'}}>
                {
                    messages.map((item) => {
                        return (
                            <ChatContentItem item={item} />

                        )
                    })
                }

            </div>

            <div class="type_msg">
                <div class="input_msg_write">
                    <input 
                        type="text" 
                        class="write_msg" 
                        placeholder="Nhập tin nhắn" 
                        value={message} 
                        onChange={onChangeText}/>
                    <button 
                        class="msg_send_btn" 
                        type="button"
                        onClick={sendMessage}
                        ><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                </div>
            </div>
        </div >
    )
}
