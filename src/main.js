const puppeteer = require('puppeteer-core')

// min and max delays, in minutes
const DELAY_BETWEEN_RETRIES_IN_MINUTES = [10, 30]

const MILLISECONDS_IN_ONE_MINUTE = 60 * 1000

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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
    console.info(
      `Found ${availableSlots.length} days! There are delivery slots available 🎉`
    )
    console.info('==================================')

    page.evaluate(() => {
      new Notification('Redmart', {
        body: 'There are delivery slots available 🎉',
      })
    })
    return
  }

  console.info('No slot available!')

  // dismiss the popup
  await page.click('body')

  if (maxRetries != 0 && retries > maxRetries) {
    console.info('Got max tries = ', maxRetries)
    return
  }

  const delay = randomBetween(...DELAY_BETWEEN_RETRIES_IN_MINUTES)
  console.log(`Wait ${delay / 1000} minutes for next try`)
  setTimeout(
    () => checkSlots(page, retries + 1, maxRetries),
    delay * MILLISECONDS_IN_ONE_MINUTE
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
