export class ForbiddenError extends Error {
  getStatus() {
    return 403;
  }
}
