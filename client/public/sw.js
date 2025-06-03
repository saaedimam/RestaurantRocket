const CACHE_NAME = 'restaurant-os-v1';
const API_CACHE_NAME = 'restaurant-os-api-v1';

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  // Add any critical static assets here
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /^\/api\/dashboard\/stats$/,
  /^\/api\/tables$/,
  /^\/api\/categories$/,
  /^\/api\/menu-items/,
  /^\/api\/inventory/,
  /^\/api\/staff/
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static files...');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static file requests
  event.respondWith(handleStaticRequest(request));
});

// Handle API requests with cache-first or network-first strategy
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const isGetRequest = request.method === 'GET';
  const shouldCache = API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));

  if (isGetRequest && shouldCache) {
    // Cache-first strategy for GET requests to cacheable endpoints
    try {
      const cache = await caches.open(API_CACHE_NAME);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        // Return cached response and update cache in background
        updateCacheInBackground(request, cache);
        return cachedResponse;
      }
      
      // No cache hit, fetch from network
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      console.log('API request failed, trying cache:', error);
      const cache = await caches.open(API_CACHE_NAME);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Return offline response
      return new Response(
        JSON.stringify({ error: 'Offline', message: 'No cached data available' }),
        {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  // Network-first strategy for non-cacheable requests (POST, PUT, DELETE)
  try {
    const networkResponse = await fetch(request);
    
    // If this is a mutation that succeeded, invalidate related caches
    if (request.method !== 'GET' && networkResponse.ok) {
      await invalidateRelatedCaches(request);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network request failed:', error);
    
    // For write operations, return an error response
    if (request.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: 'Offline', message: 'Cannot perform this action while offline' }),
        {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // For GET requests, try to return cached data
    const cache = await caches.open(API_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response(
      JSON.stringify({ error: 'Offline', message: 'No cached data available' }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle static file requests
async function handleStaticRequest(request) {
  // For navigation requests, always return the main app
  if (request.mode === 'navigate') {
    try {
      const networkResponse = await fetch('/');
      return networkResponse;
    } catch (error) {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match('/');
      return cachedResponse || new Response('Offline', { status: 503 });
    }
  }

  // For other static resources, use cache-first strategy
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Update cache in background
async function updateCacheInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
  } catch (error) {
    console.log('Background cache update failed:', error);
  }
}

// Invalidate related caches after mutations
async function invalidateRelatedCaches(request) {
  const url = new URL(request.url);
  const cache = await caches.open(API_CACHE_NAME);
  
  // Patterns for cache invalidation based on the endpoint
  const invalidationPatterns = {
    '/api/orders': [/^\/api\/orders/, /^\/api\/dashboard\/stats$/, /^\/api\/tables$/],
    '/api/tables': [/^\/api\/tables$/],
    '/api/inventory': [/^\/api\/inventory/, /^\/api\/dashboard\/stats$/],
    '/api/staff': [/^\/api\/staff/],
    '/api/menu-items': [/^\/api\/menu-items/],
    '/api/categories': [/^\/api\/categories$/]
  };

  // Find matching patterns and invalidate related caches
  for (const [endpoint, patterns] of Object.entries(invalidationPatterns)) {
    if (url.pathname.startsWith(endpoint)) {
      const keys = await cache.keys();
      const keysToDelete = keys.filter(key => {
        const keyUrl = new URL(key.url);
        return patterns.some(pattern => pattern.test(keyUrl.pathname));
      });
      
      await Promise.all(keysToDelete.map(key => cache.delete(key)));
      console.log(`Invalidated ${keysToDelete.length} cache entries for ${endpoint}`);
      break;
    }
  }
}

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'restaurant-sync') {
    event.waitUntil(syncOfflineActions());
  }
});

// Sync offline actions when connection is restored
async function syncOfflineActions() {
  console.log('Syncing offline actions...');
  
  // This would typically involve reading from IndexedDB where offline actions are stored
  // and replaying them to the server
  try {
    // Implementation would depend on how offline actions are stored
    console.log('Offline sync completed');
  } catch (error) {
    console.error('Offline sync failed:', error);
  }
}

// Handle push notifications (for order updates, etc.)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const options = {
      body: data.body || 'New notification from RestaurantOS',
      icon: '/manifest.json', // This would be replaced with an actual icon
      badge: '/manifest.json',
      tag: data.tag || 'restaurant-notification',
      requireInteraction: data.requireInteraction || false,
      actions: data.actions || [],
      data: data.data || {}
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'RestaurantOS', options)
    );
  } catch (error) {
    console.error('Error handling push notification:', error);
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  const data = event.notification.data;

  if (action === 'view') {
    // Open the app to the relevant page
    event.waitUntil(
      clients.openWindow(data.url || '/')
    );
  } else if (action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync for data updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'restaurant-periodic-sync') {
    event.waitUntil(performPeriodicSync());
  }
});

async function performPeriodicSync() {
  console.log('Performing periodic sync...');
  
  try {
    // Update critical data in the background
    const cache = await caches.open(API_CACHE_NAME);
    
    // Refresh dashboard stats
    const statsResponse = await fetch('/api/dashboard/stats');
    if (statsResponse.ok) {
      cache.put('/api/dashboard/stats', statsResponse.clone());
    }
    
    // Refresh tables status
    const tablesResponse = await fetch('/api/tables');
    if (tablesResponse.ok) {
      cache.put('/api/tables', tablesResponse.clone());
    }
    
    console.log('Periodic sync completed');
  } catch (error) {
    console.error('Periodic sync failed:', error);
  }
}
