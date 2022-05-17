# Zadanie rekrutacyjne - Vue

## Instalacja

Aby zainstalować paczki npm-owe należy użyć poniższej komendy.

```
$ npm install
```

## Hostowanie aplikacji lokalnie

```
$ npm run dev
```

## Testy

Wykonałem doatkowo testy e2e w celu usprawnienia procesu developmentu i prezentacji mojego rozwiązania. 
Przy komendzie cypress run i lokalnie hostowaniej aplikacji userState resetuje bazę w trakcie testowania.
Co by nie tracić przy tym czasu pozwolę sobie to odpuścić i zalecić odpalenie testów za pomocą komendy:
```
$ .\node_modules\.bin\cypress open albo ./node_modules/.bin/cypress open
```
przed tym, upewnij się, że w userState lista użytkoników jest zakomentowana. To kolejne obejście/hack związane z 
rodzajem bazy.
