import { APIError } from 'payload'

/**
 * An error whose message is meant for the person using the admin or editor ("This file is still used on…").
 * The name is set explicitly: in a minified production build the class name can be lost, and Payload would
 * then replace the message with "An unknown error occurred".
 */
export function userError(message: string, status = 400, data?: Record<string, unknown>) {
  const error = new APIError(message, status, data ?? {}, true)
  error.name = 'APIError'
  return error
}
