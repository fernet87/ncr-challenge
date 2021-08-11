

const SESSION_IDENTIFIER = 'session';

export function getSession() {
  const session = localStorage.getItem(SESSION_IDENTIFIER);
  return session;
}

export function getSessionObject(object) {
  const session = getSession();
  return (session) ? JSON.parse(session)[object] : null;
}

export function setSessionObject(object, objectValue) {
  let session = getSession();
  if (!session) {
    session = {};
  }
  else {
    session = JSON.parse(session);
  }
  session[object] = objectValue;
  localStorage.setItem(SESSION_IDENTIFIER, JSON.stringify(session));
}

export function destroySession() {
  localStorage.removeItem(SESSION_IDENTIFIER);
}

