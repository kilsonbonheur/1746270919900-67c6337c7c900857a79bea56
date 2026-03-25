import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, MessageSquare, LogOut, Eye, Clock,
  CheckCircle, XCircle, AlertCircle, RefreshCw, ChevronDown,
  User, Mail, Phone, Calendar, Globe, Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusNote, setStatusNote] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const SUPABASE_URL = 'https://bpbeucgxxxjwcydujcue.supabase.co';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [appsRes, msgsRes] = await Promise.all([
      supabase.from('applications').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    ]);
    if (appsRes.data) setApplications(appsRes.data);
    if (msgsRes.data) setMessages(msgsRes.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const updateApplicationStatus = async (app, newStatus) => {
    setUpdatingStatus(true);
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', app.id);

      if (error) throw error;

      // Send email notification
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await fetch(`${SUPABASE_URL}/functions/v1/send-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            type: 'status_update',
            data: {
              email: app.email,
              first_name: app.first_name,
              last_name: app.last_name,
              visa_type: app.visa_type,
              new_status: newStatus,
              admin_notes: statusNote,
            },
          }),
        });
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr);
      }

      toast.success(`Status updated to ${newStatus}`);
      setSelectedApp(null);
      setStatusNote('');
      loadData();
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const updateMessageStatus = async (id, status) => {
    await supabase.from('contact_messages').update({ status }).eq('id', id);
    loadData();
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-purple-100 text-purple-800',
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    processing: applications.filter((a) => a.status === 'processing').length,
    approved: applications.filter((a) => a.status === 'approved' || a.status === 'completed').length,
    unreadMessages: messages.filter((m) => m.status === 'unread').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-primary-600">Kilson</span>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-600">Admin Panel</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:block">{profile?.email}</span>
            <button onClick={handleLogout} className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors">
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Apps</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Processing</p>
                <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unread Msgs</p>
                <p className="text-2xl font-bold text-red-600">{stats.unreadMessages}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'applications' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-1" />
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'messages' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="h-4 w-4 inline mr-1" />
            Messages ({messages.length})
            {stats.unreadMessages > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{stats.unreadMessages}</span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : activeTab === 'applications' ? (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No applications yet</p>
              </div>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary-100 rounded-full p-2">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{app.first_name} {app.last_name}</h3>
                          <p className="text-sm text-gray-500">{app.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}`}>
                          {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                        </span>
                        <span className="text-sm font-semibold text-primary-600">
                          {app.currency === 'AED' ? 'AED' : '$'}{app.amount} {app.currency}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                      <div className="flex items-center text-gray-600">
                        <Globe className="h-4 w-4 mr-1 text-gray-400" />
                        {app.nationality}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileText className="h-4 w-4 mr-1 text-gray-400" />
                        {app.visa_type}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {app.entry_date}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        {app.phone}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {app.passport_copy_url && (
                        <a href={app.passport_copy_url} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center">
                          <Download className="h-3 w-3 mr-1" /> Passport
                        </a>
                      )}
                      {app.photograph_url && (
                        <a href={app.photograph_url} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center">
                          <Download className="h-3 w-3 mr-1" /> Photo
                        </a>
                      )}
                      {app.flight_itinerary_url && (
                        <a href={app.flight_itinerary_url} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center">
                          <Download className="h-3 w-3 mr-1" /> Flight
                        </a>
                      )}
                    </div>

                    {selectedApp === app.id ? (
                      <div className="bg-gray-50 rounded-lg p-4 mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Update Status</h4>
                        <textarea
                          value={statusNote}
                          onChange={(e) => setStatusNote(e.target.value)}
                          placeholder="Add a note (optional)..."
                          className="input-field text-sm mb-3"
                          rows={2}
                        />
                        <div className="flex flex-wrap gap-2">
                          {['processing', 'approved', 'rejected', 'completed'].map((status) => (
                            <button
                              key={status}
                              onClick={() => updateApplicationStatus(app, status)}
                              disabled={updatingStatus}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                status === 'approved' ? 'bg-green-500 hover:bg-green-600 text-white' :
                                status === 'rejected' ? 'bg-red-500 hover:bg-red-600 text-white' :
                                status === 'processing' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                                'bg-purple-500 hover:bg-purple-600 text-white'
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          ))}
                          <button
                            onClick={() => { setSelectedApp(null); setStatusNote(''); }}
                            className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-200 hover:bg-gray-300 text-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedApp(app.id)}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Update Status
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-50 px-4 sm:px-6 py-2 text-xs text-gray-500">
                    Submitted: {new Date(app.created_at).toLocaleString()}
                    {app.additional_info && <span className="ml-4">Note: {app.additional_info}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`bg-white rounded-lg shadow-sm p-4 sm:p-6 ${msg.status === 'unread' ? 'border-l-4 border-primary-500' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                      <p className="text-sm text-gray-500">{msg.email} {msg.phone && `• ${msg.phone}`}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        msg.status === 'unread' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {msg.status}
                      </span>
                      {msg.status === 'unread' && (
                        <button
                          onClick={() => updateMessageStatus(msg.id, 'read')}
                          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-1">{msg.subject}</p>
                  <p className="text-sm text-gray-600">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-3">{new Date(msg.created_at).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
