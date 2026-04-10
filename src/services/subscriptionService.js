import { SUBSCRIPTION_KEY } from '../utils/constants';

const getSubscribers = () => {
  try {
    const data = localStorage.getItem(SUBSCRIPTION_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveSubscribers = (subs) => {
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subs));
};

export const addSubscriber = (email, mobile, name) => {
  const subscribers = getSubscribers();

  // Check for duplicate
  const exists = subscribers.find(s =>
    (email && s.email === email) || (mobile && s.mobile === mobile)
  );
  if (exists) {
    // Update name if provided
    if (name && !exists.name) { exists.name = name; saveSubscribers(subscribers); }
    return { success: false, message: 'आप पहले से सदस्य हैं!' };
  }

  const newSub = {
    id: Date.now().toString(36),
    name: name || '',
    email,
    mobile,
    subscribedAt: new Date().toISOString(),
  };
  subscribers.push(newSub);
  saveSubscribers(subscribers);
  return { success: true, message: 'सदस्यता सफल! धन्यवाद!' };
};

export const getAllSubscribers = () => {
  return getSubscribers();
};

export const getSubscriberCount = () => {
  return getSubscribers().length;
};

export const deleteSubscriber = (id) => {
  const subscribers = getSubscribers();
  const filtered = subscribers.filter(s => s.id !== id);
  saveSubscribers(filtered);
  return true;
};

export const markUnsubscribed = (email, mobile) => {
  const subscribers = getSubscribers();
  let changed = false;
  subscribers.forEach(s => {
    if ((email && s.email === email) || (mobile && s.mobile === mobile)) {
      s.isSubscribed = false;
      s.unsubscribedAt = new Date().toISOString();
      changed = true;
    }
  });
  if (changed) saveSubscribers(subscribers);
};

export const exportSubscribersCSV = () => {
  const subscribers = getSubscribers();
  if (subscribers.length === 0) return null;

  const headers = ['#', 'Email', 'Mobile', 'Subscribed On'];
  const rows = subscribers.map((s, i) => [
    i + 1,
    s.email,
    s.mobile,
    new Date(s.subscribedAt).toLocaleString('hi-IN')
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `subscribers_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  return true;
};
