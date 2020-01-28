export function setViewport() {
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, user-scalable=no, initial-scale=1.0, viewport-fit=cover';
  document.head.appendChild(viewport);
}