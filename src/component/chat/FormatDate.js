export function TimeCreateMessage(create_at){
    const date=new Date(create_at) 

    const timeDifference=(date - new Date(create_at))/1000/60/60 //tính hiệu thời gian tạo so với thời gian thật

    if(timeDifference < 24){
        return `${date.getHours()}:${date.getMinutes()}`
    }else{
        return `${date.getDate()}/${date.getMonth()}`
    }
}