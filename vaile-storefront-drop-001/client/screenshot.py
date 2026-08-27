import asyncio
from pyppeteer import launch

async def main():
    browser = await launch()
    page = await browser.newPage()
    await page.setViewport({'width': 1440, 'height': 900})
    await page.goto('http://localhost:5173/')
    await asyncio.sleep(2)
    await page.screenshot({'path': 'test_screenshot.png'})
    await browser.close()

asyncio.get_event_loop().run_until_complete(main())
