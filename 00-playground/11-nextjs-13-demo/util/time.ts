export function wait(seconds: number) {
  return new Promise<void>((resolve, _) =>
    setTimeout(() => resolve(), seconds * 1000)
  );
}
