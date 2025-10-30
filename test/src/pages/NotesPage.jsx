import { useState, useEffect, useCallback, useRef } from 'react';
import { getNotes, createNote as createNoteAPI, updateNote, deleteNote as deleteNoteAPI } from '../services/api';
import { FileText, Trash2, Plus, Search, Check, AlertCircle, Bold, Italic, Underline, List, ListOrdered, BookOpen } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const NotesPage = ({ onNavigate }) => {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentEditableRef = useRef(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes(token);
      setNotes(data);
      if (data.length > 0 && !currentNote) {
        setCurrentNote(data[0]);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
      setError('Failed to load notes. Make sure your Flask server is running.');
    } finally {
      setLoading(false);
    }
  };

  const autoSave = useCallback(async (note) => {
    if (!note || !note.id) return;
    setIsSaving(true);
    setError(null);
    try {
      await updateNote(note.id, {
        title: note.title,
        content: note.content
      }, token);
      setIsSaving(false);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
      setError('Failed to save changes');
      setIsSaving(false);
    }
  }, [token]);

  const handleContentChange = (field, value) => {
    const updatedNote = { ...currentNote, [field]: value };
    setCurrentNote(updatedNote);
    setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n));
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    const timer = setTimeout(() => {
      autoSave(updatedNote);
    }, 2000);
    setAutoSaveTimer(timer);
  };

  const handleContentEditableChange = () => {
    if (contentEditableRef.current) {
      const newContent = contentEditableRef.current.innerHTML;
      handleContentChange('content', newContent);
    }
  };

  const createNote = async () => {
    setError(null);
    try {
      const data = await createNoteAPI({
        title: 'Untitled Document',
        content: ''
      }, token);
      const newNote = { 
        id: data.id, 
        title: 'Untitled Document', 
        content: '', 
        updated_at: new Date().toISOString() 
      };
      setNotes([newNote, ...notes]);
      setCurrentNote(newNote);
    } catch (error) {
      console.error('Failed to create note:', error);
      setError('Failed to create new note');
    }
  };

  const deleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    setError(null);
    try {
      await deleteNoteAPI(noteId, token);
      const filteredNotes = notes.filter(n => n.id !== noteId);
      setNotes(filteredNotes);
      if (currentNote?.id === noteId) {
        setCurrentNote(filteredNotes[0] || null);
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      setError('Failed to delete note');
    }
  };

  const applyFormatting = (command, value = null) => {
    document.execCommand(command, false, value);
    contentEditableRef.current?.focus();
    handleContentEditableChange();
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  // The headers and list not working at the moment 
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activePage="notes" onNavigate={onNavigate} />
        <main className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="bg-white border-b border-gray-200 px-8 py-4">
            <h2 className="text-2xl font-bold text-blue-700 flex items-center space-x-2">
              <BookOpen size={28} />
              <span>Notes</span>
            </h2>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <button
                  onClick={createNote}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  <Plus size={20} />
                  New Note
                </button>
              </div>
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredNotes.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>{searchQuery ? 'No notes found' : 'No notes yet'}</p>
                    <p className="text-sm mt-2">Create your first note to get started</p>
                  </div>
                ) : (
                  filteredNotes.map(note => (
                    <div
                      key={note.id}
                      onClick={() => setCurrentNote(note)}
                      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                        currentNote?.id === note.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {note.title || 'Untitled Document'}
                          </h3>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {note.content ? note.content.replace(/<[^>]*>/g, '').substring(0, 60) : 'Empty note'}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatDate(note.updated_at)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Delete note"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {error && (
                <div className="bg-red-50 border-b border-red-200 p-3 flex items-center gap-2 text-red-700">
                  <AlertCircle size={18} />
                  <span className="text-sm">{error}</span>
                  <button 
                    onClick={() => setError(null)}
                    className="ml-auto text-red-700 hover:text-red-900"
                  >
                    ×
                  </button>
                </div>
              )}
              {currentNote ? (
                <>
                  <div className="border-b border-gray-200 p-3 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => applyFormatting('bold')}
                        className="p-2 rounded hover:bg-gray-200 transition-colors"
                        title="Bold (Ctrl+B)"
                      >
                        <Bold size={18} />
                      </button>
                      <button
                        onClick={() => applyFormatting('italic')}
                        className="p-2 rounded hover:bg-gray-200 transition-colors"
                        title="Italic (Ctrl+I)"
                      >
                        <Italic size={18} />
                      </button>
                      <button
                        onClick={() => applyFormatting('underline')}
                        className="p-2 rounded hover:bg-gray-200 transition-colors"
                        title="Underline (Ctrl+U)"
                      >
                        <Underline size={18} />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-2"></div>
                      <button
                        onClick={() => applyFormatting('formatBlock', 'h1')}
                        className="px-3 py-2 rounded hover:bg-gray-200 text-lg font-bold transition-colors"
                        title="Heading 1"
                      >
                        H1
                      </button>
                      <button
                        onClick={() => applyFormatting('formatBlock', 'h2')}
                        className="px-3 py-2 rounded hover:bg-gray-200 text-base font-bold transition-colors"
                        title="Heading 2"
                      >
                        H2
                      </button>
                      <button
                        onClick={() => applyFormatting('formatBlock', 'h3')}
                        className="px-3 py-2 rounded hover:bg-gray-200 text-sm font-bold transition-colors"
                        title="Heading 3"
                      >
                        H3
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-2"></div>
                      <button
                        onClick={() => applyFormatting('insertUnorderedList')}
                        className="p-2 rounded hover:bg-gray-200 transition-colors"
                        title="Bullet List"
                      >
                        <List size={18} />
                      </button>
                      <button
                        onClick={() => applyFormatting('insertOrderedList')}
                        className="p-2 rounded hover:bg-gray-200 transition-colors"
                        title="Numbered List"
                      >
                        <ListOrdered size={18} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      {isSaving ? (
                        <span className="text-sm text-gray-500 flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                          Saving...
                        </span>
                      ) : lastSaved ? (
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Check size={14} className="text-green-600" />
                          Saved at {new Date(lastSaved).toLocaleTimeString()}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="p-8 pb-4 border-b border-gray-100">
                    <input
                      type="text"
                      value={currentNote.title}
                      onChange={(e) => handleContentChange('title', e.target.value)}
                      className="w-full text-4xl font-bold text-gray-900 focus:outline-none placeholder-gray-400"
                      placeholder="Untitled Document"
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto px-8 py-6">
                    <div
                      ref={contentEditableRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={handleContentEditableChange}
                      onBlur={handleContentEditableChange}
                      className="min-h-full text-gray-800 focus:outline-none leading-relaxed prose prose-lg max-w-none"
                      style={{ 
                        fontSize: '16px',
                        lineHeight: '1.8'
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-xl font-medium text-gray-500">
                      Select a note or create a new one
                    </p>
                    {notes.length === 0 && (
                      <button
                        onClick={createNote}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Create Your First Note
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
