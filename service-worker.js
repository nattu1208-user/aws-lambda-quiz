/*
 * service-worker.js
 * 目的: AWS Lambda 特化クイズ PWA ��� Service Worker。
 *       オフライン時にキャッシュからアセットを返すことで
 *       インターネッ��接続なしでもアプリを利用可能にする���
 * 作成者: Sekimoto Naoto
 * 作成日: 2026-04-21
 */

'use strict';

const CACHE_NAME = 'aws-lambda-quiz-v2';

const CACHE_URLS = [
  '/aws-lambda-quiz/',
  '/aws-lambda-quiz/index.html',
  '/aws-lambda-quiz/questions.js',
  '/aws-lambda-quiz/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS).catch((err) => {
        console.warn('[SW] cache.addAll 一部失敗:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const cloned = response.clone();
        caches.open(CACHE_NAME).then((cache) => { cache.put(event.request, cloned); });
        return response;
      }).catch(() => caches.match('/aws-lambda-quiz/index.html'));
    })
  );
});
