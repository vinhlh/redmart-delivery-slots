# Check RedMart's delivery slots

Due to coronavirus outbreak, Redmart delivery slots now be assigned based on address and be temporarily limited to specific days and times for each address.

But, Redmart hasn't provided any clear info when delivery slots of a specific address are opened.
And as customers, we have to go into the website/ app and check constantly.

That's why we have this extension and script.

![image](https://user-images.githubusercontent.com/261283/78808704-6dd8da80-79f8-11ea-867b-462bd3684eef.png)

## Extension

- Install the extension stored in `./extension` directory.

- Login into your Lazada account, and have your Redmart order ready.

- Open `https://checkout.lazada.sg/shipping`.

- The extension checks every interval from 1 - 12 minutes randomly to bypass firewall (Bot detection).

- Keep the tab open, you will be notified once having delivery slots available.

## Puppeteer script

- Start your Chrome in remote debugging mode, at port = 9222. Example:
`"/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary" --remote-debugging-port=9222`

- Login into your Lazada account, and have your Redmart order ready.

- Run the app
`node src/main.js`

- By default, the script will spin a new tab, and check every interval from 1 - 12 minutes randomly to bypass firewall (Bot detection).

- Keep the tab in a separate window and open, so you can continue your work in a separate window normally.
