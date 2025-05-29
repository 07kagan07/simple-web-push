window.addEventListener('load', async function() {
  const subscribeButton = document.getElementById('subscribe-button');

  // SW'yi client tarafına resgister ediyoruz.

  const sW = await this.navigator.serviceWorker.register('sw.js')


  console.log('Service Worker registered:', sW);



  subscribeButton.addEventListener('click', async ()=>{
    const serviceWorker = await navigator.serviceWorker.ready;
    const clientID = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:'BAjhzGxbuLDQq6xp0A3h3LTVcYtY0gi-KyKMZa9ecnMnbE9q7F_KkxB6ueN0xldx01jB57y5VgD4TL-wZVux9Dg'
    })

    console.log('Subscribed with endpoint:', clientID);
    console.log('Subscription details:', JSON.stringify(clientID));
  })
})