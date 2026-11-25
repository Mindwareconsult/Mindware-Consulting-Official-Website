import { handleGenerateCvRequest } from "../_lib/handlers";
import type { ApiRequest, ApiResponse } from "../_lib/http";

export default async function handler(
  req: ApiRequest,
  res: ApiResponse
): Promise<void> {
  await handleGenerateCvRequest(req, res);
}
