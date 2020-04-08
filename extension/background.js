window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.info('Received', request)
  if (request.type === 'notification') {
    chrome.notifications.create({
      title: 'RedSlots',
      message: request.message,
      iconUrl: './images/icon-128.png',
      type: 'basic',
    })
    console.info('Sent')
  }
})
