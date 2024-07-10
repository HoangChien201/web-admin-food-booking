import React, { useEffect } from 'react'
import '../../assets/css/chat.css'
import { TimeCreateMessage } from './FormatDate'

export default function ChatItem({ active, item, onPress, userSendIDActive }) {
    const status = item.status
    function OnPress() {
        const value = {
            user_send_id: item.user.id,
            message_id: item.message_id
        }
        onPress(value)
    }
    if ( item.status ===1 && userSendIDActive === item.user.id) {
        const value = {
            user_send_id: item.user.id,
            message_id: item.message_id
        }
        onPress(value)
    }

    return (
        <div class={active ? "chat_list active_chat" : "chat_list"} onClick={OnPress}>
            <div class="chat_people">
                <div class="chat_img"> <img src={item.user.avatar} alt="sunil" /> </div>
                <div class="chat_ib">
                    <h5
                        style={
                            {
                                fontWeight: status === 1 && 'bold',
                                color: status === 1 && '#000'
                            }}>
                        {item.user.fullname} <span class="chat_date">{TimeCreateMessage(item.create_at)}</span></h5>
                    <p
                        style={
                            {
                                fontWeight: status === 1 && 'bold',
                                color: status === 1 && '#000'
                            }}

                    >{item.message}</p>
                </div>
            </div>
        </div>
    )
}
