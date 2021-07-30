Our team recently separated our static resource by caching the HTML template in the cdn and then requesting the JS interface data, but this behavior is serial,so for performance optimization, we request our data from EageWorker in advance.

The project uses the EageWorker capability to request data at the same time when the page is requested, and then returns the HTML and data in the form of streaming rendering to the page, so that the page can render the frame first, while waiting for the return of the data to finally render the entire page.

The code uses the middleware feature to encapsulate the request process, and at the same time realizes the cookie setting, identifies e_id, and stream-based rendering.

The process is as follows:

1. Get the domain settings from the url, if not, set a default site cookie.
2. Determine whether there is an e_id from the cookie, if not, set a random e_id for the user according to the rules.
3. Rendering process: first request the page address, request the data address at the same time, and then generate a readable stream. after that, the page head will return frist, then data part, finally, the stream ends.

ultimately，page can obtain the initial cookie and the user's identification e_id. Then, the frame of the page will be rendered firstly. The entire page will be rendered after the data is received.