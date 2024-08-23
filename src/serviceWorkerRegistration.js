// Este código é o padrão para o CRA com algumas adaptações para um registro de service worker personalizado.

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] é o endereço do localhost no IPv6.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 são considerados localhost no IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/
    )
);

export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // O URL do service worker.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // O service worker não funcionará se PUBLIC_URL estiver em um origem diferente
            // do que nosso aplicativo.
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // Isso é executado em localhost. Vamos verificar se o service worker ainda existe ou não.
                checkValidServiceWorker(swUrl, config);

                // Adicione um feedback adicional para os usuários do localhost, apontando
                // para o service worker/PWA.
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'Este aplicativo está sendo servido em cache-first por um service worker. Para saber mais, visite https://cra.link/PWA'
                    );
                });
            } else {
                // Não é localhost. Apenas registre o service worker.
                registerValidSW(swUrl, config);
            }
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // Neste ponto, o conteúdo antigo foi removido,
                            // e o novo conteúdo está armazenado em cache.
                            console.log(
                                'Novo conteúdo está disponível e será usado quando todas as ' +
                                'abas do aplicativo estiverem fechadas.'
                            );

                            // Execute a função de callback.
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            // Neste ponto, tudo foi armazenado em cache.
                            console.log('Conteúdo está armazenado em cache para uso offline.');

                            // Execute a função de callback.
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch((error) => {
            console.error('Erro durante o registro do service worker:', error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    // Verifique se o service worker pode ser encontrado. Caso contrário, recarregue a página.
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' },
    })
        .then((response) => {
            // Verifique se o service worker existe, e se não, recarregue a página.
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)
            ) {
                // Nenhum service worker encontrado. Provavelmente uma página diferente.
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker encontrado. Prossiga com o registro.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                'Nenhuma conexão com a Internet. Aplicativo rodando no modo offline.'
            );
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}