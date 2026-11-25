import { handleEnhanceBulletsRequest } from "../_lib/handlers.js";
import type { ApiRequest, ApiResponse } from "../_lib/http.js";

export default async function handler(
  req: ApiRequest,
  res: ApiResponse
): Promise<void> {
  await handleEnhanceBulletsRequest(req, res);
}
