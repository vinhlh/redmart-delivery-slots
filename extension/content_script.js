const WAIT_ELEMENT_INTERVAL = 1000

// min and max delays, in minutes
const DELAY_BETWEEN_RETRIES_IN_MINUTES = [1, 12]

const MILLISECONDS_IN_ONE_MINUTE = 60 * 1000

const PER_SECOND = 1000

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const waitForElement = (selector, callback) => {
  const interval = window.setInterval(() => {
    const elements = document.querySelectorAll(selector)
    if (elements.length) {
      window.clearInterval(interval)
      callback(elements)
    }
  }, WAIT_ELEMENT_INTERVAL)
}

const countdown = (durationInMinutes) => {
  let timer = durationInMinutes * 60,
    minutes,
    seconds

  const interval = window.setInterval(() => {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    window.document.title = `Wait ${
      minutes + ':' + seconds
    } minutes for next try`

    timer--

    if (timer <= 0) {
      window.clearTimeout(interval)
    }
  }, PER_SECOND)
}

const checkSlots = () => {
  console.info('Checking slots')

  // click into Select Your Slot button
  document.querySelector('.deliveryTime button').click()

  waitForElement('.day-date-title', (elements) => {
    const availableDays = [...elements].filter(
      (el) => !el.classList.contains('disabled')
    )

    if (availableDays.length > 0) {
      const message = `Found ${availableDays.length} days! There are delivery slots available 🎉`
      console.info(message)

      chrome.runtime.sendMessage('', {
        type: 'notification',
        message,
      })
      return
    }

    // dismiss the popup
    document.getElementsByTagName('body')[0].click()

    const delay = randomBetween(...DELAY_BETWEEN_RETRIES_IN_MINUTES)
    countdown(delay)
    setTimeout(checkSlots, delay * MILLISECONDS_IN_ONE_MINUTE)
  })
}

checkSlots()
