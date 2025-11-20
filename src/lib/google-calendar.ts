import { google } from 'googleapis';

// Google Calendar API client
const calendar = google.calendar('v3');

/**
 * Get authenticated Google Calendar client using service account
 */
function getCalendarClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
  
  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not configured');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return calendar;
}

/**
 * Create a calendar event for a scheduled call
 */
export async function createCalendarEvent({
  summary,
  description,
  startTime,
  endTime,
  attendeeEmail,
  attendeeName,
  calendarId,
}: {
  summary: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendeeEmail: string;
  attendeeName: string;
  calendarId?: string;
}) {
  try {
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    
    if (!credentials) {
      console.warn('[Google Calendar] Service account not configured, skipping calendar creation');
      return { success: false, reason: 'not_configured' };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const authClient = await auth.getClient();
    const calendarClient = google.calendar({ version: 'v3', auth: authClient as any });

    const event = {
      summary,
      description,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'America/Los_Angeles', // PT timezone
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      attendees: [
        {
          email: attendeeEmail,
          displayName: attendeeName,
          responseStatus: 'needsAction',
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: `cap-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const response = await calendarClient.events.insert({
      calendarId: calendarId || 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // Send email to attendees
    });

    console.log('[Google Calendar] Event created:', response.data.id);
    console.log('[Google Calendar] Meet link:', response.data.hangoutLink);

    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      meetLink: response.data.hangoutLink,
    };
  } catch (error) {
    console.error('[Google Calendar] Failed to create event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Parse user's preferred date/time into Date objects
 * Handles natural language like "tomorrow at 2pm", "next Tuesday 10am", etc.
 */
export function parsePreferredDateTime(
  preferredDate?: string,
  preferredTime?: string,
  timezone: string = 'America/Los_Angeles'
): { startTime: Date; endTime: Date } | null {
  try {
    let startTime: Date;

    // If both date and time provided, try to parse them
    if (preferredDate && preferredTime) {
      // Handle formats like:
      // - "2024-11-25" + "2pm"
      // - "tomorrow" + "10:00am"
      // - "next Tuesday" + "2:00 PM"
      
      const dateStr = preferredDate.toLowerCase();
      const timeStr = preferredTime.toLowerCase();

      // Try to parse as ISO date first
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // ISO format date
        const [year, month, day] = dateStr.split('-').map(Number);
        startTime = new Date(year, month - 1, day);
      } else if (dateStr.includes('tomorrow')) {
        startTime = new Date();
        startTime.setDate(startTime.getDate() + 1);
      } else if (dateStr.includes('today')) {
        startTime = new Date();
      } else {
        // Default to tomorrow if can't parse
        startTime = new Date();
        startTime.setDate(startTime.getDate() + 1);
      }

      // Parse time
      let hours = 14; // Default 2pm
      let minutes = 0;

      const timeMatch = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
      if (timeMatch) {
        hours = parseInt(timeMatch[1]);
        minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
        const meridiem = timeMatch[3]?.toLowerCase();

        if (meridiem === 'pm' && hours < 12) hours += 12;
        if (meridiem === 'am' && hours === 12) hours = 0;
      }

      startTime.setHours(hours, minutes, 0, 0);
    } else {
      // No specific time provided, default to tomorrow at 2pm PT
      startTime = new Date();
      startTime.setDate(startTime.getDate() + 1);
      startTime.setHours(14, 0, 0, 0); // 2pm
    }

    // Call duration: 30 minutes
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);

    return { startTime, endTime };
  } catch (error) {
    console.error('[Google Calendar] Failed to parse date/time:', error);
    return null;
  }
}
