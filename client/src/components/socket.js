import {io} from "socket.io-client"
const socket = io()
export default socket


// export const useSocket = () => {
//     return useContext(SocketContext)
// }
//
// export const SocketProvider = ({id, children}) => {
//     const [socket, setSocket] = useState()
//
//     useEffect(() => {
//         const newSocket = io(
//             'http://localhost:3000',
//             { query: { id } }
//         );
//         setSocket(newSocket)
//
//         return () => newSocket.close()
//     })
//     return (
//
//             <SocketContext.Povider value={socket}>
//                 {children}
//             </SocketContext.Povider>
//
//
//     )
// }
