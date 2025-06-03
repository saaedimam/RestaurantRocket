import { useEffect, useRef, useState } from "react";

interface WebSocketMessage {
  type: string;
  data: any;
}

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    const connect = () => {
      try {
        websocket.current = new WebSocket(wsUrl);

        websocket.current.onopen = () => {
          console.log("WebSocket connected");
          setIsConnected(true);
        };

        websocket.current.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            setLastMessage(message);
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        websocket.current.onclose = () => {
          console.log("WebSocket disconnected");
          setIsConnected(false);
          
          // Attempt to reconnect after 3 seconds
          setTimeout(() => {
            if (websocket.current?.readyState === WebSocket.CLOSED) {
              connect();
            }
          }, 3000);
        };

        websocket.current.onerror = (error) => {
          console.error("WebSocket error:", error);
          setIsConnected(false);
        };
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
        setIsConnected(false);
      }
    };

    connect();

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  const sendMessage = (message: WebSocketMessage) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  return {
    isConnected,
    lastMessage,
    sendMessage
  };
}

export function useWebSocketSubscription(messageType: string, callback: (data: any) => void) {
  const { lastMessage } = useWebSocket();

  useEffect(() => {
    if (lastMessage && lastMessage.type === messageType) {
      callback(lastMessage.data);
    }
  }, [lastMessage, messageType, callback]);
}
