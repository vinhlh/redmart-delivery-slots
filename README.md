# Check RedMart's delivery slots

Due to coronavirus outbreak, Redmart delivery slots now be assigned based on address and be temporarily limited to specific days and times for each address.

But, Redmart hasn't provided any clear info when delivery slots of a specific address are opened.
And as customers, we have to go into the website/ app and check constantly.

That's why we have this script. 

![image](https://user-images.githubusercontent.com/261283/78641029-3593a800-78e3-11ea-902e-539687def26d.png)

## Usage

- Start your Chrome in remote debugging mode, at port = 9222. Example:
`"/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary" --remote-debugging-port=9222`

- Login into your Lazada account, and have your Redmart order ready.

- Run the app
`node src/main.js`

- By default, the script will spin a new tab, and check every interval from 10 - 30 minutes randomly to bypass firewall (Bot detection).

- Keep the tab in a separate window and open, so you can continue your work in a separate window normally.
