import { useState, useEffect, useCallback, useRef } from 'react';
import { getNotes, createNote as createNoteAPI, updateNote, deleteNote as deleteNoteAPI, getProjects } from '../services/api';
import { FileText, Trash2, Plus, Search, Check, AlertCircle, Bold, Italic, Underline, List, ListOrdered, BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// New Note Modal Component
const NewNoteModal = ({ isOpen, onClose, onCreateNote, projects }) => {
  const [title, setTitle] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter a note title');
      return;
    }
    if (!selectedProject) {
      alert('Please select a project');
      return;
    }
    
    onCreateNote({
      title: title.trim(),
      project_id: parseInt(selectedProject)
    });
    
    // Reset form
    setTitle('');
    setSelectedProject('');
  };

  const handleCancel = () => {
    setTitle('');
    setSelectedProject('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Note</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="note-title" className="block text-sm font-medium text-gray-700 mb-2">
                Note Title *
              </label>
              <input
                id="note-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Enter note title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="note-project" className="block text-sm font-medium text-gray-700 mb-2">
                Project *
              </label>
              <select
                id="note-project"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a project...</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const contentEditableRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      await loadProjects();
      await loadNotes();
    };
    init();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      loadNotes();
    }
  }, [selectedProject]);

  useEffect(() => {
    if (currentNote && contentEditableRef.current) {
      contentEditableRef.current.innerHTML = currentNote.content || '';
    }
  }, [currentNote?.id]);

  const loadProjects = async () => {
    try {
      const data = await getProjects(token);
      setProjects(data || []);
    } catch (error) {
      console.error('Failed to load projects:', error);
      setProjects([]);
    }
  };

  const loadNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes(token, selectedProject);
      setNotes(data || []);
      if (data && data.length > 0 && !currentNote) {
        setCurrentNote(data[0]);
      } else if (!data || data.length === 0) {
        setCurrentNote(null);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
      setError('Failed to load notes. Make sure your Flask server is running.');
      setNotes([]);
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
        content: note.content,
        project_id: note.project_id
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

  const handleNoteProjectChange = async (noteId, projectId) => {
    const noteToUpdate = notes.find(n => n.id === noteId);
    if (!noteToUpdate) return;

    const currentProjectId = noteToUpdate.project_id === null ? '' : String(noteToUpdate.project_id);
    const newProjectIdStr = projectId === '' ? '' : String(projectId);
    
    if (currentProjectId === newProjectIdStr) {
      console.log('Project already matches, skipping update');
      return;
    }

    const newProjectId = projectId && projectId !== '' ? parseInt(projectId) : null;
    
    console.log('Updating note project:', {
      noteId,
      oldProjectId: noteToUpdate.project_id,
      newProjectId,
      projectIdParam: projectId
    });

    const updatedNote = { ...noteToUpdate, project_id: newProjectId };
    setNotes(prevNotes => prevNotes.map(n => n.id === noteId ? updatedNote : n));
    
    if (currentNote?.id === noteId) {
      setCurrentNote(updatedNote);
    }

    try {
      const response = await updateNote(noteId, {
        title: noteToUpdate.title,
        content: noteToUpdate.content,
        project_id: newProjectId
      }, token);
      console.log('Note project updated successfully:', response);
    } catch (error) {
      console.error('Failed to update project:', error);
      setError('Failed to change project');
      setNotes(prevNotes => prevNotes.map(n => n.id === noteId ? noteToUpdate : n));
      if (currentNote?.id === noteId) {
        setCurrentNote(noteToUpdate);
      }
    }
  };

  const handleContentEditableChange = () => {
    if (contentEditableRef.current) {
      const newContent = contentEditableRef.current.innerHTML;
      if (newContent !== currentNote?.content) {
        handleContentChange('content', newContent);
      }
    }
  };

  const createNote = async (noteData) => {
    setError(null);
    try {
      const data = await createNoteAPI({
        title: noteData.title,
        content: '',
        project_id: noteData.project_id
      }, token);
      const newNote = { 
        id: data.id, 
        title: noteData.title, 
        content: '',
        project_id: noteData.project_id,
        updated_at: new Date().toISOString() 
      };
      setNotes([newNote, ...notes]);
      setCurrentNote(newNote);
      setIsModalOpen(false);
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

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedProject === null || selectedProject === '') {
      return matchesSearch;
    } else {
      const selectedProjectId = parseInt(selectedProject);
      return matchesSearch && note.project_id === selectedProjectId;
    }
  });

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

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'No Project';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
            <div 
              className={`bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300 ${
                isSidebarCollapsed ? 'w-12' : 'w-80'
              }`}
            >
              <div className="p-2 border-b border-gray-200 flex justify-end">
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600"
                  title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
              </div>

              {!isSidebarCollapsed && (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors font-medium shadow-sm"
                    >
                      <Plus size={20} />
                      New Note
                    </button>
                  </div>

                  <div className="p-4 border-b border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Project
                    </label>
                    <select
                      value={selectedProject || ''}
                      onChange={(e) => setSelectedProject(e.target.value || null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="">All Projects</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
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
                        <p>{searchQuery || selectedProject ? 'No notes found' : 'No notes yet'}</p>
                        <p className="text-sm mt-2">
                          {searchQuery || selectedProject ? 'Try adjusting your filters' : 'Create your first note to get started'}
                        </p>
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
                              
                              <div className="mt-2">
                                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                  {getProjectName(note.project_id)}
                                </span>
                              </div>
                              
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
                </>
              )}
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
                  <div className="px-8 pt-6 pb-3 border-b border-gray-200">
                    <div className="flex items-start gap-4">
                      <input
                        type="text"
                        value={currentNote.title}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                        className="flex-1 text-2xl font-semibold text-gray-900 focus:outline-none placeholder-gray-400 border-b border-transparent hover:border-gray-300 focus:border-blue-500 pb-2 transition-colors"
                        placeholder="Untitled Document"
                      />
                      <div className="flex flex-col gap-1 min-w-[200px]">
                        <label className="text-xs font-medium text-gray-600">
                          Project
                        </label>
                        <select
                          value={currentNote.project_id || ''}
                          onChange={(e) => handleNoteProjectChange(currentNote.id, e.target.value)}
                          className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">No Project</option>
                          {projects.map(project => (
                            <option key={project.id} value={project.id}>
                              {project.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 px-8 py-2 flex items-center justify-between bg-gray-50">
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

                  <div className="flex-1 overflow-y-auto px-8 py-6">
                    <div
                      ref={contentEditableRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={handleContentEditableChange}
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
                        onClick={() => setIsModalOpen(true)}
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
      
      <NewNoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateNote={createNote}
        projects={projects}
      />
    </div>
  );
};