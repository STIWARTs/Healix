/**
 * Daily Summary Service
 * Handles fetching daily summary data from Supabase
 */

import { supabase } from './supabase';
import { DailySummary } from '../types/dailySummary';

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Get daily summaries for a date range
 */
export const getDailySummaries = async (
  startDate: string,
  endDate: string
): Promise<ServiceResponse<DailySummary[]>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { data, error } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching daily summaries:', error);
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
    console.error('Unexpected error in getDailySummaries:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Get daily summary for a specific date
 */
export const getDailySummaryByDate = async (
  date: string
): Promise<ServiceResponse<DailySummary | null>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { data, error } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', date)
      .single();

    if (error) {
      // Not found is OK, just return null
      if (error.code === 'PGRST116') {
        return {
          success: true,
          data: null,
        };
      }
      
      console.error('Error fetching daily summary:', error);
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
    console.error('Unexpected error in getDailySummaryByDate:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};
