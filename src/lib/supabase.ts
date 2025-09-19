import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Client {
  id: string
  created_at: string
  updated_at: string
  first_name: string
  last_name: string
  suffix?: string
  full_name: string
  email: string
  phone: string
  contact_method: 'email' | 'phone' | 'either'
  insurance_type: string
  preferred_date?: string
  preferred_time?: string
  additional_info?: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'closed_won' | 'closed_lost'
  priority: 'low' | 'medium' | 'high'
  last_contacted_at?: string
  next_followup_at?: string
}

export interface ClientQuestionnaire {
  id: string
  client_id: string
  created_at: string
  updated_at: string
  date_of_birth?: string
  marital_status?: 'single' | 'married' | 'divorced' | 'widowed' | 'common_law'
  number_of_dependents: number
  occupation?: string
  employer?: string
  annual_income?: number
  has_life_insurance: boolean
  current_life_coverage?: number
  has_health_insurance: boolean
  has_disability_insurance: boolean
  has_critical_illness: boolean
  monthly_expenses?: number
  outstanding_debts?: number
  mortgage_balance?: number
  savings_investments?: number
  coverage_goals?: string
  budget_range?: string
  timeline_for_purchase?: string
  health_status?: 'excellent' | 'good' | 'fair' | 'poor'
  smoker: boolean
  notes?: string
  completed_at?: string
}

export interface Appointment {
  id: string
  client_id: string
  created_at: string
  appointment_date: string
  appointment_time: string
  duration_minutes: number
  appointment_type: 'consultation' | 'follow_up' | 'policy_review' | 'claim_assistance'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
  meeting_method: 'in_person' | 'phone' | 'video' | 'email'
  location?: string
  notes?: string
  reminder_sent: boolean
  reminder_sent_at?: string
}

export interface CommunicationLog {
  id: string
  client_id: string
  created_at: string
  communication_type: 'email' | 'phone' | 'sms' | 'in_person' | 'letter'
  direction: 'inbound' | 'outbound'
  subject?: string
  content?: string
  status: 'completed' | 'pending' | 'failed'
  follow_up_required: boolean
  follow_up_date?: string
}

// Helper functions for database operations
export const clientService = {
  // Create a new client from contact form
  async createFromContactForm(formData: any): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        suffix: formData.suffix === 'none' ? null : formData.suffix,
        email: formData.email,
        phone: formData.phone,
        contact_method: formData.contactMethod,
        insurance_type: formData.insuranceType,
        preferred_date: formData.preferredDate || null,
        preferred_time: formData.preferredTime || null,
        additional_info: formData.additionalInfo || null,
        source: 'Website Contact Form'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating client:', error)
      throw error
    }

    return data
  },

  // Get all clients with optional filtering
  async getClients(filters?: { status?: string; priority?: string }): Promise<Client[]> {
    let query = supabase.from('clients').select('*').order('created_at', { ascending: false })

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching clients:', error)
      return []
    }

    return data || []
  },

  // Update client status
  async updateStatus(clientId: string, status: Client['status']): Promise<boolean> {
    const { error } = await supabase
      .from('clients')
      .update({ status, last_contacted_at: new Date().toISOString() })
      .eq('id', clientId)

    if (error) {
      console.error('Error updating client status:', error)
      return false
    }

    return true
  },

  // Set next follow-up date
  async setFollowUp(clientId: string, followUpDate: string): Promise<boolean> {
    const { error } = await supabase
      .from('clients')
      .update({ next_followup_at: followUpDate })
      .eq('id', clientId)

    if (error) {
      console.error('Error setting follow-up:', error)
      return false
    }

    return true
  }
}

export const appointmentService = {
  // Create a new appointment
  async create(appointmentData: Partial<Appointment>): Promise<Appointment | null> {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single()

    if (error) {
      console.error('Error creating appointment:', error)
      return null
    }

    return data
  },

  // Get appointments for a client
  async getByClient(clientId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('client_id', clientId)
      .order('appointment_date', { ascending: true })

    if (error) {
      console.error('Error fetching appointments:', error)
      return []
    }

    return data || []
  }
}

export const communicationService = {
  // Log a communication
  async log(logData: Partial<CommunicationLog>): Promise<CommunicationLog | null> {
    const { data, error } = await supabase
      .from('communication_log')
      .insert(logData)
      .select()
      .single()

    if (error) {
      console.error('Error logging communication:', error)
      return null
    }

    return data
  },

  // Get communication history for a client
  async getByClient(clientId: string): Promise<CommunicationLog[]> {
    const { data, error } = await supabase
      .from('communication_log')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching communication log:', error)
      return []
    }

    return data || []
  }
}

export const questionnaireService = {
  // Create a new client and questionnaire from form data
  async submitQuestionnaire(formData: any): Promise<{ client: Client | null, questionnaire: ClientQuestionnaire | null }> {
    try {
      // First, create the client record
      const client = await clientService.createFromContactForm({
        firstName: formData.firstName || formData.clientName?.split(' ')[0] || 'Unknown',
        lastName: formData.lastName || formData.clientName?.split(' ').slice(1).join(' ') || 'Client',
        suffix: formData.suffix,
        email: formData.email || 'noemail@example.com',
        phone: formData.phone || '',
        contactMethod: formData.contactMethod || 'email',
        insuranceType: formData.insuranceType || 'General Inquiry',
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        additionalInfo: formData.additionalInfo || formData.notes
      })

      if (!client) {
        throw new Error('Failed to create client record')
      }

      // Then create the questionnaire record
      const { data: questionnaire, error } = await supabase
        .from('client_questionnaires')
        .insert({
          client_id: client.id,
          date_of_birth: formData.dateOfBirth,
          marital_status: formData.maritalStatus,
          number_of_dependents: parseInt(formData.numberOfDependents) || 0,
          occupation: formData.occupation,
          employer: formData.employer,
          annual_income: parseFloat(formData.monthlyIncome) * 12 || null,
          has_life_insurance: formData.protectionNeeds?.lifeInsurance || false,
          has_health_insurance: formData.protectionNeeds?.healthInsurance || false,
          has_disability_insurance: formData.protectionNeeds?.disabilityInsurance || false,
          has_critical_illness: formData.protectionNeeds?.criticalIllness || false,
          monthly_expenses: parseFloat(formData.monthlyExpenses) || null,
          outstanding_debts: parseFloat(formData.liabilities) || null,
          savings_investments: parseFloat(formData.assets) || null,
          coverage_goals: formData.investmentGoals,
          timeline_for_purchase: formData.retirementPlanning,
          health_status: formData.healthRating,
          smoker: formData.smoker || false,
          notes: formData.additionalNotes || formData.medicalConditions,
          completed_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating questionnaire:', error)
        // Following Supabase best practices: throw error instead of returning null
        // This allows proper error handling with error.code detection
        throw error
      }

      return { client, questionnaire }
    } catch (error) {
      console.error('Error submitting questionnaire:', error)
      // Following Supabase best practices: re-throw error for proper handling
      // This allows the UI layer to detect specific error codes like 23505
      throw error
    }
  },

  // Get questionnaire by client ID
  async getByClient(clientId: string): Promise<ClientQuestionnaire | null> {
    const { data, error } = await supabase
      .from('client_questionnaires')
      .select('*')
      .eq('client_id', clientId)
      .single()

    if (error) {
      console.error('Error fetching questionnaire:', error)
      return null
    }

    return data
  }
}
