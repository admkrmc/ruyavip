import React, { useState } from 'react';
import { Search, Plus, Trash2, Download, Image as ImageIcon, Video, Calendar, Eye, Share2, Heart, MessageCircle, X, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';

const Gallery = () => {
  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: 'Oyun Zamanı',
      date: '2025-01-05',
      type: 'photo',
      count: 15,
      cover: null,
      items: [
        { id: 1, type: 'photo', url: null, caption: 'Zeynep blok oynarken', likes: 12, comments: 3, date: '2025-01-05' },
        { id: 2, type: 'photo', url: null, caption: 'Grup aktivitesi', likes: 18, comments: 5, date: '2025-01-05' },
        { id: 3, type: 'photo', url: null, caption: 'Bahçede oyun', likes: 15, comments: 2, date: '2025-01-05' }
      ]
    },
    {
      id: 2,
      title: 'Sanat Etkinliği',
      date: '2025-01-03',
      type: 'photo',
      count: 24,
      cover: null,
      items: [
        { id: 4, type: 'photo', url: null, caption: 'Parmak boyama', likes: 20, comments: 7, date: '2025-01-03' },
        { id: 5, type: 'photo', url: null, caption: 'Kağıt kesme çalışması', likes: 16, comments: 4, date: '2025-01-03' }
      ]
    },
    {
      id: 3,
      title: 'Doğum Günü Kutlaması',
      date: '2024-12-28',
      type: 'mixed',
      count: 32,
      cover: null,
      items: [
        { id: 6, type: 'photo', url: null, caption: 'Pasta kesme anı', likes: 45, comments: 12, date: '2024-12-28' },
        { id: 7, type: 'video', url: null, caption: 'Doğum günü şarkısı', likes: 38, comments: 8, date: '2024-12-28' },
        { id: 8, type: 'photo', url: null, caption: 'Hep birlikte', likes: 42, comments: 15, date: '2024-12-28' }
      ]
    },
    {
      id: 4,
      title: 'Müzik Dersi',
      date: '2024-12-20',
      type: 'video',
      count: 8,
      cover: null,
      items: [
        { id: 9, type: 'video', url: null, caption: 'Şarkı söylüyoruz', likes: 28, comments: 6, date: '2024-12-20' }
      ]
    }
  ]);

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [uploadData, setUploadData] = useState({
    albumId: '',
    caption: '',
    files: []
  });
  const [deleteAlbumModal, setDeleteAlbumModal] = useState({ show: false, albumId: null, albumTitle: '' });
  const [uploadSuccessModal, setUploadSuccessModal] = useState({ show: false });

  const filteredAlbums = albums.filter(album => {
    const matchesSearch = album.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || album.type === filterType || album.type === 'mixed';
    return matchesSearch && matchesType;
  });

  const totalPhotos = albums.reduce((sum, album) =>
    sum + album.items.filter(item => item.type === 'photo').length, 0
  );

  const totalVideos = albums.reduce((sum, album) =>
    sum + album.items.filter(item => item.type === 'video').length, 0
  );

  const totalLikes = albums.reduce((sum, album) =>
    sum + album.items.reduce((s, item) => s + item.likes, 0), 0
  );

  const handleOpenAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum(null);
  };

  const handleOpenLightbox = (media, album) => {
    setSelectedMedia({ ...media, albumItems: album.items });
    setShowLightbox(true);
  };

  const handleCloseLightbox = () => {
    setShowLightbox(false);
    setSelectedMedia(null);
  };

  const handleNextMedia = () => {
    if (!selectedMedia) return;
    const currentIndex = selectedMedia.albumItems.findIndex(item => item.id === selectedMedia.id);
    const nextIndex = (currentIndex + 1) % selectedMedia.albumItems.length;
    setSelectedMedia({ ...selectedMedia.albumItems[nextIndex], albumItems: selectedMedia.albumItems });
  };

  const handlePrevMedia = () => {
    if (!selectedMedia) return;
    const currentIndex = selectedMedia.albumItems.findIndex(item => item.id === selectedMedia.id);
    const prevIndex = currentIndex === 0 ? selectedMedia.albumItems.length - 1 : currentIndex - 1;
    setSelectedMedia({ ...selectedMedia.albumItems[prevIndex], albumItems: selectedMedia.albumItems });
  };

  const handleLike = (mediaId) => {
    if (!selectedAlbum) return;

    setAlbums(albums.map(album => {
      if (album.id === selectedAlbum.id) {
        return {
          ...album,
          items: album.items.map(item =>
            item.id === mediaId ? { ...item, likes: item.likes + 1 } : item
          )
        };
      }
      return album;
    }));

    setSelectedAlbum({
      ...selectedAlbum,
      items: selectedAlbum.items.map(item =>
        item.id === mediaId ? { ...item, likes: item.likes + 1 } : item
      )
    });
  };

  const handleDeleteAlbum = (album) => {
    setDeleteAlbumModal({ show: true, albumId: album.id, albumTitle: album.title });
  };

  const confirmDeleteAlbum = () => {
    setAlbums(albums.filter(a => a.id !== deleteAlbumModal.albumId));
    setDeleteAlbumModal({ show: false, albumId: null, albumTitle: '' });
  };

  const handleUpload = () => {
    setUploadSuccessModal({ show: true });
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Galeri</h2>
          <p className="text-gray-600">Fotoğraf ve videoları paylaşın</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Download}>
            Tümünü İndir
          </Button>
          <Button variant="primary" icon={Plus} onClick={() => setShowUploadModal(true)}>
            Yükle
          </Button>
        </div>
      </div>

      {/* Filtreler */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Albüm ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
            className="md:col-span-2"
          />
          <Select
            placeholder="Tür"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { value: 'photo', label: 'Fotoğraflar' },
              { value: 'video', label: 'Videolar' },
              { value: 'mixed', label: 'Karışık' }
            ]}
          />
        </div>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Toplam Albüm</p>
              <p className="text-3xl font-bold text-purple-700">{albums.length}</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <ImageIcon size={24} className="text-purple-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Fotoğraflar</p>
              <p className="text-3xl font-bold text-blue-700">{totalPhotos}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              <ImageIcon size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-600 font-medium">Videolar</p>
              <p className="text-3xl font-bold text-pink-700">{totalVideos}</p>
            </div>
            <div className="p-3 bg-pink-200 rounded-lg">
              <Video size={24} className="text-pink-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Toplam Beğeni</p>
              <p className="text-3xl font-bold text-red-700">{totalLikes}</p>
            </div>
            <div className="p-3 bg-red-200 rounded-lg">
              <Heart size={24} className="text-red-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Albüm Görünümü veya Albüm İçeriği */}
      {!selectedAlbum ? (
        /* Albüm Kartları */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlbums.map((album, index) => (
            <Card
              key={album.id}
              hover
              className="cursor-pointer animate-scaleIn"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleOpenAlbum(album)}
            >
              {/* Albüm Kapağı */}
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                {album.type === 'video' || album.type === 'mixed' ? (
                  <div className="absolute top-2 right-2 bg-black/60 rounded-full p-2">
                    <Video size={20} className="text-white" />
                  </div>
                ) : null}
                <div className="text-center">
                  <ImageIcon size={48} className="text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-600 font-semibold">{album.count} öğe</p>
                </div>
              </div>

              {/* Albüm Bilgisi */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">{album.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(album.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAlbum(album);
                      }}
                      className="hover:text-purple-600 transition-colors"
                      title="Görüntüle"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAlbum(album);
                      }}
                      className="hover:text-red-600 transition-colors"
                      title="Sil"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Albüm İçeriği - Fotoğraf Grid */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleCloseAlbum}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              <ChevronLeft size={20} />
              Albümlere Dön
            </button>
            <h3 className="text-xl font-bold text-gray-800">{selectedAlbum.title}</h3>
            <div className="text-sm text-gray-600">
              {selectedAlbum.items.length} öğe
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {selectedAlbum.items.map((media, index) => (
              <Card
                key={media.id}
                hover
                className="cursor-pointer p-0 overflow-hidden animate-scaleIn"
                style={{ animationDelay: `${index * 30}ms` }}
                onClick={() => handleOpenLightbox(media, selectedAlbum)}
              >
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 relative flex items-center justify-center">
                  {media.type === 'video' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Video size={24} className="text-purple-600" />
                      </div>
                    </div>
                  ) : (
                    <ImageIcon size={32} className="text-purple-300" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-600 truncate mb-2">{media.caption}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Heart size={12} className="text-red-500" />
                        <span>{media.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={12} className="text-blue-500" />
                        <span>{media.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {showLightbox && selectedMedia && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={32} className="text-white" />
          </button>

          <button
            onClick={handlePrevMedia}
            className="absolute left-4 p-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>

          <button
            onClick={handleNextMedia}
            className="absolute right-4 p-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronRight size={32} className="text-white" />
          </button>

          <div className="max-w-5xl w-full px-20">
            <div className="bg-gradient-to-br from-purple-200 to-pink-200 aspect-video rounded-lg flex items-center justify-center mb-4">
              {selectedMedia.type === 'video' ? (
                <Video size={64} className="text-purple-600" />
              ) : (
                <ImageIcon size={64} className="text-purple-600" />
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-white text-lg mb-4">{selectedMedia.caption}</p>
              <div className="flex items-center justify-between text-white/80">
                <span className="text-sm">{selectedMedia.date}</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(selectedMedia.id)}
                    className="flex items-center gap-2 hover:text-red-400 transition-colors"
                  >
                    <Heart size={20} />
                    <span>{selectedMedia.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <MessageCircle size={20} />
                    <span>{selectedMedia.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Upload */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Fotoğraf/Video Yükle"
        size="lg"
      >
        <div className="space-y-4">
          <Select
            label="Albüm Seç"
            value={uploadData.albumId}
            onChange={(e) => setUploadData({...uploadData, albumId: e.target.value})}
            options={albums.map(a => ({ value: a.id, label: a.title }))}
            required
          />

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
            <Upload size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Dosyaları sürükleyin veya seçin</p>
            <p className="text-sm text-gray-500">JPG, PNG, MP4 (Max 10MB)</p>
            <Button variant="outline" className="mt-4">
              Dosya Seç
            </Button>
          </div>

          <Input
            label="Açıklama"
            value={uploadData.caption}
            onChange={(e) => setUploadData({...uploadData, caption: e.target.value})}
            placeholder="Fotoğraf/video hakkında..."
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              İptal
            </Button>
            <Button variant="primary" icon={Upload} onClick={handleUpload}>
              Yükle
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Album Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteAlbumModal.show}
        onClose={() => setDeleteAlbumModal({ show: false, albumId: null, albumTitle: '' })}
        onConfirm={confirmDeleteAlbum}
        title="Albümü Sil"
        message={`"${deleteAlbumModal.albumTitle}" albümünü ve içindeki tüm fotoğrafları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        type="danger"
        confirmText="Evet, Sil"
        cancelText="İptal"
      />

      {/* Upload Success Modal */}
      <ConfirmationModal
        isOpen={uploadSuccessModal.show}
        onClose={() => setUploadSuccessModal({ show: false })}
        onConfirm={() => setUploadSuccessModal({ show: false })}
        title="Dosyalar Yükleniyor"
        message="Dosyalar yükleniyor... (Firebase Storage entegrasyonu yapılacak)"
        type="info"
        confirmText="Tamam"
        showCancel={false}
      />
    </div>
  );
};

export default Gallery;
