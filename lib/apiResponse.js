/**
 * Standardized API response formatters for Next.js route handlers
 */

export function apiSuccess(data, status = 200, meta = null) {
  const payload = {
    success: true,
    data,
  };
  if (meta) payload.meta = meta;
  return Response.json(payload, { status });
}

export function apiError(message, status = 400, details = null) {
  const payload = {
    success: false,
    error: message,
  };
  if (details) payload.details = details;
  return Response.json(payload, { status });
}
