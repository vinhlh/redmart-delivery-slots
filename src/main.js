const puppeteer = require('puppeteer-core')

const DELAY_BETWEEN_RETRIES = 60000

const checkSlots = async (page, retries = 0, maxRetries) => {
  console.info('Retries = ', retries)

  const checkButton = await page.$('.deliveryTime button')
  await checkButton.click()

  await page.waitForSelector('.day-date-title', {
    visible: true,
  })

  const availableSlots = await page.$$('.day-date-title:not(.disabled)')

  if (availableSlots.length > 0) {
    console.info('==================================')
    console.info('FOUND', availableSlots)
    console.info('==================================')
    return
  }

  console.info('No slot available!')

  // dismiss the popup
  await page.click('body')

  if (maxRetries != 0 && retries > maxRetries) {
    console.info('Got max tries = ', maxRetries)
    page.evaluate(() => {
      new Notification('Redmart', {
        body: 'There are delivery slots available 🎉',
      })
    })
    return
  }

  console.log(`Wait ${DELAY_BETWEEN_RETRIES / 1000} seconds for next try`)
  setTimeout(
    () => checkSlots(page, retries + 1, maxRetries),
    DELAY_BETWEEN_RETRIES
  )
}

;(async () => {
  const browser = await puppeteer.connect({
    /**
     * Start your Chrome in remote debugging mode at port 9222
     * "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary" --remote-debugging-port=9222
     */
    browserURL: 'http://127.0.0.1:9222/',
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto('https://checkout.lazada.sg/shipping')

  await page.evaluate(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  })

  const maxRetries = 0
  checkSlots(page, 0, maxRetries)
})()
