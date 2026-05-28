import React, { useState } from 'react';
import { Search, FileText, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, Shield, Zap, Bell } from 'lucide-react';
import { supabase } from '../lib/supabase';

function TrackApplicationPage() {
  const [email, setEmail] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setSearched(true);

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .order('created_at', { ascending: false });

    if (data) setApplications(data);
    setLoading(false);
  };

  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50', label: 'Pending Review' },
    processing: { icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Processing' },
    approved: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Approved' },
    rejected: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Rejected' },
    completed: { icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Completed' },
  };

  return (
    <div id="track_application_page">
      <div className="bg-primary-700 py-16">
        <div className="container-custom">
          <h1 className="heading-1 text-white mb-4">Track Your UAE Visa Application</h1>
          <p className="text-xl font-extralight text-primary-100 max-w-3xl">
            Stay informed about the progress of your UAE visit visa. Enter your email
            address below to view real-time status updates on all your applications.
          </p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-medium text-gray-800 mb-6">
              How Our Visa Tracking System Works
            </h2>
            <p className="text-lg font-extralight text-gray-600 mb-5">
              Once you submit your UAE visit visa application through our platform, our team begins
              processing it immediately. Every application goes through several stages: initial review,
              document verification, submission to UAE immigration authorities, and final approval. Our
              tracking system lets you monitor each of these stages in real time, so you always know
              exactly where your application stands without needing to call or email our support team.
            </p>
            <p className="text-lg font-extralight text-gray-600 mb-5">
              To check your application status, simply enter the email address you used when you
              submitted your visa application. The system will display all applications associated with
              that email, including the visa type, submission date, current processing status, and any
              important notes from our team. Whether your visa is pending review, actively being processed,
              or has already been approved, you will see the latest update here.
            </p>
            <p className="text-lg font-extralight text-gray-600">
              If your application requires additional documents or has been flagged for any reason, our
              team will reach out to you directly via email or WhatsApp. We recommend checking this page
              regularly during the 24 to 72 hour processing window. For urgent inquiries, you can also
              contact our support team directly at +971 55 796 8372 on WhatsApp for immediate assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary-50 rounded-md p-6 text-center">
              <Zap className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Real-Time Updates</h3>
              <p className="text-lg font-extralight text-gray-600">
                Application status is updated as soon as our team processes each stage of your visa request.
              </p>
            </div>
            <div className="bg-primary-50 rounded-md p-6 text-center">
              <Shield className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Secure Access</h3>
              <p className="text-lg font-extralight text-gray-600">
                Your application details are protected. Only the email used during submission can retrieve results.
              </p>
            </div>
            <div className="bg-primary-50 rounded-md p-6 text-center">
              <Bell className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Proactive Notifications</h3>
              <p className="text-lg font-extralight text-gray-600">
                We notify you via email and WhatsApp whenever your application status changes or action is needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg-gray-50">
        <div className="container-custom max-w-2xl">
          <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">
            Search Your Applications
          </h2>
          <form onSubmit={handleSearch} className="card mb-8" noValidate>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="input-field pl-10"
                  required
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {searched && (
            loading ? (
              <div className="text-center py-12">
                <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
                <p className="text-lg font-extralight text-gray-500">Searching applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="card text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Applications Found</h3>
                <p className="text-lg font-extralight text-gray-500">No visa applications were found for this email address. Please make sure you entered the same email used during your application.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg font-extralight text-gray-600 mb-4">
                  Found {applications.length} application{applications.length > 1 ? 's' : ''}
                </p>
                {applications.map((app) => {
                  const config = statusConfig[app.status] || statusConfig.pending;
                  const StatusIcon = config.icon;

                  return (
                    <div key={app.id} className="card">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{app.visa_type}</h3>
                          <p className="text-lg font-extralight text-gray-500">
                            Submitted: {new Date(app.created_at).toLocaleDateString('en-US', {
                              year: 'numeric', month: 'long', day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className={`flex items-center px-3 py-1.5 rounded-full ${config.bg}`}>
                          <StatusIcon className={`h-4 w-4 ${config.color} mr-1.5`} />
                          <span className={`text-lg font-medium ${config.color}`}>{config.label}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-lg font-extralight text-gray-500">Name</p>
                          <p className="text-lg font-medium text-gray-900">{app.first_name} {app.last_name}</p>
                        </div>
                        <div>
                          <p className="text-lg font-extralight text-gray-500">Nationality</p>
                          <p className="text-lg font-medium text-gray-900">{app.nationality}</p>
                        </div>
                        <div>
                          <p className="text-lg font-extralight text-gray-500">Entry Date</p>
                          <p className="text-lg font-medium text-gray-900">{app.entry_date}</p>
                        </div>
                        <div>
                          <p className="text-lg font-extralight text-gray-500">Amount</p>
                          <p className="text-lg font-medium text-gray-900">
                            {app.currency === 'AED' ? 'AED ' : '$'}{app.amount} {app.currency}
                          </p>
                        </div>
                      </div>

                      {app.status === 'rejected' && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-lg font-extralight text-red-700">
                              Your application was rejected. Please contact us via WhatsApp at +971 55 796 8372 for more information.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackApplicationPage;
