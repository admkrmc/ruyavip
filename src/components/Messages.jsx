import React, { useState } from 'react';
import { Send, Search } from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      lastMessage: 'Çocuğum bugün hasta, gelemiyor',
      time: '10:30',
      unread: 2,
      avatar: 'AY'
    },
    {
      id: 2,
      name: 'Mehmet Demir',
      lastMessage: 'Teşekkür ederim',
      time: 'Dün',
      unread: 0,
      avatar: 'MD'
    },
    {
      id: 3,
      name: 'Fatma Kaya',
      lastMessage: 'Toplantı saati kaçta?',
      time: '2 gün önce',
      unread: 1,
      avatar: 'FK'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Mesaj gönderiliyor:', message);
      setMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Mesajlar</h2>

      <div className="card p-0 overflow-hidden h-[600px] flex">
        {/* Sol Taraf - Konuşma Listesi */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                  selectedChat?.id === conv.id ? 'bg-purple-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-800 truncate">{conv.name}</h4>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-semibold flex-shrink-0">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sağ Taraf - Mesajlaşma Alanı */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                    {selectedChat.avatar}
                  </div>
                  <h3 className="font-semibold text-gray-800">{selectedChat.name}</h3>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
                      <p className="text-gray-800">{selectedChat.lastMessage}</p>
                      <span className="text-xs text-gray-500 mt-1 block">10:30</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-3 max-w-xs shadow-sm">
                      <p>Tamam, geçmiş olsun</p>
                      <span className="text-xs text-purple-100 mt-1 block">10:32</span>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button type="submit" className="btn-primary flex items-center gap-2">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Mesajlaşmak için bir konuşma seçin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
