import React, { useState } from 'react';
import { Search, Send, Paperclip, Image, Phone, Video, MoreVertical, Check, CheckCheck, Clock, Plus, Users, User } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Modal } from './ui/Modal';

const MessagingSystem = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      type: 'parent',
      avatar: 'AY',
      lastMessage: 'Zeynep bugün biraz yorgun görünüyordu',
      timestamp: '10:45',
      unread: 2,
      online: true,
      messages: [
        { id: 1, sender: 'other', text: 'Merhaba, Zeynep bugün nasıldı?', time: '10:30', read: true },
        { id: 2, sender: 'me', text: 'Merhaba Ayşe Hanım, Zeynep çok iyi, akşam yaptığı resmi size gönderdim', time: '10:32', read: true },
        { id: 3, sender: 'other', text: 'Teşekkürler, çok güzel olmuş', time: '10:35', read: true },
        { id: 4, sender: 'other', text: 'Zeynep bugün biraz yorgun görünüyordu', time: '10:45', read: false }
      ]
    },
    {
      id: 2,
      name: 'Fatma Demir',
      type: 'parent',
      avatar: 'FD',
      lastMessage: 'Yarın gelemeyeceğiz',
      timestamp: 'Dün',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'other', text: 'Yarın Mehmet hastalandığı için gelemeyeceğiz', time: 'Dün 14:20', read: true },
        { id: 2, sender: 'me', text: 'Geçmiş olsun, sağlığına kavuşsun', time: 'Dün 14:25', read: true }
      ]
    },
    {
      id: 3,
      name: 'Öğretmenler Grubu',
      type: 'group',
      avatar: 'ÖG',
      lastMessage: 'Toplantı saat 15:00\'da',
      timestamp: '09:15',
      unread: 5,
      online: null,
      messages: [
        { id: 1, sender: 'Elif Öğretmen', text: 'Bugün toplantı var mı?', time: '09:00', read: true },
        { id: 2, sender: 'me', text: 'Evet, saat 15:00\'da', time: '09:15', read: true },
        { id: 3, sender: 'Mehmet Öğretmen', text: 'Tamam, oradayım', time: '09:20', read: false }
      ]
    },
    {
      id: 4,
      name: 'Hasan Kaya',
      type: 'parent',
      avatar: 'HK',
      lastMessage: 'Servis saati değişti mi?',
      timestamp: '2 gün önce',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'other', text: 'Servis saati değişti mi?', time: '2 gün önce', read: true },
        { id: 2, sender: 'me', text: 'Hayır, aynı saatte devam ediyor', time: '2 gün önce', read: true }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setConversations(conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageInput,
          timestamp: 'Şimdi'
        };
      }
      return conv;
    }));

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    });

    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageStatusIcon = (message) => {
    if (message.sender === 'other') return null;

    return message.read ? (
      <CheckCheck size={14} className="text-blue-500" />
    ) : (
      <Check size={14} className="text-gray-400" />
    );
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Mesajlaşma</h2>
          <p className="text-gray-600">
            Veliler ve öğretmenlerle anlık iletişim
            {totalUnread > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                {totalUnread} Okunmamış
              </span>
            )}
          </p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setShowNewChatModal(true)}>
          Yeni Sohbet
        </Button>
      </div>

      {/* Mesajlaşma Arayüzü */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sol Panel - Konuşma Listesi */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="h-[600px] flex flex-col p-0">
            {/* Arama */}
            <div className="p-4 border-b border-gray-200">
              <Input
                placeholder="Kişi veya grup ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>

            {/* Konuşmalar */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                    selectedConversation?.id === conv.id ? 'bg-purple-50 border-l-4 border-l-purple-600' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      conv.type === 'group' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* İçerik */}
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-800 truncate">{conv.name}</h4>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conv.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-purple-600 text-white rounded-full text-xs font-semibold flex-shrink-0">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Grup İkonu */}
                  {conv.type === 'group' && (
                    <Users size={16} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Sağ Panel - Mesaj Alanı */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-[600px] flex flex-col p-0">
            {selectedConversation ? (
              <>
                {/* Başlık */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                      selectedConversation.type === 'group'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {selectedConversation.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedConversation.name}</h3>
                      {selectedConversation.online !== null && (
                        <p className="text-xs text-gray-500">
                          {selectedConversation.online ? 'Çevrimiçi' : 'Çevrimdışı'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Aksiyonlar */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Sesli Arama">
                      <Phone size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Görüntülü Arama">
                      <Video size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Daha Fazla">
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Mesajlar */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                        {message.sender !== 'me' && selectedConversation.type === 'group' && (
                          <p className="text-xs text-gray-500 mb-1 ml-3">{message.sender}</p>
                        )}
                        <div className={`px-4 py-2 rounded-2xl ${
                          message.sender === 'me'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 px-2 ${
                          message.sender === 'me' ? 'justify-end' : 'justify-start'
                        }`}>
                          <span className="text-xs text-gray-500">{message.time}</span>
                          {getMessageStatusIcon(message)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mesaj Gönderme */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Dosya Ekle">
                      <Paperclip size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Fotoğraf Ekle">
                      <Image size={20} className="text-gray-600" />
                    </button>
                    <div className="flex-1">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Mesajınızı yazın..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows="1"
                        style={{ minHeight: '40px', maxHeight: '120px' }}
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Gönder"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} className="text-gray-400" />
                  </div>
                  <p className="text-lg font-semibold mb-2">Mesajlaşmaya başlayın</p>
                  <p className="text-sm">Sol taraftan bir konuşma seçin veya yeni sohbet başlatın</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Modal - Yeni Sohbet */}
      <Modal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        title="Yeni Sohbet Başlat"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Kişi veya Grup Seç"
            placeholder="Ara..."
            icon={Search}
          />

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">Veliler</p>
            <div className="space-y-1">
              {['Ayşe Yılmaz', 'Fatma Demir', 'Hasan Kaya'].map((name, idx) => (
                <button
                  key={idx}
                  className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-medium text-gray-800">{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowNewChatModal(false)}>
              İptal
            </Button>
            <Button variant="primary" icon={Send}>
              Sohbet Başlat
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MessagingSystem;
