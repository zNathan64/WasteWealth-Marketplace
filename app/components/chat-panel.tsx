"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MessageCircle, Send, User, Clock, Search } from "lucide-react"

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  message: string
  timestamp: string
  read: boolean
}

interface ChatConversation {
  id: string
  participantName: string
  participantCompany: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: ChatMessage[]
}

interface ChatPanelProps {
  conversations: ChatConversation[]
  onSendMessage: (conversationId: string, message: string) => void
}

export default function ChatPanel({ conversations, onSendMessage }: ChatPanelProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.participantCompany.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      onSendMessage(selectedConversation, newMessage)
      setNewMessage("")
    }
  }

  const selectedConv = conversations.find((c) => c.id === selectedConversation)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative hover-lift">
          <MessageCircle className="h-4 w-4" />
          {totalUnread > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-500 text-white text-xs">
              {totalUnread}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="h-96 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Messages</h3>
              <Badge variant="secondary">{totalUnread} unread</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-8"
              />
            </div>
          </div>

          {/* Conversations List */}
          {!selectedConversation ? (
            <ScrollArea className="flex-1">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversations yet</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="p-3 hover:bg-accent/50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate">{conversation.participantName}</p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="h-5 w-5 p-0 bg-blue-500 text-white text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{conversation.participantCompany}</p>
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            {conversation.lastMessageTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          ) : (
            /* Chat View */
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-3 border-b flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)} className="p-1">
                  ←
                </Button>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedConv?.participantName}</p>
                  <p className="text-xs text-muted-foreground">{selectedConv?.participantCompany}</p>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-3">
                  {selectedConv?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-sm ${
                          message.senderId === "me" ? "bg-green-600 text-white" : "bg-accent text-accent-foreground"
                        }`}
                      >
                        <p>{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "me" ? "text-green-100" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
