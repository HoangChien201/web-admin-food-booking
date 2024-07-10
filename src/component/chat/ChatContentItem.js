import React from 'react'
import '../../assets/css/chat.css'
import { TimeCreateMessage } from './FormatDate'

export default function ChatContentItem({item}) {
    const user=JSON.parse(localStorage.getItem('user'))
    const status=item.user_send.id === user.data.id ? 2 : 1  //1:comming 2:outgoing
    return (
        <div class={status === 1 ? "incoming_msg" : "outgoing_msg"}>
            {
                status === 1 && <div class="incoming_msg_img"> <img src={item.user_send.avatar} alt="sunil" /> </div>
            }
            
            <div class={status === 1 ? "received_msg" : "sent_msg"}>
                <div class={status === 1 ? "received_withd_msg" : "sent_msg"}>
                    <p>{item.message}</p>
                    <span class="time_date">{TimeCreateMessage(item.create_at)}</span></div>
            </div>
        </div>
    )
}
