import React from 'react';

import styles from './MessageList.css';

//message list
const Message = props => (
    <div className={styles.Message}>
        <strong>{props.from} :</strong>
        <span>{props.text}</span>
    </div>
);

//component that displays messages
const MessageList = props => (
    <div className={styles.MessageList}>
        {
            props.messages.map((message, i) => {
                return (
                    <Message
                        key={i}
                        from={message.from}
                        text={message.text}
                    />
                );
            })
        }
    </div>
);

export default MessageList;