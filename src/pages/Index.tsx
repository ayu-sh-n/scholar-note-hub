
import React, { useState } from 'react';
import { Book, Upload, Search, User, LogIn, BookOpen, FileText, Star, Download } from 'lucide-react';
import LoginPage from '../components/LoginPage';
import NotesRepository from '../components/NotesRepository';
import UploadNotes from '../components/UploadNotes';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    setCurrentPage('repository');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setCurrentPage('login');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  College Notes Hub
                </h1>
                <p className="text-sm text-gray-600">Your Academic Resource Center</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentPage('repository')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'repository'
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Book className="h-5 w-5" />
                <span>Repository</span>
              </button>
              <button
                onClick={() => setCurrentPage('upload')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'upload'
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Upload className="h-5 w-5" />
                <span>Upload Notes</span>
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
                <span className="text-blue-700 font-medium">{currentUser}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-blue-100">
        <div className="flex space-x-1 p-2">
          <button
            onClick={() => setCurrentPage('repository')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-200 ${
              currentPage === 'repository'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Book className="h-5 w-5" />
            <span>Repository</span>
          </button>
          <button
            onClick={() => setCurrentPage('upload')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-200 ${
              currentPage === 'upload'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Upload className="h-5 w-5" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'repository' && <NotesRepository />}
        {currentPage === 'upload' && <UploadNotes />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 College Notes Hub. Empowering students through shared knowledge.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
