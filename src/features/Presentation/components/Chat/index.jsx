// /* eslint-disable eqeqeq */
// /* eslint-disable react/require-default-props */
// /* eslint-disable no-underscore-dangle */
// /* eslint-disable react/forbid-prop-types */
// /* eslint-disable no-unused-vars */
// import { React, useEffect, useState } from 'react';
// import { makeStyles } from '@mui/styles';
// import PropTypes from 'prop-types';
// import { Box, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import "./index.css";
// import { useSelector } from 'react-redux';

// const useStyles = makeStyles(() => ({
//     root: {

//     },
//     dialogPaper: {
//         minHeight: '70vh',
//         maxHeight: '70vh',
//         minWidth: '60vh',
//         maxWidth: '60vh',
//     },
// }));

// function Chat({ open, handleClose, socket, presentationId }) {
//     const loggedInUser = useSelector(state => state.user.current)
//     const idloggedUser = loggedInUser?._id;

//     const [messages, setMessages] = useState({});

//     useEffect(() => {
//         const messageListener = (message) => {
//             console.log(message)
//             setMessages((prevMessages) => {
//                 const newMessages = { ...prevMessages };
//                 newMessages[message._id] = message;
//                 return newMessages;
//             });

//         };

//         const deleteMessageListener = (messageID) => {
//             setMessages((prevMessages) => {
//                 const newMessages = { ...prevMessages };
//                 delete newMessages[messageID];
//                 return newMessages;
//             });
//         };

//         socket?.on('message', messageListener);
//         socket?.on('deleteMessage', deleteMessageListener);
//         socket?.emit('getMessages', presentationId);

//         // return () => {
//         //   socket.off('message', messageListener);
//         //   socket.off('deleteMessage', deleteMessageListener);
//         // };
//     }, [socket]);

//     const [value, setValue] = useState('');
//     const submitForm = (e) => {
//         e.preventDefault();
//         socket.emit('message', {
//             presentation_id: presentationId,
//             message: value,
//             owner_id: idloggedUser
//         });
//         setValue('');
//     };

//     return (
//         <div>
//             <Dialog
//                 PaperProps={{
//                     sx: {
//                         width: "50%",
//                         maxHeight: 600,
//                         minHeight: 600
//                     }
//                 }}
//                 scroll="paper"
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//                 disableScrollLock
//             >
//                 <IconButton onClick={handleClose}>
//                     <CloseIcon />
//                 </IconButton>
//                 <DialogContent>
//                     <ul className="chat">
//                         {/* {[...Object.values(messages)]
//                             .sort((a, b) => a.createdAt - b.createdAt)
//                             .map((message) => (
//                                 <div
//                                     key={message.id}
//                                     className="message-container"
//                                     title={`Sent at ${new Date(message.createdAt).toLocaleTimeString()}`}
//                                 >
//                                     <span className="user">{message.owner}:</span>
//                                     <span className="message">{message.message}</span>
//                                     <span className="date">{new Date(message.createdAt).toLocaleTimeString()}</span>
//                                 </div>
//                             ))
//                         } */}
//                         {[...Object.values(messages)]
//                             .sort((a, b) => a.createdAt - b.createdAt)
//                             .map((message) => (
//                                 (message.owner_id?._id === idloggedUser) ?
//                                     <li className="message right">
//                                         <p>{message.message}</p>
//                                     </li> :
//                                     <li className="message left">
//                                         <p>{message.message}</p>
//                                     </li>
//                             ))
//                         }
//                     </ul>
//                     <form onSubmit={submitForm}>
//                         <input
//                             value={value}
//                             placeholder="Type your message"
//                             className="text_input"
//                             onChange={(e) => {
//                                 setValue(e.currentTarget.value);
//                             }}
//                         />
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }

// Chat.propTypes = {
//     open: PropTypes.bool,
//     handleClose: PropTypes.func,
//     socket: PropTypes.object,
//     presentationId: PropTypes.string,

// };

// export default Chat;


/* eslint-disable eqeqeq */
/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Button, Dialog, DialogActions, Stack, DialogContent, Icon, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./index.css";
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    root: {

    },
    dialogPaper: {
        minHeight: '70vh',
        maxHeight: '70vh',
        minWidth: '60vh',
        maxWidth: '60vh',
    },
}));

function Chat({ open, handleClose, socket, presentationId}) {
    const loggedInUser = useSelector(state => state.user.current)
    const idloggedUser = loggedInUser.id;

    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                newMessages[message._id] = message;
                return newMessages;
            });

        };

        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                delete newMessages[messageID];
                return newMessages;
            });
        };

        socket?.on('message', messageListener);
        socket?.on('deleteMessage', deleteMessageListener);
        socket?.emit('getMessages', presentationId);

        return () => {
            socket?.off('message', messageListener);
            socket?.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);

    const [value, setValue] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('message', {
            presentation_id: presentationId,
            message: value,
            owner_id: presentationId,
        });
        setValue('');
    };

    return (
        <div>
            <Dialog
                PaperProps={{
                    sx: {
                        width: 500,
                        maxHeight: 600,
                        minHeight: 600
                    }
                }}
                scroll="paper"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableScrollLock
            >
                <IconButton sx={{ paddingLeft: "450px" }} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{ padding: "0px" }}>
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 500,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                        }}
                    >
                        {/* Put the scroll bar always on the bottom */}
                        <InfiniteScroll
                            dataLength={300}
                            // next={this.fetchMoreData}
                            style={{ display: 'flex', flexDirection: 'column-reverse' }}
                            inverse
                            // hasMore={true}
                            loader={<h4>Loading...</h4>}
                            scrollableTarget="scrollableDiv"
                        >
                            <ul className="chat">

                                {[...Object.values(messages)]
                                    .sort((a, b) => a.createdAt - b.createdAt)
                                    .map((message) => (
                                        (message.owner_id?._id === idloggedUser) ?
                                            <li className="message right">
                                                <Stack direction='row' sx={{
                                                    margin: 0
                                                }}>
                                                    <Typography variant="h10">
                                                        {message.owner_name}
                                                    </Typography>
                                                    <Typography variant="h10" sx={{
                                                        marginLeft: 1
                                                    }}>
                                                        {message.message}
                                                    </Typography>
                                                </Stack>
                                            </li> :
                                            <li className="message left">
                                                <p>{message.message}</p>
                                            </li>
                                    ))
                                }
                            </ul>
                            <form onSubmit={submitForm}>
                                <input
                                    value={value}
                                    placeholder="Type your message"
                                    className="text_input"
                                    onChange={(e) => {
                                        setValue(e.currentTarget.value);
                                    }}
                                />
                            </form>
                        </InfiniteScroll>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
}

Chat.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    socket: PropTypes.object,
    presentationId: PropTypes.string,
};

export default Chat;