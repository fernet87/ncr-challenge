

const SESSION_IDENTIFIER = 'session';

export function getSession() {
  const session = JSON.parse(localStorage.getItem(SESSION_IDENTIFIER));
  return session;
}

export function getSessionObject(object) {
  const session = getSession();
  return (session) ? session[object] : null;
}

export function setSessionObject(object, objectValue) {
  let session = getSession();

  if (!session) {
    session = {};
  }
  session[object] = objectValue;

  localStorage.setItem(SESSION_IDENTIFIER, JSON.stringify(session));
}

export function destroySession() {
  localStorage.removeItem(SESSION_IDENTIFIER);
}

