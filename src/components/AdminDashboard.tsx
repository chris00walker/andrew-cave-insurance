'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clientService, communicationService, appointmentService, type Client, type CommunicationLog, type Appointment } from '@/lib/supabase';
import { Users, Calendar, MessageSquare, TrendingUp, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [communications, setCommunications] = useState<CommunicationLog[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setLoading(true);
    const clientData = await clientService.getClients();
    setClients(clientData);
    setLoading(false);
  };

  const loadClientDetails = async (client: Client) => {
    setSelectedClient(client);
    const [commData, apptData] = await Promise.all([
      communicationService.getByClient(client.id),
      appointmentService.getByClient(client.id)
    ]);
    setCommunications(commData);
    setAppointments(apptData);
    setNewStatus(client.status);
  };

  const updateClientStatus = async () => {
    if (!selectedClient || !newStatus) return;
    
    const success = await clientService.updateStatus(selectedClient.id, newStatus as Client['status']);
    if (success) {
      setSelectedClient({ ...selectedClient, status: newStatus as Client['status'] });
      loadClients(); // Refresh the list
    }
  };

  const addCommunicationNote = async () => {
    if (!selectedClient || !newNote) return;

    const logEntry = await communicationService.log({
      client_id: selectedClient.id,
      communication_type: 'email',
      direction: 'outbound',
      subject: 'Follow-up Note',
      content: newNote,
      status: 'completed'
    });

    if (logEntry) {
      setCommunications([logEntry, ...communications]);
      setNewNote('');
    }
  };

  const setClientFollowUp = async () => {
    if (!selectedClient || !followUpDate) return;

    const success = await clientService.setFollowUp(selectedClient.id, followUpDate);
    if (success) {
      setSelectedClient({ ...selectedClient, next_followup_at: followUpDate });
      setFollowUpDate('');
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'qualified': 'bg-green-100 text-green-800',
      'proposal_sent': 'bg-purple-100 text-purple-800',
      'closed_won': 'bg-green-100 text-green-800',
      'closed_lost': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading client data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Management Dashboard</h1>
        <p className="text-gray-600">Manage your insurance clients and track communications</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter(c => c.status === 'new').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter(c => c.status === 'qualified').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Won</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter(c => c.status === 'closed_won').length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Client List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>Click on a client to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedClient?.id === client.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => loadClientDetails(client)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{client.full_name}</h3>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(client.priority)}>{client.priority}</Badge>
                      <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{client.email}</p>
                  <p className="text-sm text-gray-600 mb-2">{client.insurance_type}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(client.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedClient ? `${selectedClient.full_name} Details` : 'Select a Client'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedClient ? (
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="communications">Communications</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm">{selectedClient.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm">{selectedClient.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Contact Method</Label>
                      <p className="text-sm">{selectedClient.contact_method}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Insurance Type</Label>
                      <p className="text-sm">{selectedClient.insurance_type}</p>
                    </div>
                    {selectedClient.preferred_date && (
                      <div>
                        <Label className="text-sm font-medium">Preferred Date</Label>
                        <p className="text-sm">{selectedClient.preferred_date}</p>
                      </div>
                    )}
                    {selectedClient.preferred_time && (
                      <div>
                        <Label className="text-sm font-medium">Preferred Time</Label>
                        <p className="text-sm">{selectedClient.preferred_time}</p>
                      </div>
                    )}
                  </div>
                  {selectedClient.additional_info && (
                    <div>
                      <Label className="text-sm font-medium">Additional Information</Label>
                      <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{selectedClient.additional_info}</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="communications" className="space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {communications.map((comm) => (
                      <div key={comm.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            {comm.communication_type === 'email' ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                            <span className="text-sm font-medium">{comm.subject}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(comm.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{comm.content}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="actions" className="space-y-4">
                  <div>
                    <Label htmlFor="status">Update Status</Label>
                    <div className="flex gap-2 mt-1">
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                          <SelectItem value="closed_won">Closed Won</SelectItem>
                          <SelectItem value="closed_lost">Closed Lost</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={updateClientStatus}>Update</Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="note">Add Communication Note</Label>
                    <Textarea
                      id="note"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a note about your communication with this client..."
                      className="mt-1"
                    />
                    <Button onClick={addCommunicationNote} className="mt-2">Add Note</Button>
                  </div>
                  
                  <div>
                    <Label htmlFor="followup">Set Follow-up Date</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="followup"
                        type="datetime-local"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                      />
                      <Button onClick={setClientFollowUp}>Set</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a client from the list to view their details and manage communications.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
