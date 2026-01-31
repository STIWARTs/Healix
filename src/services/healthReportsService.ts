/**
 * Health Reports Service
 * Handles saving and retrieving health reports from Supabase
 */

import { supabase } from './supabase';

export interface HealthReport {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  summary: string | null;
  uploaded_at: string;
  updated_at: string;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Save a health report to the database
 */
export const saveHealthReport = async (
  fileName: string,
  fileType: string,
  fileSize: number,
  summary: string
): Promise<ServiceResponse<HealthReport>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { data, error } = await supabase
      .from('health_reports')
      .insert({
        user_id: user.id,
        file_name: fileName,
        file_type: fileType,
        file_size: fileSize,
        summary: summary,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving health report:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Unexpected error in saveHealthReport:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Get all health reports for the current user
 */
export const getUserHealthReports = async (): Promise<ServiceResponse<HealthReport[]>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { data, error } = await supabase
      .from('health_reports')
      .select('*')
      .eq('user_id', user.id)
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching health reports:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error('Unexpected error in getUserHealthReports:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Get a specific health report by ID
 */
export const getHealthReportById = async (
  reportId: string
): Promise<ServiceResponse<HealthReport>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { data, error } = await supabase
      .from('health_reports')
      .select('*')
      .eq('id', reportId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching health report:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Unexpected error in getHealthReportById:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Delete a health report
 */
export const deleteHealthReport = async (
  reportId: string
): Promise<ServiceResponse<void>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { error } = await supabase
      .from('health_reports')
      .delete()
      .eq('id', reportId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting health report:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Unexpected error in deleteHealthReport:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};
