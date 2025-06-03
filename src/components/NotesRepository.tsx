
import React, { useState } from 'react';
import { Search, Filter, Download, Star, Eye, Calendar, User, FileText, BookOpen } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  subject: string;
  author: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  description: string;
  fileSize: string;
  tags: string[];
}

const NotesRepository = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  // Sample notes data
  const [notes] = useState<Note[]>([
    {
      id: 1,
      title: "Advanced Calculus - Differentiation Techniques",
      subject: "Mathematics",
      author: "Sarah Johnson",
      uploadDate: "2024-01-15",
      downloads: 324,
      rating: 4.8,
      description: "Comprehensive notes covering all differentiation techniques with solved examples and practice problems.",
      fileSize: "2.4 MB",
      tags: ["calculus", "differentiation", "examples"]
    },
    {
      id: 2,
      title: "Object-Oriented Programming in Java",
      subject: "Computer Science",
      author: "Mike Chen",
      uploadDate: "2024-01-12",
      downloads: 567,
      rating: 4.9,
      description: "Complete OOP concepts in Java including inheritance, polymorphism, and encapsulation with code examples.",
      fileSize: "3.7 MB",
      tags: ["java", "oop", "programming"]
    },
    {
      id: 3,
      title: "Modern European History - World War II",
      subject: "History",
      author: "Emily Davis",
      uploadDate: "2024-01-10",
      downloads: 245,
      rating: 4.6,
      description: "Detailed analysis of WWII events, causes, and consequences with timeline and key figures.",
      fileSize: "5.1 MB",
      tags: ["wwii", "europe", "timeline"]
    },
    {
      id: 4,
      title: "Organic Chemistry - Reaction Mechanisms",
      subject: "Chemistry",
      author: "David Wilson",
      uploadDate: "2024-01-08",
      downloads: 412,
      rating: 4.7,
      description: "Step-by-step breakdown of organic reaction mechanisms with electron flow diagrams.",
      fileSize: "4.2 MB",
      tags: ["organic", "reactions", "mechanisms"]
    },
    {
      id: 5,
      title: "Microeconomics - Supply and Demand",
      subject: "Economics",
      author: "Lisa Garcia",
      uploadDate: "2024-01-05",
      downloads: 298,
      rating: 4.5,
      description: "Fundamental concepts of supply and demand with real-world applications and case studies.",
      fileSize: "1.8 MB",
      tags: ["microeconomics", "supply", "demand"]
    },
    {
      id: 6,
      title: "Data Structures and Algorithms",
      subject: "Computer Science",
      author: "Alex Thompson",
      uploadDate: "2024-01-03",
      downloads: 689,
      rating: 4.9,
      description: "Complete guide to data structures and algorithms with implementation in Python and complexity analysis.",
      fileSize: "6.3 MB",
      tags: ["algorithms", "data-structures", "python"]
    }
  ]);

  const subjects = ["All", "Mathematics", "Computer Science", "History", "Chemistry", "Economics", "Physics", "Biology"];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleDownload = (noteId: number, title: string) => {
    console.log(`Downloading note: ${title}`);
    // Simulate download
    alert(`Downloading: ${title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Notes Repository</h2>
            <p className="text-gray-600">Discover and access study materials shared by your peers</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
            <FileText className="h-4 w-4" />
            <span>{filteredNotes.length} notes available</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Notes</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, subject, author, or tags..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedNotes.map(note => (
          <div key={note.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300 group">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {note.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {note.subject}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{note.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Metadata */}
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{note.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(note.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{note.downloads} downloads</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{note.fileSize}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownload(note.id, note.title)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedNotes.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default NotesRepository;
