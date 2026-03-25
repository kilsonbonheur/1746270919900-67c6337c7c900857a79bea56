import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, MessageSquare, LogOut, Clock,
  CheckCircle, XCircle, AlertCircle, Eye, ChevronDown, ChevronUp,
  Send, ExternalLink, RefreshCw, Filter, Search, Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-purple-100 text-purple-800',
};

const STATUS_ICONS = {
  pending: Clock,
  processing: AlertCircle,
  approved: CheckCircle,
  rejected: XCircle,
  completed: CheckCircle,
};

function AdminDashboardPage() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedApp, setExpandedApp] = useState(null);
  const [expandedMsg, setExpandedMsg] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [appsRes, msgsRes] = await Promise.all([
      supabase.from('applications').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    ]);
    if (appsRes.data) setApplications(appsRes.data);
    if (msgsRes.data) setMessages(msgsRes.data);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const updateApplicationStatus = async (app, newStatus) => {
    setUpdatingStatus(app.id);
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', app.id);

      if (error) throw error;

      // Send notification email
      try {
        await supabase.functions.invoke('send-notification', {
          body: {
            type: 'status_update',
            data: {
              email: app.email,
              first_name: app.first_name,
              last_name: app.last_name,
              visa_type: app.visa_type,
              new_status: newStatus,
              admin_notes: adminNotes,
            },
          },
        });
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr);
      }

      setApplications((prev) =>
        prev.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a))
      );
      setAdminNotes('');
      toast.success(`Application status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const markMessageRead = async (msgId) => {
    await supabase.from('contact_messages').update({ status: 'read' }).eq('id', msgId);
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, status: 'read' } : m))
    );
  };

  const deleteMessage = async (msgId) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('contact_messages').delete().eq('id', msgId);
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    toast.success('Message deleted');
  };

  const exportApplicationsCSV = () => {
    const headers = ['Name','Email','Phone','Nationality','Passport','Visa Type','Entry Date','Purpose','Amount','Currency','Payment','Status','Submitted'];
    const rows = filteredApps.map(a => [
      `${a.first_name} ${a.last_name}`, a.email, a.phone, a.nationality,
      a.passport_number, a.visa_type, a.entry_date, a.travel_purpose,
      a.amount, a.currency, a.payment_status, a.status,
      new Date(a.created_at).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${(v || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `applications-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Applications exported!');
  };

  const exportMessagesCSV = () => {
    const headers = ['Name','Email','Phone','Subject','Message','Status','Received'];
    const rows = messages.map(m => [
      m.name, m.email, m.phone || '', m.subject, m.message, m.status,
      new Date(m.created_at).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${(v || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `messages-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Messages exported!');
  };


  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      `${app.first_name} ${app.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.passport_number?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    processing: applications.filter((a) => a.status === 'processing').length,
    approved: applications.filter((a) => a.status === 'approved').length,
    completed: applications.filter((a) => a.status === 'completed').length,
    unreadMessages: messages.filter((m) => m.status === 'unread').length,
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="h-6 w-6 text-primary-600" />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{profile?.email}</span>
              <button onClick={handleSignOut} className="flex items-center text-sm text-gray-500 hover:text-red-600 transition-colors">
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Apps', value: stats.total, color: 'bg-gray-100 text-gray-800' },
            { label: 'Pending', value: stats.pending, color: 'bg-yellow-100 text-yellow-800' },
            { label: 'Processing', value: stats.processing, color: 'bg-blue-100 text-blue-800' },
            { label: 'Approved', value: stats.approved, color: 'bg-green-100 text-green-800' },
            { label: 'Completed', value: stats.completed, color: 'bg-purple-100 text-purple-800' },
            { label: 'Unread Msgs', value: stats.unreadMessages, color: 'bg-red-100 text-red-800' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-soft">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color.split(' ')[1]}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-soft mb-6">
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'applications' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Applications ({applications.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'messages' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Messages ({messages.length})</span>
            {stats.unreadMessages > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {stats.unreadMessages}
              </span>
            )}
          </button>
        </div>

        {/* Toolbar */}
        {activeTab === 'applications' && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or passport..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 py-2 text-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field py-2 text-sm w-40"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button onClick={fetchData} className="btn-secondary py-2 px-4 text-sm">
              <RefreshCw className="h-4 w-4 mr-1" /> Refresh
            </button>
            <button onClick={exportApplicationsCSV} className="btn-secondary py-2 px-4 text-sm bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
              <Download className="h-4 w-4 mr-1" /> Export CSV
            </button>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {filteredApps.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-soft">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No applications found</p>
              </div>
            ) : (
              filteredApps.map((app) => {
                const StatusIcon = STATUS_ICONS[app.status] || Clock;
                const isExpanded = expandedApp === app.id;
                return (
                  <div key={app.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
                    <div
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                    >
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <StatusIcon className={`h-5 w-5 ${STATUS_COLORS[app.status]?.split(' ')[1]}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 truncate">
                            {app.first_name} {app.last_name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">{app.email}</p>
                        </div>
                        <div className="hidden sm:block text-right">
                          <p className="text-sm font-medium text-gray-700">{app.visa_type}</p>
                          <p className="text-sm text-gray-400">{formatDate(app.created_at)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[app.status]}`}>
                          {app.status}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400 ml-2" /> : <ChevronDown className="h-5 w-5 text-gray-400 ml-2" />}
                    </div>

                    {isExpanded && (
                      <div className="border-t border-gray-100 p-5 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          {[
                            ['Full Name', `${app.first_name} ${app.last_name}`],
                            ['Email', app.email],
                            ['Phone', app.phone],
                            ['Nationality', app.nationality],
                            ['Date of Birth', app.date_of_birth],
                            ['Passport Number', app.passport_number],
                            ['Passport Expiry', app.passport_expiry],
                            ['Visa Type', app.visa_type],
                            ['Entry Date', app.entry_date],
                            ['Travel Purpose', app.travel_purpose],
                            ['Accommodation', app.accommodation],
                            ['Amount', `${app.currency === 'AED' ? 'AED' : '$'}${app.amount} ${app.currency}`],
                            ['Payment Status', app.payment_status],
                            ['Submitted', formatDate(app.created_at)],
                          ].map(([label, value]) => (
                            <div key={label}>
                              <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                              <p className="text-sm font-medium text-gray-900 mt-0.5">{value || '—'}</p>
                            </div>
                          ))}
                          {app.additional_info && (
                            <div className="md:col-span-2 lg:col-span-3">
                              <p className="text-xs text-gray-400 uppercase tracking-wider">Additional Info</p>
                              <p className="text-sm text-gray-700 mt-0.5">{app.additional_info}</p>
                            </div>
                          )}
                        </div>

                        {/* Documents */}
                        <div className="mb-6">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Documents</p>
                          <div className="flex flex-wrap gap-3">
                            {app.passport_copy_url && (
                              <a href={app.passport_copy_url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg">
                                <ExternalLink className="h-3 w-3" /> <span>Passport Copy</span>
                              </a>
                            )}
                            {app.photograph_url && (
                              <a href={app.photograph_url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg">
                                <ExternalLink className="h-3 w-3" /> <span>Photograph</span>
                              </a>
                            )}
                            {app.flight_itinerary_url && (
                              <a href={app.flight_itinerary_url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg">
                                <ExternalLink className="h-3 w-3" /> <span>Flight Itinerary</span>
                              </a>
                            )}
                            {!app.passport_copy_url && !app.photograph_url && !app.flight_itinerary_url && (
                              <p className="text-sm text-gray-400">No documents uploaded</p>
                            )}
                          </div>
                        </div>

                        {/* Status Update */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-3">Update Status</p>
                          <div className="mb-3">
                            <textarea
                              placeholder="Admin notes (optional - will be included in email to applicant)"
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                              className="input-field text-sm py-2"
                              rows="2"
                            />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {['pending', 'processing', 'approved', 'rejected', 'completed'].map((status) => (
                              <button
                                key={status}
                                onClick={() => updateApplicationStatus(app, status)}
                                disabled={app.status === status || updatingStatus === app.id}
                                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                                  app.status === status
                                    ? 'ring-2 ring-primary-500 ' + STATUS_COLORS[status]
                                    : STATUS_COLORS[status] + ' opacity-60 hover:opacity-100'
                                } disabled:cursor-not-allowed`}
                              >
                                {updatingStatus === app.id ? '...' : status.charAt(0).toUpperCase() + status.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <>
            <div className="flex justify-end mb-4">
              <button onClick={exportMessagesCSV} className="btn-secondary py-2 px-4 text-sm bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                <Download className="h-4 w-4 mr-1" /> Export CSV
              </button>
            </div>
            <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-soft">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isExpanded = expandedMsg === msg.id;
                return (
                  <div key={msg.id} className={`bg-white rounded-xl shadow-soft overflow-hidden ${
                    msg.status === 'unread' ? 'border-l-4 border-primary-500' : ''
                  }`}>
                    <div
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setExpandedMsg(isExpanded ? null : msg.id);
                        if (msg.status === 'unread') markMessageRead(msg.id);
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900">{msg.name}</p>
                          {msg.status === 'unread' && (
                            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">New</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{msg.subject}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-400">{formatDate(msg.created_at)}</span>
                        {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-gray-100 p-5 bg-gray-50">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-400 uppercase">Email</p>
                            <a href={`mailto:${msg.email}`} className="text-sm text-primary-600 hover:underline">{msg.email}</a>
                          </div>
                          {msg.phone && (
                            <div>
                              <p className="text-xs text-gray-400 uppercase">Phone</p>
                              <p className="text-sm text-gray-900">{msg.phone}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-gray-400 uppercase">Received</p>
                            <p className="text-sm text-gray-900">{formatDate(msg.created_at)}</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                        </div>
                        <div className="flex space-x-3">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                            className="btn-primary py-2 px-4 text-sm"
                          >
                            <Send className="h-3 w-3 mr-1" /> Reply via Email
                          </a>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="btn-secondary py-2 px-4 text-sm text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
